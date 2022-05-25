/**
 *  Find the middle point between two points
 */
export const getMiddle = (a, b) => {
    return {
        x: a.x + (b.x - a.x) * 0.5,
        y: a.y + (b.y - a.y) * 0.5,
    }
}

/**
 * Find the distance between two points
 * @param a
 * @param b
 */
export const getDistance = (a, b) => {
    let x = 0;
    let y = 0;
    if (a && b) {
        x = a.x - b.x;
        y = a.y - b.y;
    }
    return Math.sqrt(x * x + y * y);
}

/**
 * Get the angle in degrees between two points
 * @param a
 * @param b
*/
export const getAngle = (a, b) => {
    return (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
}