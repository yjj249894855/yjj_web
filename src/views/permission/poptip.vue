<template>
    <Poptip trigger="hover" :transfer=true placement="right">
        {{this.params.role_name}}
        <div slot="content">
            <p>{{this.params.role_remark}}</p>
        </div>
    </Poptip>
</template>


<<script>
export default {
    data() {
        return {
        }
    },
    props: {
        params: Object,
    },
    methods: {
    }
}
</script>

