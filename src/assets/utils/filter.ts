export const genericFilter = (filterData: string[], searchString: string) => {
    if (!searchString) {
        return true;
    }
    const searchWords = searchString
        .replace(/\s+/, ' ')
        .split(' ');

    const data = filterData
        .map(s => s.trim().toLowerCase())
        .join('\n');

    return searchWords.every(str => {
        const regex = new RegExp(`^${str}.*`, 'gim');
        return data.match(regex);
    });
};

export const filterTask = (object: any, searchString: string) => {
    console.log(object.username, ' ', searchString);

    const data = [object.username]
        .filter(field => field);
    return genericFilter(data, searchString);
};
