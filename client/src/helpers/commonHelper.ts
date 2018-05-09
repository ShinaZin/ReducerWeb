export const mapToArray = (map: Map<any, any>) =>
    Array.from(map, ([key, value]) => ({
        key,
        value
    }));

export const arrayToMap = (array: Array<any>) => {
    if (array && array.length) {
        return new Map(array.map(x => [x.key, x.value] as [any, any]));
    } else {
        return new Map();
    }
};
