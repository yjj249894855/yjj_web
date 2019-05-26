import nav from '../views/nav.vue'

import login from './login'
import overview from './overview'
import user_admin from './user_admin'


const routers = [
    ...login,
    ...overview,
    ...user_admin,
    {
        path: '*',
        meta: {
            title: '页面不存在',
            noAuth: true
        },
        component: require('../views/notfound.vue')
    }
];
export default routers;