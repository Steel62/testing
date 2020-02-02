//генератор случайных чисел от min до max

export default function getRandom(min, max) {
    const random = min + Math.random() * (max - min);
    return Math.floor(random);
}

