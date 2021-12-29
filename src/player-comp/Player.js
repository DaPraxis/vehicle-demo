import React, {Component} from 'react'
import ReactPlayer from 'react-player'
import {findDOMNode} from 'react-dom'
import Controller from './Controller';
import {convertHexToRgbA} from './utils'
import screenfull from 'screenfull'
import './Player.css';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import {Line} from 'react-chartjs-2'


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
export default class Player extends Component {

    alteredOnPlay = undefined;
    alteredProps = undefined;
    playerRef = undefined;
    playerViewRef = undefined;

    state = {
        progress: 0,
        playing: true,
        paused: true,
        setPlaying: true,
        fullscreen: false,
        setSeek: 0,
        duration: 0,
        wlValue: 2, // start workload value
        color: "green", // start safe workload 
        maxWl: 10,
        minWl: 1,
        timeSeries: [],
        ma: [],
        wl: [],
        lastTime: 0,
        playedSeconds: 0,
        ma_10hz: [],
        ma_20hz: []
    }

    constructor(props) {
        super(props);
        this.setAlteredProps(props);
        this.alteredProps = {
            ...props, onPlay: this.alteredonPlay,
            onPause: this.alteredonPause, onDuration: this.alteredonDuration,
            onProgress: this.alteredonProgress, progressInterval: 100
        }
        this.setTheme(props.theme);
        this.playPause = this.playPause.bind(this)
        this.handleClickFullscreen = this.handleClickFullscreen.bind(this)
        this.handleSliderChanges = this.handleSliderChanges.bind(this)
    }

    setAlteredProps(props) {
        let eventProps = ["onPlay", "onPause", "onDuration", "onProgress"]
        eventProps.forEach((val, index) => {
            if (props[val]) {
                let temp = props[val]
                this['altered' + val] = (e) => {
                    this[val](e);
                    temp(e);
                }
            } else
                this['altered' + val] = (e) => {
                    this[val](e);
                }
        })
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
        if (screenfull.isEnabled) {
            screenfull.on('change', () => {
                this.setState({fullscreen: screenfull.isFullscreen});
            });
        }
    }


    handleKeyDown = (event) => {
        if (event.code === 'Space') {
            this.playPause();
        }
        if (event.code === 'ArrowLeft') {
            this.setSeek(this.state.playedSeconds - 3, 'seconds')
        }
        if (event.code === 'ArrowRight') {
            this.setSeek(this.state.playedSeconds + 3, 'seconds')
        }
        if (event.code === "KeyW" || event.code === "KeyD"){
            // this.setState({...this.state, wlValue:Math.min(this.state.wlValue+1, this.state.maxWl)});
            this.colorChanges(Math.min(this.state.wlValue+1, this.state.maxWl))
        }
        if (event.code === "KeyS" || event.code === "KeyA"){
            // this.setState({...this.state, wlValue:Math.max(this.state.wlValue-1, this.state.minWl)});
            this.colorChanges(Math.max(this.state.wlValue-1, this.state.minWl))
        }
    }

    onPlay(e) {
        this.setState({...this.state, playing: true, paused: false});
    }

    onPause(e) {
        this.setState({...this.state, paused: true, playing: false});
    }

    onDuration(e) {
        console.log(e);
        this.setState({...this.state, duration: e});
    }

    onProgress(e) {
        this.setState({
            ...this.state,
            progress: e.played,
            playedSeconds: e.playedSeconds,
            loadedSeconds: e.loadedSeconds - e.playedSeconds,
        });
    }

    setSeek(e, t) {
        console.log("set seek " + e);
        this.playerRef.seekTo(e, t);
        this.setState({...this.state, setPlaying: true});
    }


    setTheme(theme) {
        document.documentElement.style.setProperty('--highlight-color', theme.highlightColor);
        document.documentElement.style.setProperty('--icon-focus-color', convertHexToRgbA(theme.highlightColor, 0.3));
    }

    playPause() {
        this.setState({...this.state, setPlaying: !this.state.setPlaying});
    }

    handleClickFullscreen() {
        if (screenfull.isEnabled) {
            if (screenfull.isFullscreen) {
                screenfull.exit()
            } else {
                screenfull.request(findDOMNode(this.playerViewRef));
            }
        }
    }

    colorChanges(val){
        var color = ""
        if (val <=3){
            color="green"
        }
        else if (val <=7){
            color="yellow"
        }
        else{
            color="red"
        }
        this.setState({...this.state, color: color, wlValue: val})
    }

    handleSliderChanges(e) {
        var val = parseInt(e.target.value)
        this.colorChanges(val);
    }

    average(arr){
        return arr.reduce((a, b) => a + b, 0)/arr.length ||0
    }

    lastNSlices(arr, n){
        return arr.length<=n? this.average(arr) : this.average(arr.slice(n*(-1)))
    }

    render() {
        if (this.state.playedSeconds!=this.state.lastTime){
            this.setState(preState=>({...this.state, 
                        lastTime: this.state.playedSeconds , 
                        wl: [...preState.wl, this.state.wlValue],
                        ma: [...preState.ma, this.average(preState.wl)],
                        ma_10hz: [...preState.ma_10hz, this.lastNSlices(preState.wl, 8)],
                        ma_20hz: [...preState.ma_20hz, this.lastNSlices(preState.wl, 40)],
                        timeSeries: [...preState.timeSeries, Math.round(this.state.playedSeconds*100)/100]}))
        }
        let {theme, width, height, metadata, style, url} = this.props;
        if (screenfull.isFullscreen) {
            width = "100%"
            height = "100%"
        }
        this.alteredProps = {
            ...this.alteredProps,
            playing: this.state.setPlaying,
            width: "960px",
            height: "540px",
            style: style,
            url: url
        }
        
        return (
            <div style={{"display":"flex", "flex-direction":"column", "align-items":"center"}} onKeyDown={this.keydownHandler}>
                <div className="player-wrapper" ref={(r) => this.playerViewRef = r}>
                    <ReactPlayer className='react-player' style={style}
                                {...this.alteredProps}
                                playing={this.state.setPlaying}
                                ref={(r) => this.playerRef = r}/>
                    {/* <Controller theme={theme} metadata={metadata} style={style}
                                playPause={this.playPause} width={width} height={height}
                                handleClickFullscreen={this.handleClickFullscreen}
                                playerState={this.state} setSeek={(e, t) => this.setSeek(e, t)}/> */}
                </div>
                <div style={Object.assign({"width":"70%"}, style)}>
                    <h4 htmlFor="customRange1" style={{"margin-top":"2%"}}> Mental Workload: <bold><strong 
                    style={{
                        "width": "30px",
                        "height": "30px",
                        "display": "inline-grid",
                        "text-align": "center",
                        "background-color":this.state.color}}>{this.state.wlValue}</strong></bold></h4>
                    <input value={this.state.wlValue} type="range" className="custom-range" id="customRange1" step="1" min={this.state.minWl.toString()} max={this.state.maxWl.toString()} onChange={this.handleSliderChanges}/>
                </div>
                <div style={Object.assign({"width":"70%"}, style)}>
                    <Line
                        data={{labels: this.state.timeSeries,
                                datasets: [
                                    {
                                        label: 'Workload Value',
                                        fill: false,
                                        lineTension: 0.5,
                                        backgroundColor: 'rgba(75,192,192,1)',
                                        borderColor: 'rgba(0,0,0,1)',
                                        borderWidth: 2,
                                        data: this.state.wl
                                    },
                                    {
                                        label: 'Moving Average Total',
                                        fill: true,
                                        lineTension: 0.5,
                                        backgroundColor: 'rgba(75,192,192,0.5)',
                                        // borderColor: 'rgba(0,0,0,1)',
                                        // borderWidth: 2,
                                        data: this.state.ma
                                        },
                                    {
                                        label: 'Moving Average 1s Window',
                                        fill: true,
                                        lineTension: 0.5,
                                        backgroundColor: 'rgba(75,192,0,0.5)',
                                        // borderColor: 'rgba(0,0,0,1)',
                                        // borderWidth: 2,
                                        data: this.state.ma_10hz
                                    },
                                    {
                                        label: 'Moving Average 5s Window',
                                        fill: true,
                                        lineTension: 0.5,
                                        backgroundColor: 'rgba(192,192,0,0.5)',
                                        // borderColor: 'rgba(0,0,0,1)',
                                        // borderWidth: 2,
                                        data: this.state.ma_20hz
                                    }
                                ]
                        }}
                        options={{
                            title:{
                                display:true,
                                text:'Moving Workload Over Time',
                                fontSize:20
                            },
                            legend:{
                                display:true,
                                position:'right'
                            },
                            // scales: {
                            //     yAxes: {
                            //         min: this.state.minWl,
                            //         max: this.state.maxWl
                            //     }
                            // }
                    }}
                    />
                </div>
            </div>
            );
    }
}