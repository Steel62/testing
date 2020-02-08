import getRandom from '../utils/getRandom';

const initState = getInitState();

function getInitState() {
    const initState = {
        runGame: false,
        satelliteCounter: 4,
        shipSpeed: 3,
    };

    initState.satellitesProps = {};
    initState.moonProps = {};

    //создаем начальные свойства для спутников
    for (let count = 1; count <= initState.satelliteCounter; count++){
        const name = `satellite${count}`;
        initState.satellitesProps[name] = {};
    }
    for ( let key in initState.satellitesProps) {
        //начальная угловая скорость спутников случайным образом от 0,5 до 1,3 градусов
        initState.satellitesProps[key].speed = getRandom(50,130)/100;

        //направление вращения случайным образом
        initState.satellitesProps[key].clockwise = Math.random() > 0.5 ? true : false;

        //начальный угол случайным образом
        initState.satellitesProps[key].angle = getRandom(0, 360);

        //радиусы вращения спутников
        if (key === 'satellite1'){
            initState.satellitesProps[key].radius = 150;
        } else {
            const satelliteNumber = Number(key[9]);
            initState.satellitesProps[key].radius = 150 + 50 * (satelliteNumber - 1);
        }
    }

    //начальные свойства для Луны
    initState.moonProps.speed = getRandom(30, 50)/100;
    initState.moonProps.clockwise = Math.random() > 0.5 ? true : false;
    initState.moonProps.angle = getRandom(0, 360);
    initState.moonProps.radius = 150 + 50 * initState.satelliteCounter;

    return initState;
}

export default initState;