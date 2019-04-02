var JStringUtil = (function (window, $) {
    var ins = {};

    ins.UNDERLINE = '_';
    ins.STR_NA_VALUE = '---';

    ins.concatDelim = function (sn, delim) {
        if ($bean.isEmpty(sn) || sn.length == 0) {
            return null;
        }
        if ($bean.isEmpty(delim)) {
            delim = ins.STR_COMMA;
        }
        var s = '';
        var i;
        for (i = 0; i < sn.length; i++) {
            s += sn[i] + ',';
        }
        s = s.substring(0, s.length - delim.length);JGloa
        return s;
    }
    ins.toString = function (list, field, delim) {
        if ($bean.isEmpty(list) || list.length == 0) {
            return null;
        }
        if ($bean.isEmpty(delim)) {
            delim = ins.STR_COMMA;
        }
        if ($bean.isEmpty(field)) {
            field = 'id';
        }
        var s = '';
        var i;
        for (i = 0; i < list.length; i++) {


            s += list[i][field] + ',';
        }
        s = s.substring(0, s.length - delim.length);
        return s;
    }

    ins.encodeHTML = function htmlEntities(str) {
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }
    ins.arrayToString = function (array, delim) {
        if ($bean.isEmpty(delim)) {
            delim = ins.STR_COMMA;
        }
        if ($bean.isEmpty(array)) return null;
        var str = '';
        for (var i = 0; i < array.length; i++) {
            if ($bean.isNotEmpty(array[i])) {
                str += array[i] + delim;
            }
        }
        if ($bean.isNotEmpty(str)) {
            return str.substr(0, str.length - 1);
        } else {
            return null;
        }
    }
    ins.getFileExtension = function (filename) {
        return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
    }

    ins.base64Encode = function (str) {
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
            return String.fromCharCode('0x' + p1);
        }));
    }

    ins.base64Decode = function (str) {
        return atob(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
            return String.fromCharCode('0x' + p1);
        }));
    }

    return ins;
})(window, jQuery);
