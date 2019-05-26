<template>
    <div class="login-wrapper">
        <h1 style="text-align:center;margin:10px 0;">ADMIN</h1>

        <Form ref="userData" :model="userData" :rules="ruleValidate">
            <FormItem prop="mail">
                <Input size="large" v-model="userData.mail" placeholder="邮箱">
                <Icon type="ios-email-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="pswd">
                <Input type="password" size="large" v-model="userData.pswd" placeholder="密码" @on-keypress="inputKey">
                <Icon type="ios-locked-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem>
                <Button type="success" :loading="isloading" long @click="handleSubmit('userData')">登录</Button>
            </FormItem>
        </Form>
        <!-- <div class="title-register">
            <span>
                <a @click="toRegister()">没帐号？去注册公司帐号</a>
            </span>
        </div> -->
    </div>
</template>
<style scoped>
.login-wrapper {
    position: relative;
    float: left;
    width: 20%;
    left: 40%;
    margin-top: 10%;
}

.icon {
    margin-top: 1px;
    width: 28px;
    height: 32.2px;
    text-align: center;
    background-color: #eee;
    border: 1px solid #dddee1;
    border-radius: 6px 0px 0px 6px;
}
</style>
<script>
export default {
    data () {
        return {
            isloading: false,
            userData: {
                mail: "",
                pswd: ""
            },
            ruleValidate: {
                mail: [
                    {
                        required: true,
                        message: "邮箱不能为空",
                        trigger: "blur"
                    },
                    {
                        type: "email",
                        message: "请填写正确的邮箱格式",
                        trigger: "blur"
                    }
                ],
                pswd: [
                    {
                        required: true,
                        message: "请填写密码",
                        trigger: "blur"
                    },
                    {
                        type: "string",
                        min: 6,
                        message: "密码长度不能小于6位",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    created () {
        const email = this.$cookie.get("email");
        if (email) this.userData.mail = email;
    },
    methods: {
        inputKey (event) {
            if (event && event.code && event.code == "Enter") {
                this.handleSubmit("userData");
            }
        },
        handleSubmit (name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    this.isloading = true;
                    this.$http
                        .post(this.$apiUrl.API_MAIN_LOGIN, {
                            email: this.userData.mail,
                            password: this.userData.pswd
                        })
                        .then(res => {
                            if (res.code == 0) {
                                this.$cookie.set("is_login", 1);
                                this.$cookie.set("email", this.userData.mail);
                                this.$cookie.set("token", res.data.token);
                                this.$Message.success("登录成功!");
                                //if (this.userData.login_type == 0) {
                                this.$router.replace("/");
                                // } else {
                                //   this.$router.replace("/admin");
                                // }
                            } else {
                                this.$Message.error(res.msg || "登录失败！");
                            }
                            this.isloading = false;
                        });
                } else {
                    this.$Message.error("请输入正确的登陆信息!");
                }
            });
        }
    }
};
</script>