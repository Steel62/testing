export default function changeSpeedRange(newSatellitesProps) {
    return{
        type: 'CHANGE_SPEED',
        payload: newSatellitesProps,
    }
}