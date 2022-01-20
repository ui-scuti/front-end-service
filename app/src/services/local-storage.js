const saveInLocalStorage = (key, value, usePrefix) => {
    localStorage.setItem(getKey(key, usePrefix), typeof value === "object" ? JSON.stringify(value) : value);
}

const getFromLocalStorage = (key, defaultvalue, usePrefix = false) => {
    const val = localStorage.getItem(getKey(key, usePrefix));
    if (val) {
        return val;
    } else {
        return defaultvalue || '';
    }
}

const removeFromLocalStorage = (key, usePrefix) => {

    localStorage.removeItem(getKey(key, usePrefix));
}

const clearLocalStorage = () => {
    localStorage.clear();
}

const getKey = (key, usePrefix) => {
    if (usePrefix) {
        const user = getFromLocalStorage('EMAIL');
        return `${user}_${key}`;
    }
    return key;
}


export const LocalStorage = {
    saveInLocalStorage,
    getFromLocalStorage,
    removeFromLocalStorage,
    clearLocalStorage
};