import React from 'react';
import icon from './moon.svg';
import './moon.css';

function Moon(props){
    //ширина и высота дива для орбиты
    const heightWidth = props.radius * 2;
    return(
        <div>
            <div className='moon detectCollapse' style={{
                left: props.left,
                top: props.top,
            }}>
                <img src={icon} alt=""/>
            </div>
            <div className="orbitMoon" style={{
                width: heightWidth,
                height: heightWidth
            }}></div>
        </div>
    );
}

export default Moon;