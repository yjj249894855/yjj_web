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
                //未登录，AJAX直接跳转登录页面
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
        let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjQ4MWVkMGE4MzA3MTdiZDAzNmYwNDQ0ZTIzOWRlNDY3MWM3NWUyNGRiOGZkNjVmNWRmYzNjNDczOWMyMTBkOWVjZjE5ZGEwM2QzYzRiODMxIn0.eyJhdWQiOiIxIiwianRpIjoiNDgxZWQwYTgzMDcxN2JkMDM2ZjA0NDRlMjM5ZGU0NjcxYzc1ZTI0ZGI4ZmQ2NWY1ZGZjM2M0NzM5YzIxMGQ5ZWNmMTlkYTAzZDNjNGI4MzEiLCJpYXQiOjE1NTc5MTE3MjUsIm5iZiI6MTU1NzkxMTcyNSwiZXhwIjoxNTg5NTM0MTI1LCJzdWIiOiI1Iiwic2NvcGVzIjpbXX0.IgEnJWwk0h-WhNQy_9TW_pPS64qJNDvg09fy9zwji-LXmaQGL4cvwU8A7yes772pfLK7Gn6znvBkQAH4j31gRRj9UbuXB7KRw8-yeH6gjin6p3mEbUlJq_C8Uu9dQEeYN8T9UZy_aVME8I0VnaJzIrCRIpP8yzlIe_H62wDQu9S_KCAdUTHUOwy0DJov2JDflE0_VehUVTVoeX8BII4uWRtXjrov9rP6Ccc1Omigr77E7FDxsBugt5QLjOK5Cfms2CXfMedTUlbO5gammWyO6OUvd1Q44qFrE4AtbvP5x5gbPiwqXv0i2OxQugJTxEwYYYtMrertVs8dayjXDw-zrkxbQorazLxJS1xBrBzv0FD1wpLSdhkv9zDwwEPV3AzKUTs_FHwq1fBldRcNTKmlL_6R2D7xLShcPOtHZypnmIpwSSViroC88-mVRA-je-LOfH3MMqz89iVDekzLSSe_U2UdFlhZKBKvCJJcDzOnIalwS3KtzENCgBQ0lUeYdppyZQ_4cl8CkxIKQgQGTm1FOF7dbgjHE6xWULB-9qowwDwbzG1s1iAG9WBXUYi9kKcrzOntIIsioZVJmFsyBM6WFoE6RnC5AmF0-YbSBChGif8CkyPnH3Eu5Vvt2UKGpdDJT3Cn_yZ56X7eRVuIXbtjuuQD2N5iI3vagKM1ERBKvto';
        let headers = {
            'Authorization': 'Bearer ' + token,
        }
        return this.$ajax.get(url, { headers: headers, params: params ? params : {} });
    },
    post: function (url, params) {
        let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjQ4MWVkMGE4MzA3MTdiZDAzNmYwNDQ0ZTIzOWRlNDY3MWM3NWUyNGRiOGZkNjVmNWRmYzNjNDczOWMyMTBkOWVjZjE5ZGEwM2QzYzRiODMxIn0.eyJhdWQiOiIxIiwianRpIjoiNDgxZWQwYTgzMDcxN2JkMDM2ZjA0NDRlMjM5ZGU0NjcxYzc1ZTI0ZGI4ZmQ2NWY1ZGZjM2M0NzM5YzIxMGQ5ZWNmMTlkYTAzZDNjNGI4MzEiLCJpYXQiOjE1NTc5MTE3MjUsIm5iZiI6MTU1NzkxMTcyNSwiZXhwIjoxNTg5NTM0MTI1LCJzdWIiOiI1Iiwic2NvcGVzIjpbXX0.IgEnJWwk0h-WhNQy_9TW_pPS64qJNDvg09fy9zwji-LXmaQGL4cvwU8A7yes772pfLK7Gn6znvBkQAH4j31gRRj9UbuXB7KRw8-yeH6gjin6p3mEbUlJq_C8Uu9dQEeYN8T9UZy_aVME8I0VnaJzIrCRIpP8yzlIe_H62wDQu9S_KCAdUTHUOwy0DJov2JDflE0_VehUVTVoeX8BII4uWRtXjrov9rP6Ccc1Omigr77E7FDxsBugt5QLjOK5Cfms2CXfMedTUlbO5gammWyO6OUvd1Q44qFrE4AtbvP5x5gbPiwqXv0i2OxQugJTxEwYYYtMrertVs8dayjXDw-zrkxbQorazLxJS1xBrBzv0FD1wpLSdhkv9zDwwEPV3AzKUTs_FHwq1fBldRcNTKmlL_6R2D7xLShcPOtHZypnmIpwSSViroC88-mVRA-je-LOfH3MMqz89iVDekzLSSe_U2UdFlhZKBKvCJJcDzOnIalwS3KtzENCgBQ0lUeYdppyZQ_4cl8CkxIKQgQGTm1FOF7dbgjHE6xWULB-9qowwDwbzG1s1iAG9WBXUYi9kKcrzOntIIsioZVJmFsyBM6WFoE6RnC5AmF0-YbSBChGif8CkyPnH3Eu5Vvt2UKGpdDJT3Cn_yZ56X7eRVuIXbtjuuQD2N5iI3vagKM1ERBKvto';
        let headers = {
            'Authorization': 'Bearer ' + token,
        };
        return this.$ajax.post(url, params ? params : {}, { headers: headers });
    }
};
export default Http;