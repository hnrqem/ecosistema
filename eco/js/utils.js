export const calcDistancia = (x1, y1, x2, y2) => {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
};

export const randomRange = (min, max) => Math.random() * (max - min) + min;