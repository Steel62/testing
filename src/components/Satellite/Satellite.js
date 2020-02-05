import React from 'react';
import icon from './sputnik.svg';
import './satellite.css';
import getRandom from '../../utils/getRandom';
import getXYPosition from '../../utils/getXYPosition';

class Satellite extends React.Component {
    constructor(props) {
        super();

        //направление вращения случайным образом
        const clockwise = Math.random() > 0.5 ? true : false;

        //начальный угол случайным образом
        const angle = getRandom(0, 360);

        //скорость случайным образом
        const speed = getRandom(10, 20);


        this.state = {
            radius: props.radius,
            speed: speed,
            angle: angle,
            clockwise: clockwise,
        };

        setInterval(() => {
            if (this.state.clockwise === true){
                this.setState(prevState => {
                    prevState.angle += 0.5;
                    return prevState;
                })
            } else {
                this.setState(prevState => {
                    prevState.angle -= 0.5;
                    return prevState;
                })
            }

        }, this.state.speed);
    }

    render() {
        //вычисления центра вращения
        const verticalCenter = document.documentElement.clientHeight / 2 - 21;
        const gorisontalCenter = document.documentElement.clientWidth / 2 - 15;

        const XYPosition = getXYPosition(this.state.angle, this.state.radius, gorisontalCenter, verticalCenter);

        //поворот вокруг своей оси
        const rotateSelf = this.state.angle;

        //ширина и высота дива для орбиты
        const heightWidth = this.props.radius * 2;

        return (
            <div>
                <div className='satellite detectCollapse' style={{
                    left: XYPosition.XPosition,
                    top: XYPosition.YPosition,
                }}>
                    <img src={icon} alt="" style={{transform: `rotate(${rotateSelf}deg)`}}/>
                </div>
                <div className="orbitSatellite" style={{
                    width: heightWidth,
                    height: heightWidth
                }}></div>
            </div>

        );
    }


}

export default Satellite;