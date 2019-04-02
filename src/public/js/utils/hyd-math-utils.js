var JMath = (function (window) {
    var ins = {};
    ins.roundFloat = function (value, precision) {
        var prec = parseInt(precision) || 0;
        var pow = Math.pow(10, prec);
        return Math.round(value * pow) / pow;
    }
    ins.floatToInt = function (value) {
        return value | 0;
    }
    ins.isInt = function (n) {
        return n != "" && !isNaN(n) && Math.round(n) == n;
    }
    ins.isFloat = function (n, navigate) {
        return $bean.isEmpty(n) || ($bean.isNotEmpty(n) && !isNaN(Number(n)));
    }
    ins.isFloatLocale = function (n) {
        return $bean.isEmpty(n) || ($bean.isNotEmpty(n) && $bean.isNotEmpty(ins.parseFloatLocale(n)));
    }
    // vd: parseFloatLocale('10.000,12') -> 10.000.12
    ins.parseFloatLocale = function (n, navigate) {
        if ($bean.isEmpty(n)) {
            return n;
        }
        var x = '' + n;
        var i = 0, j = 0;
        if (x.match(/\./g)) {
            i = x.match(/\./g).length;
        }
        if (x.match(/\,/g)) {
            j = x.match(/\,/g).length;
        }
        if (i + j > 1) {
            return null;
        }
        if (JGlobal.regFloat == REG_FLOAT_VI) {
            x = x.replace(',', '.');
        } else if (JGlobal.regFloat == REG_FLOAT_IN) {
            x = x.replace(/\,/g, '');
        }
        if (!ins.isFloat(x)) {
            return null;
        }
        return parseFloat(x);
    }
    // vd: floatToLocaleString(10000.12) -> '1.000,12'
    ins.floatToLocaleString = function (x, precision) {
        if ($bean.isEmpty(x)) {
            return null;
        }
        var str = "";
        if ($bean.isNotEmpty(precision) && ins.isInt(precision) && precision > 0) {
//            var x_s = x.toFixed(precision);
//            x = parseFloat(x_s);
            var inputF = x;
            var intNumber = (x + "").split('.')[0];
            str = x.toLocaleString(JGlobal.language);
            var fixed = 0;
            var xLength = (x + "").length;
            if (xLength > intNumber.length) {
                //có số sau dấu phẩy
                fixed = xLength - 1 - intNumber.length;
            }
            var dif = (x - intNumber).toFixed(fixed);
            //lấy locale number với dạng 1 số sau dấu phẩy
            intNumber = intNumber * 1 + 0.1;
            str = intNumber.toLocaleString(JGlobal.language);
            str = str.substr(0, str.length - 1);
            if (dif != 0) {
                //có số sau dấu phẩy
                var diflength = dif.length - 2;//0.123-> diflength=3
                if (diflength > precision) {
                    //cần lấy sau dấu phẩy ít hơn số truyền vào
                    str += dif.substr(2, precision);
                } else if (diflength < precision) {
                    //cần bổ sung 0 thêm vào
                    str += dif.substr(2);
                    for (var i = 0; i < (precision - diflength); i++) {
                        str += "0";
                    }
                } else {
                    str += dif.substr(2);
                }
            } else {
                //số truyền vào là số nguyên -> thêm số 0
                for (var i = 0; i < precision; i++) {
                    str += "0";
                }
            }
        } else {
            str = x.toLocaleString(JGlobal.language);
        }
        return str;
    }
    ins.printNumberLocale = function (x, precision) {
        return $bean.isNotEmpty(x) ? ins.floatToLocaleString(x, precision) : JStringUtil.STR_NA_VALUE;
    }
    // vd: floatStringToLocaleString('1000.00') ->  '1.000,00'
    //ThangTT - 29/11/2014: đang lỗi
    ins.regenFloatLocaleString = function (x) {
        if ($bean.isEmpty(x)) {
            return null;
        }
        var dot_command, part, result;
        if (JGlobal.regFloat == REG_FLOAT_VI) {
            dot_command = ',';
        } else if (JGlobal.regFloat == REG_FLOAT_IN) {
            dot_command = '.';
        }
        part = x.split(dot_command);
        if (part.length == 1) {
            result = ins.floatToLocaleString(ins.parseFloatLocale(x));
        } else {
            result = ins.floatToLocaleString(ins.parseFloatLocale(part[0])) + dot_command + part[1];
        }
        return result;
    }
    ins.METRIC_PREFIX_VALUE = {
        'none': 1,
        'kilo': 1000,
        'mega': 1000000,
        'giga': 1000000000
    }
    return ins;
})(window);