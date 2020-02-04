import React from 'react';
import './startButton.css';

function StartButton(props) {
    return(
        <button className='startButton' onClick={props.click}>Запуск</button>
    );
}

export default StartButton;