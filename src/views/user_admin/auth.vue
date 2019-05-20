<template>
    <div class="auth">
        <Button class="ivu-btn-small" type="primary" @click="showAuthList();">授权</Button>
        <Modal
            v-model="showModal"
            title="授权列表"
            :loading="loading"  
            @on-ok="ok">
            <Transfer
                :data="data"
                :target-keys="targetKeys"
                :titles="['可授权列表','已授权列表']"
                filterable
                :filter-method="filterMethod"
                :render-format="render"
                @on-change="handleChange"></Transfer>
        </Modal>
    </div>
</template>
<style>
.auth{
    display:inline;
    margin-right:3px;
}
</style>
<script>
    export default {
        name: 'Index',
        data() {
            return {
                showModal: false,
                data: this.getMockData(),
                targetKeys: this.getTargetKeys(),
                loading: false,
            }
        },
        props: {
            params: Number
        },
        methods: {
            getMockData() {
                return [];
            },
            getTargetKeys() {
                return [];
            },
            render(item) {
                return item.label;
            },
            handleChange(newTargetKeys, direction, moveKeys) {
                this.targetKeys = newTargetKeys;
            },
            filterMethod (data, query) {
                return data.label.indexOf(query) > -1;
            },
            showAuthList() {
                this.data = [];
				this.targetKeys = [];
                this.$http.get(this.$apiUrl.PERMISSION_canAuthList,{
                    account_id:this.params
                }).then(res => {
                    if (res.code == 0) {
                        this.showModal=true;
                        if (res.data.remain_roles) {
                            res.data.remain_roles.forEach(element => {
                                this.data.push({
                                    key: element.role_id.toString(),
                                    label: element.role_name,
                                    description: element.role_name,
                                });
                            });
                        }
                        if (res.data.has_roles) {
                            res.data.has_roles.forEach(element => {
                                this.data.push({
                                    key: element.role_id.toString(),
                                    label: element.role_name,
                                    description: element.role_name,
                                });
                                this.targetKeys.push(element.role_id.toString());                            
                            });
                        }
                    } else {
                        this.$Message.error(res.message || '请求失败！');
                    }
                }).catch(err => {
                    this.$Message.error(err.message);
                });
            },
            ok() {
                let data = {
                    account_id : this.params,
                    role_ids : this.targetKeys.join(","),
				};
                this.$http.post(this.$apiUrl.PERMISSION_setAuth , data).then(res => {
                    if (res.code == 0) {
                        this.$Message.success(res.message);
                    } else {
                        this.$Message.error(res.message || '请求失败！');
                    }
                }).catch(err => {
                    this.$Message.error(err.message);
                });
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
