import { LocalStorage } from '../services/local-storage';
import { StorageKeys } from '../constants';
import {Themes} from '../theme';
import {User} from './user';

const getThemes = () => {
    return Object.values(Themes);
}

const getDefaultTheme = (id, fromLocalstorage) => {
    const list = getThemes() ;
    let selTheme;
    if(fromLocalstorage) {
        const sTheme= list.filter((t) => { return t.meta.name === LocalStorage.getFromLocalStorage(StorageKeys.THEME)});
        if(sTheme && sTheme.length) {
            selTheme = sTheme[0];
        }
    } else if (id) {
        const sTheme= list.filter((t) => { return t.meta.name === id});
        if(sTheme && sTheme.length) {
            selTheme = sTheme[0];
        }
    }
    if(!selTheme) {
        return list[0];
    } else {
        return selTheme;
    }
}

const setSelectedTheme = (th) => {
    return User.setTheme(th);
}

const getSelectedTheme = () => {
    return User.getTheme();
}

export const ThemeService = {
    getDefaultTheme,
    getThemes,
    getSelectedTheme,
    setSelectedTheme
};