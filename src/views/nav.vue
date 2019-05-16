
<style scoped>
.layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-header-bar {
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    justify-content: space-between;
    display: flex;
}
.menu-item span {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width 0.2s ease 0.2s;
}
.menu-item i {
    transform: translateX(0px);
    transition: font-size 0.2s ease, transform 0.2s ease;
    vertical-align: middle;
    font-size: 16px;
}
.collapsed-menu span {
    width: 0px;
    transition: width 0.2s ease;
}
.collapsed-menu i {
    transform: translateX(5px);
    transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
    vertical-align: middle;
    font-size: 22px;
}
.collapsed-menu .submenu {
    padding: 14px 24px !important;
}
</style>
<template>
    <div class="layout">
        <Layout>
            <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" :style="{'min-height': '800px'}" v-model="isCollapsed">
                <Menu ref="side_menu" theme="dark" width="auto" :active-name="activeName" :class="menuitemClasses" @on-select="onSelect" :open-names="openNames">
                    <MenuItem :name="item.title_name" v-for="(item, x) in items" :key="x" v-if="!item.subitems.length">
                    <Icon :type="item.icon"></Icon>
                    <span>{{item.title}}</span>
                    </MenuItem>
                    <Submenu :name="'m'+x" v-for="(item, x) in items" :key="'m'+x" v-if="item.subitems.length>0">
                        <template slot="title">
                            <Icon :type="item.icon"></Icon>
                            <span>{{item.title}}</span>
                        </template>
                        <Menu-item :name="subitem.name" v-for="(subitem, y) in item.subitems" :key="subitem.name" class="submenu">
                            <Icon :type="subitem.icon"></Icon>
                            <span>{{subitem.title}}</span>
                        </Menu-item>
                    </Submenu>
                </Menu>
            </Sider>
            <Layout>
                <Header class="layout-header-bar" :style="{padding: 0}">
                    <Row type="flex" justify="center" align="middle">
                        <Icon @click.native="collapsedSider" :class="rotateIcon" type="navicon-round" size="30" :style="{margin: '20px'}"></Icon>
                        <Breadcrumb>
                            <Breadcrumb-item v-for="item in $route.matched">
                                <router-link :to="item.path">{{ item.meta.title }}</router-link>
                            </Breadcrumb-item>
                        </Breadcrumb>
                    </Row>
                    <Row type="flex" justify="center" align="middle" :style="{'margin': '0 20px 0 0'}">
                        <Dropdown :style="{'padding': '0 20px','font-size':'14px','line-height':'20px'}" @on-click="handleOpen">
                            <a href="javascript:void(0)">
                                <span>{{this.userinfo.name}}</span>
                                <Icon type="arrow-down-b"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem name="doc_api">API文档</DropdownItem>
                                <DropdownItem name="personal_data">个人资料</DropdownItem>
                                <DropdownItem name="logout">退出登录</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Avatar size="large" :style="{background: '#19be6b'}" icon="person"></Avatar>
                    </Row>
                </Header>
                <Content :style="{padding: '20px 20px'}">
                    <router-view></router-view>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
export default {
    data () {
        return {
            items: [
                {
                    title: "概览",
                    icon: "ios-navigate",
                    title_name: "overview"
                },
                {
                    title: "系统管理",
                    icon: "person-stalker",
                    title_name: "system",
                    subitems: [
                        { title: "账号列表", icon: "ios-barcode", name: "account_list" },
                        { title: "模块管理", icon: "ios-folder", name: "merchant_module" },
                        { title: "权限KEY", icon: "ios-navigate", name: "system_key" },
                        { title: "系统角色", icon: "ios-person", name: "system_role" },
                        { title: "菜单权限", icon: "ios-navigate", name: "menu_list" },
                        {
                            title: "操作日志",
                            icon: "document-text",
                            name: "operation_logs"
                        },
                        {
                            title: "API日志",
                            icon: "arrow-graph-up-right",
                            name: "open_api_list"
                        },
                        { title: "API统计", icon: "stats-bars", name: "open_api_stat" }
                    ]
                }
            ],
            userinfo: {},
            isCollapsed: false
        };
    },
    created () {
        let items = this.items;
        this.items = [];
        this.$http.get(this.$apiUrl.SETTING_getAccount, {}).then(res => {
            if (res.code == 0) {
                this.userinfo = res.data;
            }
        });
        let ths = this;
        this.$http.post(this.$apiUrl.PERMISSION_menu, {}).then(res => {
            if (res.code) return;
            for (let index in items) {
                let chind_item = [];
                let item = items[index];
                if (item.subitems) {
                    item.subitems.forEach(sitem => {
                        if (res.data.indexOf(sitem.name) > -1) {
                            chind_item.push(sitem);
                        }
                    });
                }
                if (chind_item.length) {
                    ths.items.push({
                        title: item.title,
                        icon: item.icon,
                        title_name: item.title_name,
                        subitems: chind_item
                    });
                } else if (res.data.indexOf(item.title_name) > -1) {
                    ths.items.push({
                        title: item.title,
                        icon: item.icon,
                        title_name: item.title_name,
                        subitems: []
                    });
                }
            }
            ths.$nextTick(() => {
                ths.$refs.side_menu.updateOpened();
                ths.$refs.side_menu.updateActiveName();
            });
        });
    },
    computed: {
        activeName () {
            let path_name = this.$route.name;
            return path_name;
        },
        rotateIcon () {
            return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
        },
        menuitemClasses () {
            return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
        },
        openNames () {
            if (this.isCollapsed) return [];
            if (!this.$route.name) {
                return ["m0"];
            }
            let path_name = this.$route.name;
            let current_items = this.items;
            let current_m = 0;
            let is_find = 0;
            for (let i in current_items) {
                if (is_find) {
                    break;
                }
                current_m++;
                let current_subitems = current_items[i].subitems;
                for (let j in current_subitems) {
                    if (path_name == current_subitems[j].name) {
                        is_find = 1;
                        break;
                    }
                }
            }
            if (!is_find) {
                return ["m0"];
            }
            let key_m = current_m ? current_m - 1 : 0;
            return ["m" + key_m];
        }
    },
    methods: {
        handleOpen (name) {
            this.onSelect(name);
        },
        collapsedSider () {
            let ths = this;
            this.$refs.side1.toggleCollapse();
        },
        onSelect (name) {
            if (name == "logout") {
                return this.showLogoutModal();
            }
            this.$router.push({ name: name });
        },
        showLogoutModal () {
            const ths = this;
            this.$Modal.confirm({
                title: "退出!",
                content: "<p>您确定要退出登录么</p>",
                onOk: () => {
                    ths.logout();
                }
            });
        },
        logout () {
            const ths = this;
            ths.$cookie.delete("is_login");
            ths.$cookie.delete("qc_session");
            this.$http.post(this.$apiUrl.Logout, {}).then(res => {
                if (res.code == 0) {
                    ths.$Message.success(res.message);
                } else {
                    ths.$Message.error(res.message || "请求失败！");
                }
            });
            setTimeout(() => {
                ths.$router.push({ name: "login" });
            }, 500);
        }
    }
};
</script>