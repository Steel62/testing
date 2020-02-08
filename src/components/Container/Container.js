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
import mooveSatellites from '../../actions/MooveSatellites';
import mooveMoon from '../../actions/MooveMoon';
import getXYPosition from '../../utils/getXYPosition';
import SpeedRange from '../SpeedRange/SpeedRange';

class Container extends React.Component {
    constructor(props) {
        super();

        //запускаем спутники и Луну
        setInterval(() =>{
            const newSatellitesProps = Object.assign({}, props.store.satellitesProps);
            for (let key in newSatellitesProps){
                if (newSatellitesProps[key].clockwise === true) {
                    newSatellitesProps[key].angle += newSatellitesProps[key].speed;
                } else {
                    newSatellitesProps[key].angle -= newSatellitesProps[key].speed;
                }
            }
            let newAngleMoon;
            if (props.store.moonProps.clockwise){
                newAngleMoon = props.store.moonProps.angle + props.store.moonProps.speed;
            } else {
                newAngleMoon = props.store.moonProps.angle - props.store.moonProps.speed;

            }

            this.props.mooveSatellites(newSatellitesProps);
            this.props.mooveMoon(newAngleMoon);

        }, 40);

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
        for (let key in this.props.store.satellitesProps){
            arrSatellites.push(this.props.store.satellitesProps[key]);
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
        const moonPositionXY = getXYPosition(this.props.store.moonProps.angle, this.props.store.moonProps.radius,
            document.documentElement.clientWidth / 2 - 25, document.documentElement.clientHeight / 2 - 26);


        return (
            <div className="container">
                <SpeedRange
                    values={this.props.store.satellitesProps}
                    onChange={this.changeSpeed}/>
                <Earth/>
                <Ship
                    shipSpeed = {this.props.store.shipSpeed}
                    runGame = {this.props.store.runGame}
                />
                {satellites}
                <Moon radius={this.props.store.moonProps.radius} top={moonPositionXY.YPosition} left={moonPositionXY.XPosition}
                angle={this.props.store.moonProps.angle}/>
                <StartButton click = {this.clickStartButton}/>
            </div>
        )
    }
    changeSpeed(event){
        const newSatelliteSpeed = Object.assign({}, this.props.store.satellitesProps);
        newSatelliteSpeed[event.target.id].speed = Number(event.target.value);
        this.props.changeSpeedRange(newSatelliteSpeed);
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
        store: store,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setRunGame: run => dispatch(setRunGame(run)),
        changeSpeedRange: newSatellitesProps => dispatch(changeSpeedRange(newSatellitesProps)),
        mooveSatellites: satellitesProps => dispatch(mooveSatellites(satellitesProps)),
        mooveMoon: moonAngle => dispatch(mooveMoon(moonAngle)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);