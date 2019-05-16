import nav from '../views/nav.vue'
const overview = [{
    path: '/',
    name:'index',
    meta:{
        title:'首页',
    },
    component: nav,
    redirect: { path: '/overview' },
    children: [{
        path: '/overview',
        name:'overview',
        meta:{
            title:'概览',
        },
        component: require('../views/overview.vue')
    }],
}];

export default overview