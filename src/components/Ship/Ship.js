import React from 'react';
import icon from './ship.svg';
import './ship.css';

class  Ship extends React.Component{
    render() {

        if (this.props.runGame === true){
            return (
                <div id='ship' className='ship' style={{
                    transitionDuration: `${this.props.shipSpeed}s`,
                    top: 0,
                }}>
                    <img src={icon} alt=""/>
                </div>
            );
        } else {
            let PositionTop = Math.round(document.documentElement.clientHeight / 2 - 110);
            return (
                <div id='ship' className='ship' style={{
                    transitionDuration: 0 +'s',
                    top: PositionTop,
                }}>
                    <img src={icon} alt=""/>
                </div>
            );
        }

    }
}

export default Ship;