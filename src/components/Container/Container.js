import React from 'react';
import './container.css';
import Earth from "../Earth/Earth";
import Satellite from '../Satellite/Satellite';
import Ship from "../Ship/Ship";
import StartButton from "../StartButton/StartButton";
import Moon from '../Moon/Moon';
import {connect} from "react-redux";
import setRunGame from '../../actions/RunGame';
import changeSpeedRange from '../../actions/changeSpeedRange';
import getRandom from '../../utils/getRandom';
import makeCounter from '../../utils/makeCounter'
import getXYPosition from '../../utils/getXYPosition';
import SpeedRange from '../SpeedRange/SpeedRange';

class Container extends React.Component {
    constructor(props) {
        super();
        this.state = {
            satelliteCounter: 4,
            shipSpeed: 3,
            moonSpeed: 5,
            satellitesProps: {},
            moonProps: {},
        };
        //создаем в state.satelliteProps пустые объекты satellite[satelliteCounter]
        for (let count =1; count <= this.state.satelliteCounter; count++){
            const name = `satellite${count}`;
            this.state.satellitesProps[name] = {};
        }

        //наполняем свойствами state.satelliteProps.satellite[satelliteCounter]
        let satelliteCounter = makeCounter();
        satelliteCounter();
        for (let key in this.state.satellitesProps){

            //направление вращения случайным образом
            const clockwise = Math.random() > 0.5 ? true : false;
            this.state.satellitesProps[key].clockwise = clockwise;

            //начальный угол случайным образом
            const angle = getRandom(0, 360);
            this.state.satellitesProps[key].angle = angle;

            //формируем радиусы вращения спутников
            const satelliteNumber = satelliteCounter();
            if (satelliteNumber === 1){
                this.state.satellitesProps[key].radius = 150;
            } else {
                this.state.satellitesProps[key].radius = 150 + 50 * (satelliteNumber - 1);
            }

            //наполняем свойствами объект Moon
            //направление вращения случайным образом
            this.state.moonProps.clockwise = Math.random() > 0.5 ? true : false;

            //начальный угол случайным образом
            this.state.moonProps.angle = getRandom(0, 360);

            //скорость случайным образом
            this.state.moonProps.speed = getRandom(30, 50)/100;

            //радиус вращения
            this.state.moonProps.radius = 150 +50 * props.satelliteCounter;

        }

        //запускаем спутники и Луну
        setInterval(() => {
            for (let key in this.state.satellitesProps){
                this.setState((prevState =>{
                    if (this.state.satellitesProps[key].clockwise === true) {
                        prevState.satellitesProps[key].angle = prevState.satellitesProps[key].angle + this.props.satelliteSpeed[key];
                    } else {
                        prevState.satellitesProps[key].angle = prevState.satellitesProps[key].angle - this.props.satelliteSpeed[key];
                    }
                    return prevState;
                }))
            }
            this.setState(prevState =>{
                if (prevState.moonProps.clockwise === true){
                    prevState.moonProps.angle += prevState.moonProps.speed;
                } else {
                    prevState.moonProps.angle -= prevState.moonProps.speed;
                }

                return prevState;
            })
        },40);

        //биндим обрабртчики событий
        this.clickStartButton = this.clickStartButton.bind(this);
        this.changeSpeed = this.changeSpeed.bind(this);

    }
    render() {

        //рендерим спутники
            //вычисления центра вращения
        const verticalCenter = document.documentElement.clientHeight / 2 - 21;
        const gorisontalCenter = document.documentElement.clientWidth / 2 - 15;

            //перегоняем свойства спутников из стейта в массив
        let arrSatellites = [];
        for (let key in this.state.satellitesProps){
            arrSatellites.push(this.state.satellitesProps[key]);
        }
            //готовим массив с параметрами к рендерингу
        let satellites = arrSatellites.map(satellite =>{
            const XYPosition = getXYPosition(satellite.angle, satellite.radius, gorisontalCenter, verticalCenter);
            return {
                left: XYPosition.XPosition,
                top: XYPosition.YPosition,
                radius: satellite.radius,
                rotateSelf: satellite.angle,
            }
        });
        satellites = satellites.map(satellite =>{
            return(<Satellite left={satellite.left} top={satellite.top} radius={satellite.radius}
                              rotateSelf={satellite.rotateSelf} key={satellite.radius}/>);
        });

        //вычисление координат для луны
        const moonPositionXY = getXYPosition(this.state.moonProps.angle, this.state.moonProps.radius,
            document.documentElement.clientWidth / 2 - 25, document.documentElement.clientHeight / 2 - 26);


        return (
            <div className="container">
                <SpeedRange values={this.props.satelliteSpeed} onChange={this.changeSpeed}/>
                <Earth/>
                <Ship
                    shipSpeed = {this.state.shipSpeed}
                    runGame = {this.props.runGame}
                />
                {satellites}
                <Moon radius={this.state.moonProps.radius} top={moonPositionXY.YPosition} left={moonPositionXY.XPosition}/>
                <StartButton click = {this.clickStartButton}/>
            </div>
        )
    }

    changeSpeed(event){
        const satelliteSpeed = this.props.satelliteSpeed;
        switch (event.target.id) {
            case 'satellite1':
                satelliteSpeed.satellite1 = Number(event.target.value);
                break;
            case 'satellite2':
                satelliteSpeed.satellite2 = Number(event.target.value);
                break;
            case 'satellite3':
                satelliteSpeed.satellite3 = Number(event.target.value);
                break;
            case 'satellite4':
                satelliteSpeed.satellite4 = Number(event.target.value);
                break;
        }
    }

    clickStartButton(){
        this.props.setRunGame(true);

        const elemShip = document.getElementById('ship');
        const elemForCollapse = document.querySelectorAll('.detectCollapse');

        const timer = setInterval(()=>{

            //проверка на достижение верхней границы окна
            if (elemShip.offsetTop === 0){
                clearInterval(timer);
                alert('Ракета успешно вышла в открытый космос');
                this.props.setRunGame(false);

            } else {

                //проверка на столкновение. Объектам столкновения присвоен класс detectCollapse
                elemForCollapse.forEach(element => {
                    if (element.offsetTop < document.documentElement.clientWidth / 2){
                        if (element.offsetLeft + element.offsetWidth >= elemShip.offsetLeft &&
                            element.offsetLeft <= elemShip.offsetLeft + elemShip.offsetWidth){
                            if (element.offsetTop + element.offsetHeight >= elemShip.offsetTop &&
                                element.offsetTop <= elemShip.offsetTop + elemShip.offsetHeight){
                                clearInterval(timer);
                                alert('Произошло столкновение');
                                this.props.setRunGame(false);
                            }
                        }
                    }
                });
            }
        },50);
    };
}

const mapStateToProps = store => {
    return {
        runGame: store.runGame,
        satelliteSpeed: store.satelliteSpeed,
        satelliteCounter: store.satelliteCounter,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setRunGame: run => dispatch(setRunGame(run)),
        changeSpeedRange: speed => dispatch(changeSpeedRange(speed)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);