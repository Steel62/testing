import React from 'react';
import icon from './sputnik.svg';
import './satellite.css';

function Satellite(props) {
    const orbiteWidthHeight = props.radius * 2;
    return (
        <div>
            <div className='satellite detectCollapse' style={{
                left: props.left,
                top: props.top,
            }}>
                <img src={icon} alt="" style={{transform: `rotate(${props.rotateSelf}deg)`}}/>
            </div>
            <div className="orbitSatellite" style={{
                width: orbiteWidthHeight,
                height: orbiteWidthHeight,
            }}></div>
        </div>

    );
}

export default Satellite;