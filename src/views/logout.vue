<<template>
    <div>
        <Modal v-model="modal" title="退出" :loading="loading" @on-ok="logout">
            <p>是否确定退出登录</p>
        </Modal>
    </div>  
</template>

<script>
export default {
    data () {
        return {
            loading: false,
            modal: true
        }
    },
    methods: {
        logout () {
            this.$http.post(this.$apiUrl.ACCOUNT_logout, {}).then(res => {
                if (res.code == 0) {
                    this.$cookie.delete("is_login");
                    this.$cookie.delete("token");
                    this.$Message.success(res.msg);
                    setTimeout(() => {
                        this.$router.push({ name: "login" });
                    }, 300);
                } else {
                    this.$Message.error(res.msg || "请求失败！");
                }
            });
        }
    }
}
</script>