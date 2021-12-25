import * as _ from 'lodash';
import * as request from './request';

import { PREFERENCE, StorageKeys } from '../constants';

import { GraphMethods } from '../constants';
import { LocalStorage } from '../services';

const authenticate = (userobject) => {
    return request.submit('user', 'authenticate', undefined, undefined, 'post', userobject);
}

const register = (userobject) => {
    return request.submit('user', 'register', undefined, undefined, 'post', userobject);
}

const getPermissions = () => {

    return request.submit('data', 'user', 'permissions');
}

const getScheduleStatus = (id) => {
    return request.submit('data', 'user', 'challengeschedule', id);
}

const startChallengeStatus = (id) => {
    return request.submit('data', 'user', 'challengestatus', id, 'put');
}


const getUserName = () => {
    return LocalStorage.getFromLocalStorage(StorageKeys.USER_NAME);
}



export const User = {
    authenticate: authenticate,
    getUserName: getUserName,
    getScheduleStatus: getScheduleStatus,
    startChallengeStatus: startChallengeStatus,
    getPermissions: getPermissions,
    register: register
}
