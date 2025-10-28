

export function getRandom(array) {
    if (!Array.isArray(array) || array.length === 0) return "…";

    const index = Math.floor(Math.random() * array.length);
    
    return array[index];
}
