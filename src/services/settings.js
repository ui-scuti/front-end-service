import * as request from './request';

import { PREFERENCE, StorageKeys } from '../constants';

import { GraphMethods } from '../constants';
import { LocalStorage } from '../services';

export const getBranding = (userName, password) => {
    return request.submit('data', 'branding', undefined, undefined, 'get');
}

export const setBranding = (brandingobj) => {
    return request.submit('data', 'branding', undefined, undefined, 'post', brandingobj);
}

