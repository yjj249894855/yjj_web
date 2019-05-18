<<template>
    <div>
        <Modal v-model="modal" title="退出" :loading="loading" @on-ok="logout">
            <p>是否确定退出登录11</p>
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
            const ths = this;
            ths.loading = true;
            ths.$cookie.delete('is_login');
            ths.$cookie.delete('qc_session');
            this.$http.post(this.$apiUrl.Logout, {}).then(res => {
                ths.loading = false;
                if (res.code == 0) {
                    ths.modal = false;
                    ths.$Message.success(res.message);
                    ths.$router.push({ name: 'login' });
                } else {
                    ths.$Message.error(res.message || '请求失败！');
                }
            });
        }
    }
}
</script>