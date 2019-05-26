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
            //404错误
            if (e && e.message == 'Network Error') {
                return { code: -4, msg: '网络连不上了，稍后再试一下！' };
            }
            if (e && e.message == 'Request failed with status code 405') {
                return { code: -4, msg: 'Method Not Allowed' };
            }
            //500错误
            if (e && e.message == 'Request failed with status code 500') {
                return { code: -5, msg: '服务出错了，请稍后重试！' };
            }
            if (e && (e.code == 'ECONNABORTED' || e.message == 'ECONNABORTED')) {
                return { code: -5, msg: '接口超时，请联系一下工程师！' };
            }
            return { code: -1, msg: '出错了，请稍后重试！' };
        });
        this.baseUrl = url;
        Vue.prototype.$http = this;
        Vue.http = this;
    },
    get: function (url, params) {
        let token = Vue.cookie.get('token');
        let headers = {
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/x.laravel_api.v1+json'
        }
        return this.$ajax.get(url, { headers: headers, params: params ? params : {} });
    },
    post: function (url, params) {
        let token = Vue.cookie.get('token');
        let headers = {
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/x.laravel_api.v1+json'
        };
        return this.$ajax.post(url, params ? params : {}, { headers: headers });
    },
    put: function (url, params) {
        let token = Vue.cookie.get('token');
        let headers = {
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/x.laravel_api.v1+json'
        };
        return this.$ajax.put(url, params ? params : {}, { headers: headers });
    },
    delete: function (url, params) {
        let token = Vue.cookie.get('token');
        let headers = {
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/x.laravel_api.v1+json'
        };
        return this.$ajax.delete(url, { headers: headers, params: params ? params : {} });
    }
};
export default Http;