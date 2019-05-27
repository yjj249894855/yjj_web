
<template>
    <div class="pic_upload">
        <Upload :action="action" :headers="headers" :on-success="handleSuccess">
            <i-button type="ghost" icon="ios-cloud-upload-outline">上传文件</i-button>
        </Upload>
        <div class="login-wrapper">
            <Input size="large" v-model="filename" placeholder="上传文件后地址">
            </Input>
        </div>
    </div>

</template>

<style scoped>
.login-wrapper {
    position: relative;
    float: left;
    width: 60%;
    margin-top: 10%;
}
</style>


<script>

export default {
    data () {
        return {
            action: this.$constant.apiurl + this.$apiUrl.API_MAIN_UPLOAD,
            headers: {
                'Accept': 'application/x.laravel_api.v1+json'
            },
            filename: '',
        };
    },
    methods: {
        handleSuccess (res, file) {
            this.filename = this.$constant.apiurl + '/' + res;
        },
    }
}
</script>