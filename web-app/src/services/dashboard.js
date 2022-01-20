

import { submit } from './request';



export const getAdminDashboard = () => {
    return submit('data', 'dashboard', 'admin', 'get');
}

