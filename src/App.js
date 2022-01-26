import './App.css';
import React from 'react'
// import Player from './player-comp/Player'
import VideoPlayPage from './pages/VideoPlayPage'
import MultiStepForm from './Components/MultiStepForm';
import VideoPlayUserPage from './pages/VideoPlayUserPage';
class App extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        page: 1,
    }

    nextPage = () => {
        const { page } = this.state
        this.setState({
            page : page + 1
        })
    }

    render() {
        const {page} = this.state;
        const inputValues = {page};
        var content
        switch(page) {
        case 1:
            content = <MultiStepForm nextPage={this.nextPage}/>
            break
        case 2:
            // content = <VideoPlayPage/>
            content = <VideoPlayUserPage/>
            break
        case 3:
            break
        }
        return(
            <div className="App">
                {content}
            </div>
        )
    }
}

export default App;