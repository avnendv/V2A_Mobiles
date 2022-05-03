export const getLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

export const removeItemLocalStorage = (key) => {
    localStorage.removeItem(key);
    return getLocalStorage(key);
}

export const clearLocalStorage = () => {
    localStorage.clear();
}

const setLocalStorage = (key, value) => {
    const date = new Date();
    localStorage.setItem(key, JSON.stringify({
        ...value,
        modify: date.getTime(),
    }));
    return getLocalStorage(key);
}
export default setLocalStorage;
