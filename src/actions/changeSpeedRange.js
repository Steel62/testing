export default function changeSpeedRange(newSpeed) {
    return{
        type: 'CHANGE_SPEED',
        payload: newSpeed,
    }
}