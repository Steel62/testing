export default function makeCounter() {
    let count = 0;
    return () => count++;
}