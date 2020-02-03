import React from 'react';
import './container.css';
import Earth from "../Earth/Earth";
import Satellite from '../Satellite/Satellite';
import Ship from "../Ship/Ship";
import StartButton from "../StartButton/StartButton";
import Moon from '../Moon/Moon';
import {connect} from "react-redux";
import setRunGame from '../../actions/RunGame';
//import mapStateToProps from "react-redux/es/connect/mapStateToProps";

class Container extends React.Component {
    constructor() {
        super();
        this.state = {
            runGame: false,
            satelliteCounter: 4,
            shipSpeed: 3,
            moonSpeed: 5,
        }
        this.clickStartButton = this.clickStartButton.bind(this);


    }
    render() {
        //создаем спутники
        let satellites = [140];
        for(let count = 1; count < this.state.satelliteCounter; count++){
            satellites.push(satellites[0] + (50 * count));
        }
        satellites = satellites.map(radius =><Satellite radius = {radius} key = {radius}/>);

        //вычисление радиуса орбиты луны
        const moonRadius = 140 + (this.state.satelliteCounter) * 50;


        return (
            <div className="container">
                <Earth/>
                <Ship
                    shipSpeed = {this.state.shipSpeed}
                    runGame = {this.state.runGame}
                />
                {satellites}
                <Moon radius={moonRadius}/>
                <StartButton click = {this.clickStartButton}/>
            </div>
        )
    }

    clickStartButton(){
        this.setState(prevState =>{
            prevState.runGame = true;
            return prevState;
        })

        const elemShip = document.getElementById('ship');
        const elemForCollapse = document.querySelectorAll('.detectCollapse');

        const timer = setInterval(()=>{

            //проверка на достижение верхней границы окна
            if (elemShip.offsetTop === 0){
                clearInterval(timer);
                alert('Ракета успешно вышла в открытый космос');
                this.setState(prevState => prevState.runGame = false)

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
                                this.setState(prevState => prevState.runGame = false)
                            }
                        }
                    }
                });
            }
        },50);
    };


}

function mapStateToProps(state){
    return {
        runGame: state.runGame,
    }
}

export default connect(mapStateToProps)(Container);