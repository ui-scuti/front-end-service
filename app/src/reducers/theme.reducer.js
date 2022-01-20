import { ActionTypes, StorageKeys } from '../constants';

import { LocalStorage } from '../services';
import { ThemeService } from '../services/theme';

const intialState = {
    theme: ThemeService.getDefaultTheme(undefined, true)
};

export const themeReducer = (state = intialState, action) => {
    switch (action.type) {
        case ActionTypes.THEME_UPDATED:
            LocalStorage.saveInLocalStorage(StorageKeys.THEME, action.theme.meta.name);
            return Object.assign({}, state, {
                theme: action.theme,
            });
        case ActionTypes.THEME_CLEARED:
                LocalStorage.saveInLocalStorage(StorageKeys.THEME, '');
                return Object.assign({}, state, {
                    theme: ThemeService.getDefaultTheme(),
                });
        default:
            return state;
    }
}