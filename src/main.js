import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import routers from './routes';

import App from './app.vue';
import 'iview/dist/styles/iview.css';
import echarts from 'echarts';
import axios from 'axios';
import VueCookie from 'vue-cookie';

import Http from './libs/http';
import apiUrl from './config/url';
import env from './config/env';
import constant from './libs/constant';
import JsonTree from 'vue-json-tree';
// Tell Vue to use the plugin
Vue.use(VueCookie);
Vue.use(VueRouter);
Vue.use(iView);
Vue.use(echarts);
Vue.use(apiUrl);
Vue.use(constant);
Vue.component('json-tree', JsonTree)
// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    window.document.title = to.meta.title;
    if (to.matched.some(record => record.meta.noAuth)) {
        iView.LoadingBar.start();
        next();
    } else {
        //检查是否存在cookie
        if (!Vue.cookie.get('is_login')) {
            //如果没有登录状态则跳转到登录页
            router.replace('/login');
        } else {
            //否则跳转到登录后的页面
            iView.LoadingBar.start();
            next();
        }
        iView.LoadingBar.start();
        next();
    }
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

const EnvURL = {
    'local': location.protocol + '//www.laravel_api.com',
    'dev': location.protocol + '//dev-saas-api.xianjincard.com',
    'test': location.protocol + '//test-saas-api.xianjincard.com',
    'pre': location.protocol + '//pre-saas-api.xianjincard.com',
    'pro': location.protocol + '//saas-api.xianjincard.com'
};
const apiurl = env && EnvURL[env] ? EnvURL[env] : EnvURL['pro'];
Vue.use(Http, { 'url': apiurl, 'router': router });

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});