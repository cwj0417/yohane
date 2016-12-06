import Vue from "vue";
import "./libs";
import app from "./app";
new Vue({
    el: "ppt",
    template: "<app/>",
    components: {app}
});