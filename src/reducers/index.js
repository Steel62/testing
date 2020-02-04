export const initState = {
    runGame: false,
};

export function rootReducer(state = initState, action) {
    switch (action.type) {
        case 'SET_RUN_GAME':
            return {...state, runGame: action.payload};
        default:
            return state;
    }
}