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
        initState.satelliteSpeed[name]=getRandom(20,120)/100;
    }
    console.log(initState);
     return initState;
}

export function rootReducer(state = initState, action) {
    switch (action.type) {
        case 'SET_RUN_GAME':
            return {...state, runGame: action.payload};
        case 'CHANGE_SPEED':
            return {...state, satelliteSpeed: action.payload};
            //return {...state, satelliteSpeed:{satellite1: action.payload}};
        default:
            return state;
    }
}