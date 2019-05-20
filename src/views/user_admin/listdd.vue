<template>
    <div class="account-list">
        <div class="head-wrapper">
            <div class="search">
                <Input v-model="search_field">
                    <Select v-model="search_type" slot="prepend" style="width: 80px">
                        <Option v-for="(item, index) in items" :value="item.key" :key="index">{{item.value}}</Option>
                    </Select>
                    <Button slot="append" icon="ios-search" @click="search()" :loading="isloading"></Button>
                </Input>
            </div>
            <div class="create">
                <Button type="success" @click="create">添加子账号</Button>
            </div>
        </div>
        <Table :data="listTable" :columns="tableColumns"></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;" v-if="page > 1">
                <Page :total="total" :current="current" :page-size="pageSize" @on-change="changePage"></Page>
            </div>
        </div>
    </div>
</template>
<style>
.account-list{
    padding: 20px, 10px;
}
.head-wrapper{
    width : 100%;
    position : relative;
}
.search{
    margin: 10px 5px;
    width: 30%;
}
.create{
    position : absolute;
    top : 0;
    right : 50px;
}
</style>
<script>
import authPop from '../permission/auth.vue';
export default {
    data(){
        return {
            isloading : false,
            search_field : '',
            search_type : 'name',
            total : 1,
            current : 1,
            page : 1,
            listTable : [],
            pageSize : 10,
            tableColumns : [
                {
                    title: '姓名',
                    key: 'name'
                },
                {
                    title: '账号',
                    key: 'email'
                },
                {
                    title: '创建时间',
                    key: 'created_at'
                },
                {
                    title: '操作',
                    key: 'id',
                    render: (h, params) => {
                        return h('div', [
                                h(authPop, {
                                    props: {
                                        params: params.row.id
                                    },
                                }, '授权'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.row.id)
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index,params.row.id)
                                        }
                                    }
                                }, '删除')
                            ]);
                    }
                }
            ]
        }
    },
    created(){
        this.search();
    },
    methods: {
        changePage (page) {
            this.search(page);
        },
        show(id){
            this.$router.push({path:'/account/info', query:{account_id:id}})
        },
        remove(index,id){
            this.$Modal.confirm({
                title: '确认提示框',
                content: '<p>确认删除吗?</p>',
                onOk: () => {
                    this.$http.post(this.$apiUrl.ACCOUNT_deleteAccount,{
                        account_id:id
                    }).then(res => {
                        if(res.code == 0){
                            this.listTable.splice(index, 1);
                            this.search(this.listTable.length?this.current:1);
                            this.$Message.success(res.message);
                        }else{
                            this.$Message.error(res.message||'请求失败！');
                        }
                    });
                },
            });
        },
        search(page){
            page = !page ? 1 : page;
            this.isloading = true;
            this.$http.get(this.$apiUrl.ACCOUNT_getAccountList,{
                limit : this.pageSize,
                offset : page,
                search_type : this.search_type,
                search_field : this.search_field
            }).then(res => {
                if(res.code == 0){
                    this.listTable = res.data.list;
                    this.total = res.data.count;
                    this.page = Math.ceil(this.total/this.pageSize);
                    this.current = page;
                }else{
                    this.$Message.error(res.message||'请求失败！');
                }
            }).catch(err => {
                this.$Message.error(err.message);
            });
            this.isloading = false;
        },
        create(){
            this.$router.push({name:'account_create'})
        }
    }
}
</script>

