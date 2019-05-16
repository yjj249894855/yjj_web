
const login_routes = [{
    path: '/login',
    name: 'login',
    meta: {
        title: '登录',
        noAuth: true
    },
    component: require('../views/login.vue')
}, {
    path: '/logout',
    name: 'logout',
    meta: {
        title: '退出登录'
    },
    component: require('../views/logout.vue')
}];

export default login_routes;