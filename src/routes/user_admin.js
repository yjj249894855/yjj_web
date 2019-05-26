import nav from '../views/nav.vue'

const user_admin = {
    path: '/user_admin/list',
    component: nav,
    meta: {
        title: '用户列表'
    },
    children: [{
        path: '',
        name: 'user_list',
        meta: {
            title: '用户列表'
        },
        component: require('../views/user_admin/list.vue')
    }, {
        path: '/user_admin/add',
        name: 'user_add',
        meta: {
            title: '新增帐号'
        },
        component: require('../views/user_admin/add.vue')
    }, {
        path: '/user_admin/edit',
        name: 'user_edit',
        meta: {
            title: '修改账号'
        },
        component: require('../views/user_admin/edit.vue')
    }]
};
const user = [user_admin];
export default user;

