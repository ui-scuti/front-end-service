import { reducer as form } from 'redux-form';
import { themeReducer } from './theme.reducer';
import { userReducer } from './users.reducer';
import { brandingReducer } from './branding.reducer';


export default {
    userReducer,
    themeReducer,
    brandingReducer,
    form
};