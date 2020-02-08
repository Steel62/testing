import initState from './initState';

export function rootReducer(state = initState, action) {
    switch (action.type) {
        case 'SET_RUN_GAME':
            return {...state, runGame: action.payload};
        case 'CHANGE_SPEED':
            return {...state, satellitesProps: action.payload};
        case 'MOOVE_SATELLITES':
            return {...state, satellitesProps: action.payload};
        case 'MOOVE_MOON':
            const newstate = Object.assign({}, state);
            newstate.moonProps.angle = action.payload;
            return newstate;
        default:
            return state;
    }
}