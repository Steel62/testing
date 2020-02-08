export default function mooveMoon(angle) {
    return{
        type: 'MOOVE_MOON',
        payload: angle,
    }
}