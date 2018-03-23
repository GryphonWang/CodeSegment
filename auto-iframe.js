/* 
    配置 在iframe表现加入onlaod事件  两个参数分别为该 iframe标签的id  和引入iframe页面的最小高度
    <iframe  id="tab_content_desktop"  src="" frameborder="0" scrolling="no" onload="startInit('tab_content_desktop',1090);"></iframe>

 */


(function(){
    var browserVersion = window.navigator.userAgent.toUpperCase();
    var isOpera = browserVersion.indexOf("OPERA") > -1 ? true : false;
    var isFireFox = browserVersion.indexOf("FIREFOX") > -1 ? true : false;
    var isChrome = browserVersion.indexOf("CHROME") > -1 ? true : false;
    var isSafari = browserVersion.indexOf("SAFARI") > -1 ? true : false;
    var isIE = (!!window.ActiveXObject || "ActiveXObject" in window);
    var isIE9More = (! -[1, ] == false);
    function reinitIframe(iframeId, minHeight) {
        try {
            var iframe = document.getElementById(iframeId);
            var minWidth=document.getElementById(iframeId).scrollWidth;
            var bHeight = 0;
            var bWidth = 0;
            if (isChrome == false && isSafari == false){
                bHeight = iframe.contentWindow.document.body.scrollHeight;
                bWidth = iframe.contentWindow.document.body.scrollWidth;}
                

            var dHeight = 0;
            var dWidth = 0;
            if (isFireFox == true){
                dHeight = iframe.contentWindow.document.documentElement.offsetHeight + 2;
                dWidth = iframe.contentWindow.document.documentElement.scrollWidth;}
                
            else if (isIE == false && isOpera == false){
                dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
                dWidth = iframe.contentWindow.document.documentElement.scrollWidth;
            }
                
            else if (isIE == true && isIE9More) {//ie9+
                var heightDeviation = bHeight - eval("window.IE9MoreRealHeight" + iframeId);
                var widthDeviation = dWidth - eval("window.IE9MoreRealWidth" + iframeId);
                if (heightDeviation == 0) {
                    bHeight += 3;
                } else if (heightDeviation != 3) {
                    eval("window.IE9MoreRealHeight" + iframeId + "=" + bHeight);
                    eval("window.IE9MoreRealWidth" + iframeId + "=" + dWidth);
                    bHeight += 3;
                }
            }
            else//ie[6-8]、OPERA
                bHeight += 3;
            var height = Math.max(bHeight, dHeight);
            var width = Math.max(bWidth, dWidth);
            if (height < minHeight) height = minHeight;
            if (width < minWidth) width = minWidth;
            console.log("height==="+height);
            console.log("width==="+width);
            iframe.style.height = height + "px";
            iframe.style.width = width + "px";
            return;
        } catch (ex) { }
    }
    function startInit(iframeId, minHeight) {

        eval("window.IE9MoreRealHeight" + iframeId + "=0");
        reinitIframe(iframeId, minHeight);
    }
    window.startInit=startInit;
})()

