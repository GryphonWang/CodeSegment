/* 限制字数 需要设置属性 
    onkeyup="subCharStr(this,400)"" 200个汉字 400个字符
*/
function fucCheckLength(strTemp) {
    var i, sum;
    sum = 0;
    for (i = 0; i < strTemp.length; i++) {
        if ((strTemp.charCodeAt(i) >= 0) && (strTemp.charCodeAt(i) <= 255)) {
            sum = sum + 1;
        } else {
            sum = sum + 2;
        }
    }
    return sum;
}
function subCharStr(e,n) {
    var str = e.value;
    var _len = fucCheckLength(str);
    if (_len > n) {
        var _newLen = Math.floor(n / 2);
        var _strLen = str.length;
        var _newStr = "";
        for (var i = _newLen; i <= _strLen; i++) {
            var tmpStr = str.substr(0, i);
            if (fucCheckLength(tmpStr) > n) {
                // alert("请输入少于200个汉字或者400个字符内容")
                e.value=_newStr
                return _newStr;
                break;
            } else {
                _newStr = tmpStr;
            }
        }
    } else {
        e.value=str
        return str;
    }
}