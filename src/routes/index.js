import nav from '../views/nav.vue'

import login from './login'
import overview from './overview'
import userAdmin from './userAdmin'


const routers = [
    ...login,
    ...overview,
    ...userAdmin,
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