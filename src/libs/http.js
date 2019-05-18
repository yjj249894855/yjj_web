import Vue from 'vue';
import axios from 'axios';
const Http = {
    install (Vue, option) {
        const url = option['url'];
        if (!url) {
            throw new Error('URL is missing!');
        }
        const timeout = option['timeout'] || 200000;
        this.router = option['router'];
        this.$ajax = axios.create({
            baseURL: url,
            timeout: timeout
        });
        const ths = this;
        axios.defaults.withCredentials = true;
        this.$ajax.interceptors.response.use(function (res) {
            //console.log(res);
            // Do something with response data
            if (res.data) {
                //未登录，AJAX直接跳转登录页面-暂定-需要知道未登陆的code
                if (res.data.code == 1001 && ths.router) {
                    ths.router.replace('/login');
                }
                return res.data;
            } else {
                return { code: res.status, message: '服务开小差了，请稍后重试！' };
            }
        }, function (e) {
            if (e && e.message == 'Network Error') {
                return { code: -2, message: '网络连不上了，稍后再试一下！' };
            }
            if (e && (e.code == 'ECONNABORTED' || e.message == 'ECONNABORTED')) {
                return { code: -3, message: '接口超时，请联系一下工程师！' };
            }
            return { code: -1, message: '出错了，请稍后重试！' };
        });
        this.baseUrl = url;
        Vue.prototype.$http = this;
        Vue.http = this;
    },
    get: function (url, params) {
        let token = Vue.cookie.get('token');
        let headers = {
            'Authorization': 'Bearer ' + token,
        }
        return this.$ajax.get(url, { headers: headers, params: params ? params : {} });
    },
    post: function (url, params) {
        let token = Vue.cookie.get('token');
        let headers = {
            'Authorization': 'Bearer ' + token,
        };
        return this.$ajax.post(url, params ? params : {}, { headers: headers });
    }
};
export default Http;