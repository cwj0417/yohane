<template>
    <div class="wrap">
        <div id="content">
            <div class="preview" v-for="(page, index) in pages" @click="currentPage = index">
                <md :model="page"></md>
            </div>
        </div>
        <div id="previewwrap">
            <div class="header"></div>
            <div id="ppt">
                <transition name="turnpage" v-for="(page, index) in pages">
                    <md :model="page" v-show="index == currentPage"></md>
                </transition>
            </div>
            <div class="footer">
                <a href="https://github.com/fjonas/yohane">© Yohane</a>
            </div>
        </div>
    </div>
</template>
<script>
    import {metadata, fullScreen} from "./libs/service";
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
            },
            fullScreen() {
                fullScreen.switchouver(document.querySelector('#ppt'));
            }
        },
        mounted() {
            document.addEventListener('keyup', () => {
                switch(event.keyCode) {
                    case 13:
                    this.fullScreen();
                    break;
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