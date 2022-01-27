import React from 'react'
import GaugeChart from 'react-gauge-chart'
class GaugeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wlValue: props.initWl, // start workload value
            maxWl: props.maxWl,
            minWl: props.minWl,
            num: props.maxWl - props.minWl,
            pro: (props.initWl-props.minWl)/(props.maxWl-props.minWl)
        }
    }

    handleKeyDown = (event) => {
        event.preventDefault()
        if (event.code === "ArrowRight" || event.code === "ArrowUp"){
            this.colorChanges(Math.min(this.state.wlValue+1, this.state.maxWl))
        }
        if (event.code === "ArrowLeft" || event.code === "ArrowDown"){
            this.colorChanges(Math.max(this.state.wlValue-1, this.state.minWl))
        }
    }

    colorChanges(val){
        var col = (1-(val-1)/(this.state.maxWl-this.state.minWl+1))*120
        var color = `hsl(${col}, 100%, 50%)`
        this.setState({...this.state, wlValue: val, num: this.state.maxWl - this.state.minWl,
            pro: (this.state.wlValue-this.state.minWl)/(this.state.maxWl-this.state.minWl)})
    }

    componentDidMount() {
        this.colorChanges(this.state.wlValue)
        window.addEventListener('keydown', this.handleKeyDown);
    }

    overlayStyle2 = {
        'height':'100%',
        'width': '100%',
        'position': 'absolute',
        ...this.props.style,
    }


    render() {
        return (
            <div>
                <GaugeChart id="gauge-chart2" 
                        nrOfLevels={this.state.num} 
                        percent={this.state.pro} 
                        animate={false} 
                        textColor={this.props.textColor}
                        // animDelay={0}
                        style = {this.overlayStyle2}
                />
            </div>
        );
    }
}

export default GaugeComponent;