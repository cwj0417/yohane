<template>
    <div>
        <md :model="page" v-for="(page, index) in pages" v-show="index == currentPage"></md>
    </div>
</template>
<script>
    import {metadata} from "./libs/service";
    export default {
        data() {
            return {
                currentPage: 0,
                pages: metadata
            }
        },
        computed: {
            totalPage() {
                return this.pages.length;
            }
        },
        methods: {
            pre() {
                this.currentPage = Math.max(this.currentPage - 1, 0);
            },
            next() {
               this.currentPage = Math.min(this.currentPage + 1, this.totalPage - 1);
            }
        },
        created() {
            document.addEventListener('keyup', () => {
                switch(event.keyCode) {
                    case 37:
                    case 38:
                    this.pre();
                    break;
                    case 39:
                    case 40:
                    this.next();
                    break;
                }
            });
        }
    }


</script>