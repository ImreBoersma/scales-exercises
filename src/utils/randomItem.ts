import { Scale } from "./types"

export const getRandomItem = (array: Scale[], level: number) => {
    let copy = array.slice(0);
    return () => {
        let filtered = copy.filter(i => i.level <= level)
        if (filtered.length < 1) filtered = array.slice(0)
        const index = Math.floor(Math.random() * filtered.length)
        const item = filtered[index]
        filtered.splice(index, 1)
        return item
    };
}