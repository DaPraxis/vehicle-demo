import React from 'react'
import PlayerUser from '../player-comp/PlayerUser';
import Player from '../player-comp/PlayerUser'
class VideoPlayUserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: '', url: "https://youtu.be/3Oj8ucMgDpw"};
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleKeyPress(event) {
        if (event.code == "Enter" || event.key == "Enter") {
            this.setState({url: this.state.value})
        }
    }

    render() {
        return (
            <div className="Section">
                {/* <div className="form_group field">
                    <input type="input" className="form_field" placeholder="Name" name="Link" id='name'
                            value={this.state.value} onChange={this.handleChange} onKeyPress={this.handleKeyPress}
                            required/>
                    <label htmlFor="name" className="form__label">Link</label>
                </div>
                <br/> */}
                {this.state.url.length > 0 &&
                <div >
                    <PlayerUser url={this.state.url}
                        // style={{"left": "5%"}}
                        playing={true}
                        metadata={{
                            title: " ",
                            subtitle: " "
                        }}
                        theme={{
                            bgColor: "#000000",
                            textColor: "#ffffff",
                            // topBarHeight: "70px",
                            bottomBarHeight: "50px",
                            highlightColor: "#ff0000"
                        }}/> 
                </div>
                }
            </div>
        );
    }
}

export default VideoPlayUserPage;