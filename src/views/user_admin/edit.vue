<template>
    <div class="user-info">
        <Form ref="userData" :model="userData" :label-width="120" :rules="ruleInline">
            <FormItem label="email账号">
                <Input type="text" v-model="userData.email" disabled placeholder="" size="large"></Input>
            </FormItem>
            <FormItem label="姓名" prop="name">
                <Input type="text" v-model="userData.name" placeholder="" size="large"></Input>
            </FormItem>
            <FormItem label="拥有的权限">
                <Table border :columns="columns" :data="userData.role_list"></Table>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('userData')" :loading="isloading">保存</Button>
                <Button type="ghost" style="margin-left: 18px" @click="back()">返回</Button>
                <Button type="warning" style="margin-left: 18px;width: 100px" @click="resetPassword">重置密码</Button>
            </FormItem>
        </Form>
    </div>
</template>
<style>
.user-info {
    padding: 50px 0;
    margin-left: 20px;
    width: 600px;
}
</style>
<script>
//import poptip from '../permission/poptip.vue';
export default {
    data () {
        return {
            columns: [
                {
                    title: '角色名称',
                    key: 'role_name',
                    render: (h, params) => {
                        return h('div', [
                            h(poptip, {
                                props: {
                                    params: {
                                        role_name: params.row.role_name,
                                        role_remark: params.row.remark,
                                    }
                                },
                            })
                        ]);
                    }
                },
                {
                    title: '所属模块',
                    key: 'module_type'
                },
                {
                    title: '角色类型',
                    key: 'role_type'
                }
            ],
            isloading: false,
            userData: {
                id: 0,
                name: '',
                email: ''
            },
            ruleInline: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    { max: 20, message: "姓名长度不超过20", trigger: 'blur' }
                ]
            },
        }
    },
    created () {
        let { user_id } = this.$route.query;
        this.$http.get(this.$apiUrl.API_USER + user_id).then(res => {
            if (res.code == 0) {
                this.userData.id = res.data.id;
                this.userData.name = res.data.name;
                this.userData.email = res.data.email;
                //this.userData.role_list = res.data.role_list;
            } else {
                this.$Message.error(res.message || '请求失败！');
            }
        }).catch(err => {
            this.$Message.error(err.message);
        });
    },
    methods: {
        handleSubmit (name) {
            let data = {
                name: this.userData.name,
            };
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.isloading = true;
                    let { user_id } = this.$route.query;
                    this.$http.put(this.$apiUrl.API_USER + user_id, data).then(res => {
                        if (res.code == 0) {
                            this.$Message.success(res.msg || '请求成功！');
                        } else {
                            this.$Message.error(res.msg || '请求失败！');
                        }
                        this.isloading = false;
                    });
                }
            });
        },
        back () {
            this.$router.go(-1);
        },
        resetPassword () {
            this.$Modal.confirm({
                title: '确认提示框',
                content: '<p>确认重置密码?(重置后的密码为:123456)</p>',
                onOk: () => {
                    this.$http.post(this.$apiUrl.ACCOUNT_resetPassowrd, {
                        account_id: this.accountData.account_id
                    }).then(res => {
                        if (res.code == 0) {
                            this.$Message.success(res.message);
                        } else {
                            this.$Message.error(res.message || '请求失败！');
                        }
                    });
                },
            });
        },
    }
}
</script>
