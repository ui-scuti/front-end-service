

import { submit } from './request';



export const compile = (code) => {
    return submit('data', 'test', 'code', 'compile', 'post', code);
}

export const submitCode = (code) => {
    return submit('data', 'test', 'code', 'submit', 'post', code);
}
