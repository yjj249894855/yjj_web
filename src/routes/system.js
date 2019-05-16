import nav from '../views/nav.vue'

const sys_log = {
    path: '/system/account_list',
    component: nav,
    meta: {
        title: '账号列表'
    },
    children: [{
        path: '',
        name: 'account_list',
        meta: {
            title: '账号列表'
        },
        component: require('../views/system/account_list.vue')
    }, {
        path: '/system/account_add',
        name: 'account_add',
        meta: {
            title: '新增帐号'
        },
        component: require('../views/system/account_add.vue')
    }]
};

const sys_api = {
    path: '/system/',
    component: nav,
    meta: {
        title: 'API统计'
    },
    children: [{
        path: 'open_api_list/',
        name: 'open_api_list',
        meta: {
            title: 'API日志'
        },
        component: require('../views/log/api/list.vue')
    }, {
        path: 'open_api_stat/',
        name: 'open_api_stat',
        meta: {
            title: 'API统计'
        },
        component: require('../views/log/api/chart.vue')
    }]
};

const system = [sys_key, sys_log, sys_api, setting];
export default system;