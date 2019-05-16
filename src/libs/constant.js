const constant = {
    install (Vue){
        Vue.prototype.$constant = this;
    },
    KeyType : {
        Boolean:0,
        String:1,
        Float:2,
        Text:3,
        Option:4
    }
}
export default constant;