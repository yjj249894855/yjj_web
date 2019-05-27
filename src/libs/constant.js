let env = 'local';
const EnvURL = {
    'local': location.protocol + '//www.laravel_api.com',
    'dev': location.protocol + '//dev-saas-api.xianjincard.com',
    'test': location.protocol + '//test-saas-api.xianjincard.com',
    'pre': location.protocol + '//pre-saas-api.xianjincard.com',
    'pro': location.protocol + '//saas-api.xianjincard.com'
};
const apiurl = env && EnvURL[env] ? EnvURL[env] : EnvURL['pro'];
const constant = {
    install (Vue) {
        Vue.prototype.$constant = this;
    },
    KeyType: {
        Boolean: 0,
        String: 1,
        Float: 2,
        Text: 3,
        Option: 4
    },
    apiurl: apiurl
}
export default constant;