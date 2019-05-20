<template>
    <div class="account-list">
        <Form :model="filterData" inline>
            <FormItem>
                <Input v-model="filterData.name" placeholder="姓名"></Input>
            </FormItem>
            <FormItem>
                <Input v-model="filterData.email" placeholder="email账号"></Input>
            </FormItem>
            <FormItem>
                <Button shape="circle" icon="ios-search" @click="search()">搜索</Button>
            </FormItem>
            <FormItem class="create">
                <Button type="success" icon="plus-circled" @click="add()">添加子账号</Button>
            </FormItem>
        </Form>
        <Table :loading="loading" :data="listTable" :columns="tableColumns"></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="total" :current="current" :page-size="pageSize" @on-change="changePage"></Page>
            </div>
        </div>
    </div>
</template>
<script>
import authPop from '../user_admin/auth.vue';
export default {
    data () {
        return {
            filterData: {
                name: '',
                email: '',
            },
            loading: true,
            isloading: false,
            listTable: [],
            total: 1,
            current: 1,
            page: 1,
            pageSize: 3,
            tableColumns: [
                {
                    title: '姓名',
                    key: 'name'
                },
                {
                    title: 'email账号',
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
                                        this.remove(params.index, params.row.id)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ]
        }
    },
    created () {
        this.search();
    },
    methods: {
        add () {
            this.$router.push({ name: 'add' });
        },
        show (id) {
            this.$router.push({ path: '/user/info', query: { account_id: id } })
        },
        remove (index, id) {
            this.$Modal.confirm({
                title: '确认提示框',
                content: '<p>确认删除吗?</p>',
                onOk: () => {
                    this.$http.post(this.$apiUrl.ACCOUNT_delete, {
                        account_id: id
                    }).then(res => {
                        if (res.code == 0) {
                            this.listTable.splice(index, 1);
                            this.search(this.listTable.length ? this.current : 1);
                            this.$Message.success(res.message);
                        } else {
                            this.$Message.error(res.message || '请求失败！');
                        }
                    });
                },
            });
        },
        //搜索
        search (page) {
            page = !page ? 1 : page;
            this.isloading = true;
            this.$http.get(this.$apiUrl.ACCOUNT_userList, {
                page: page,
                limit: this.pageSize,
                name: this.filterData.name,
                email: this.filterData.email,
            }).then(res => {
                if (res.code == 0) {
                    this.listTable = res.data.data;
                    this.total = res.data.total;
                } else {
                    this.$Message.error(res.msg || '请求失败！');
                }
            }).catch(err => {
                this.$Message.error(err.msg);
            });
            this.isloading = false;
            this.loading = false;
        },
        //分页
        changePage (page) {
            this.search(page);
        },
    }
}
</script>