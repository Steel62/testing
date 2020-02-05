//вычисление координат X и Y. На входе угол в градусах, радиус, Xposition и Yposition координаты центра вращения.
// Возвращает объект с координатами X и Y.

export default function getXYPosition(angle, radius, XPosition, YPosition) {
    const angleInRad = angle * 2 * Math.PI / 180;
    const positionX = XPosition + radius * Math.cos(angleInRad);
    const positionY = YPosition + radius * Math.sin(angleInRad);

    return {
        XPosition: positionX,
        YPosition: positionY,
    }
}
