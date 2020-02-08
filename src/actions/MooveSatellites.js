export default function mooveSatellites(satellitesProps) {
    return{
        type: 'MOOVE_SATELLITES',
        payload: satellitesProps,
    }
}