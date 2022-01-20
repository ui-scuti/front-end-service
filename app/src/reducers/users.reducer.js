import { ActionTypes, StorageKeys } from '../constants';
import { LocalStorage } from '../services';

const intialState = {
    user: {
        isAuthenticated: LocalStorage.getFromLocalStorage(StorageKeys.IS_AUTHENTICATED) === "true",
        token: LocalStorage.getFromLocalStorage(StorageKeys.LOGIN_TOKEN),
        name: LocalStorage.getFromLocalStorage(StorageKeys.USER_NAME),
        user: LocalStorage.getFromLocalStorage(StorageKeys.USER) ? JSON.parse(LocalStorage.getFromLocalStorage(StorageKeys.USER)) : {}

    }
};

export const userReducer = (state = intialState, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN_SUCCESS:
            LocalStorage.saveInLocalStorage(StorageKeys.IS_AUTHENTICATED, true);
            LocalStorage.saveInLocalStorage(StorageKeys.USER, JSON.stringify(action.user));
            return Object.assign({}, state, {
                user: {
                    ...state.user,
                    ...action.user,
                    isAuthenticated: true
                }
            });
        case ActionTypes.LOGOUT_SUCCESS:
            LocalStorage.saveInLocalStorage(StorageKeys.IS_AUTHENTICATED, false);
            LocalStorage.saveInLocalStorage(StorageKeys.LOGIN_TOKEN, '');
            LocalStorage.saveInLocalStorage(StorageKeys.USER, '');

            LocalStorage.saveInLocalStorage(StorageKeys.BRAND_TITLE, '');
            LocalStorage.saveInLocalStorage(StorageKeys.BRAND_DESCRIPTION, '');
            LocalStorage.saveInLocalStorage(StorageKeys.BRAND_LOGO_SMALL, '');
            LocalStorage.saveInLocalStorage(StorageKeys.BRAND_LOGO_LARGE, '');
            return Object.assign({}, state, {
                user: {
                    ...state.user,
                    isAuthenticated: false,
                    signupSuccess: false,
                    verifySuccess: false,
                    excel: false,
                    token: null,
                    role: null
                }
            });
        default:
            return state;
    }
}