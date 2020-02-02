import React from 'react';
import icon from './sputnik.svg';
import './satellite.css';
import getRandom from '../../utils/getRandom';

class Satellite extends React.Component{
    constructor(props){
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
            this.setState(prevState => {
                prevState.angle += 0.5;
                return prevState;
            })
        }, this.state.speed);
    }

    render(){
        //вычисления центра вращения
        const verticalCenter = document.documentElement.clientHeight / 2 - 21;
        const gorisontalCenter = document.documentElement.clientWidth / 2 - 15;

        //вычисление координат X и Y
        const angle = this.state.angle * 2 * Math.PI/180;
        const positionX = gorisontalCenter + this.state.radius*Math.cos(angle);
        let positionY;
        if (this.state.clockwise === true) {
            positionY = verticalCenter + this.state.radius*Math.sin(angle);
        } else {
            positionY = verticalCenter + this.state.radius*(-Math.sin(angle));
        }

        //поворот вокруг своей оси
        const rotateSelf = (this.state.clockwise === true) ? this.state.angle : -this.state.angle;


        return(
            <div className='satellite detectCollapse' style={{
                left: positionX,
                top: positionY,
            }}>
                <img src={icon} alt="" style = {{transform: `rotate(${rotateSelf}deg)`}}/>
            </div>
        );
    }


}

export default Satellite;