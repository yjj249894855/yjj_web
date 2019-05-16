import nav from '../views/nav.vue'

import login from './login'
import overview from './overview'

const routers = [
    ...login,
    ...overview,
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