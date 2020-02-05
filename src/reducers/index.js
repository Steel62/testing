import getRandom from '../utils/getRandom';

export const initState = getInitState();

function getInitState() {
    const initState = {
        runGame: false,
        satelliteCounter: 4,
        satelliteSpeed: {},
    };
    for (let count = 1; count <= initState.satelliteCounter; count++){
        const name = `satellite${count}`;

        //начальная угловая скорость спутников случайным образом от 0,5 до 1,3 градусов
        initState.satelliteSpeed[name]=getRandom(50,130)/100;
    }
     return initState;
}

export function rootReducer(state = initState, action) {
    switch (action.type) {
        case 'SET_RUN_GAME':
            return {...state, runGame: action.payload};
        case 'CHANGE_SPEED':
            return {...state, satelliteSpeed: action.payload};
        default:
            return state;
    }
}