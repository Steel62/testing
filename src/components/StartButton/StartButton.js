import React from 'react';
import './startButton.css';

class StartButton extends React.Component{
    render() {
        return (
                <button className='startButton' onClick={this.props.click}>Старт!</button>
        );
    }
}



export default StartButton;