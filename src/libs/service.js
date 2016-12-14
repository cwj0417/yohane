import raw from "../../runtime/built";
export let metadata = raw.map(each => unescape(each));
export let fullScreen = {
    switchouver(ele) {
        function isFullScreen() {
            return document.fullScreen ||
                document.webkitIsFullScreen ||
                document.mozFullScreen ||
                false;
        }
        if(isFullScreen()) {
            document.exitFullscreen && document.exitFullscreen();
            document.webkitCancelFullScreen && document.webkitCancelFullScreen();
            document.mozCancelFullScreen && document.mozCancelFullScreen();
        }else {
            ele.requestFullScreen && ele.requestFullScreen();
            ele.webkitRequestFullScreen && ele.webkitRequestFullScreen();
            ele.mozRequestFullScreen && ele.mozRequestFullScreen();
        }
    }
};