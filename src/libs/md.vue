<template>
    <div v-html="valued">

    </div>
</template>
<script>
    import showdown from "showdown";
    let converter = new showdown.Converter();
    export default {
        props: ["model"],
        computed: {
            valued() {
                return converter.makeHtml(this.model);
            }
        }
    }
</script>