const apiUrl = {
    install (Vue) {
        Vue.prototype.$apiUrl = this;
    },
    //登录-退出
    API_MAIN_LOGIN: '/api/main/login',
    API_MAIN_LOGOUT: '/api/main/logout',
    API_MAIN_UPLOAD: '/api/main/upload',
    //基础获取菜单信息
    API_BASE_USER_INFO: '/api/base/user-info',
    API_BASE_MENU: '/api/base/menu',
    //admin用户模块
    API_USER: '/api/user/',
};
export default apiUrl;