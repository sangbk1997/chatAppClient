var JDevice = (function (window, $, undefined) {
    var ins = {};

    ins.BROWSER_FIREFOX = 'firefox';
    ins.BROWSER_CHROME = 'chrome';
    ins.BROWSER_MSIE = 'msie'; // Microsoft Internet Explorer
    ins.BROWSER_OPERA = 'opera';

    ins.DEVICE = 'device';
    ins.MOBILE = 'mobile';
    ins.DESKTOP = 'desktop';
    ins.IHCM_APP = 'ihcm-app';
    ins.IPHONE = 'iphone';
    ins.IPAD = 'ipad';
    ins.IPOD = 'ipod';
    ins.WINDOWS_PHONE = 'windows phone';

    ins.WINDOWS_NT = 'windows nt';
    ins.LINUX = 'linux';
    ins.ANDROID = 'android';
    ins.IOS = 'ios';
    ins.WINDOWS_PHONE_OS = 'windows phone os';

    ins.UA_ANDROID_DEFAULT_BROWSER = '534.30';

    ins.NOT_DETECTED = "not detected";

    // Khai bao field
    ins.deviceName = ins.NOT_DETECTED;
    ins.browserName = ins.NOT_DETECTED;
    ins.browserVersion = ins.NOT_DETECTED;
    ins.osName = ins.NOT_DETECTED;
    ins.osVersion = ins.NOT_DETECTED;

    // Lay user agent
    ins.userAgent = navigator.userAgent;
    var userAgentMat = navigator.userAgent.toLowerCase();

    // detect browser name
    if (userAgentMat.indexOf(ins.BROWSER_FIREFOX) != -1) {
        ins.browserName = ins.BROWSER_FIREFOX;
    }
    if (userAgentMat.indexOf(ins.BROWSER_CHROME) != -1) {
        ins.browserName = ins.BROWSER_CHROME;
    }
    if (userAgentMat.indexOf(ins.BROWSER_MSIE) != -1) {
        ins.browserName = ins.BROWSER_MSIE;
    }
    if (userAgentMat.indexOf(ins.BROWSER_OPERA) != -1) {
        ins.browserName = ins.BROWSER_OPERA;
    }
    /////////////////////

    // detect os name
    if (userAgentMat.indexOf(ins.WINDOWS_NT) != -1) {
        ins.osName = ins.WINDOWS_NT;
    }
    if (userAgentMat.indexOf(ins.LINUX) != -1 && userAgentMat.indexOf(ins.ANDROID) == -1) {
        ins.osName = ins.LINUX;
    }
    if (userAgentMat.indexOf(ins.ANDROID) != -1 && userAgentMat.indexOf(ins.LINUX) != -1) {
        ins.osName = ins.ANDROID;
    }
    if (userAgentMat.indexOf(ins.IPHONE) != -1) {
        ins.osName = ins.IOS;
    }
    if (userAgentMat.indexOf(ins.IPAD) != -1) {
        ins.osName = ins.IOS;
    }
    if (userAgentMat.indexOf(ins.IPAD) != -1) {
        ins.osName = ins.IOS;
    }
    if (userAgentMat.indexOf(ins.WINDOWS_PHONE) != -1) {
        ins.osName = ins.WINDOWS_PHONE_OS;
    }

    ins.isMobile = function () {
        var check = false;
        // check mobile
        (function (a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
                check = true;
        })(navigator.userAgent || navigator.vendor || window.opera);
        //check tablet
        if (/ipad|android 3|sch-i800|playbook|tablet|kindle|gt-p1000|sgh-t849|shw-m180s|a510|a511|a100|dell streak|silk/i.test(userAgentMat)) {
            check = true
        }
        return check;
//        return userAgentMat.indexOf(ins.MOBILE) != -1 || userAgentMat.indexOf(ins.IHCM_APP) != -1 ||
//            ins.osName == ins.ANDROID || ins.osName == ins.IOS || ins.osName == ins.WINDOWS_PHONE_OS;
    }

    ins.isIhcmApp = function () {
        return userAgentMat.indexOf(ins.IHCM_APP) != -1;
    }

    ins.isIos = function () {
        return ins.osName == ins.IOS;
    }

    ins.isAndroid = function () {
        return ins.osName == ins.ANDROID;
    }

    ins.isWindowsPhone = function () {
        return ins.osName == ins.WINDOWS_PHONE_OS;
    }

    ins.isBrowser = function (version) {
        return userAgentMat.indexOf(version) != -1;
    }

    return ins;
})(window, jQuery);

/**
 * Created by dinht on 11/18/2015.
 */

var JDetectDevice = (function (window, $) {
    var ins = {};
    ins.unKnown = '-';
    ins.deviceName = null;
    ins.deviceType = null;
    ins.deviceModel = null;
    ins.deviceResolution = null;
    ins.osName = null;
    ins.osType = null;
    ins.osVersion = null;
    ins.browserName = null;
    ins.browserType = null;
    ins.browserVersion = null;
    ins.enabledCookie = null;
    ins.connection = null;
    ins.platform = navigator.platform;
    ins.mobile = null;
    ins.userAgent = navigator.userAgent;
    ins.ihcmApp = null;

    // Operator Systems
    ins.osList = [
        {s: 'Windows 10', r: /(Windows 10.0|Windows NT 10.0)/},
        {s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/},
        {s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/},
        {s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/},
        {s: 'Windows Vista', r: /Windows NT 6.0/},
        {s: 'Windows Server 2003', r: /Windows NT 5.2/},
        {s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/},
        {s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/},
        {s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/},
        {s: 'Windows 98', r: /(Windows 98|Win98)/},
        {s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/},
        {s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
        {s: 'Windows CE', r: /Windows CE/},
        {s: 'Windows 3.11', r: /Win16/},
        {s: 'Windows Phone 10', r: /Windows Phone 10.0/},
        {s: 'Windows Phone 8.1', r: /Windows Phone 8.1/},
        {s: 'Windows Phone 8', r: /Windows Phone 8.0/},
        {s: 'Windows Phone 7', r: /Windows Phone OS 7.8 | Windows Phone OS 7.5/},
        {s: 'Windows Phone 6', r: /Windows Phone 6.5/},
        {s: 'Android', r: /Android/},
        {s: 'Open BSD', r: /OpenBSD/},
        {s: 'Sun OS', r: /SunOS/},
        {s: 'Linux', r: /(Linux|X11)/},
        {s: 'iOS', r: /(iPhone|iPad|iPod)/},
        {s: 'Mac OS X', r: /Mac OS X/},
        {s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
        {s: 'QNX', r: /QNX/},
        {s: 'UNIX', r: /UNIX/},
        {s: 'BeOS', r: /BeOS/},
        {s: 'OS/2', r: /OS\/2/},
        {s: 'Search Bot', r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
    ];
    ins.deviceModels = [
        {s: 'SAMSUNG', r: /(SM|SAMSUNG)/},
        {s: 'LG', r: /LG/},
        {s: 'HTC', r: /HTC/},
        {s: 'BLACKBERRY', r: /BlackBerry/},
        {s: 'NOKIA', r: /NOKIA/},
        {s: 'APPLE - IPHONE', r: /iPhone/},
        {s: 'APPLE - IPAD', r: /iPad/},
        {s: 'APPLE - IPOD', r: /iPod/}
    ];
    ins.WINDOWS = 'Windows';
    ins.WINDOWS_PHONE = 'Windows Phone';
    ins.MAC_OS_X = 'Mac OS X';
    ins.ANDROID = 'Android';
    ins.IOS = 'iOS';
    ins.LINUX = 'Linux';

    var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;
    var browser = navigator.appName;
    var version = '' + parseFloat(navigator.appVersion);
    var majorVersion = parseInt(navigator.appVersion, 10);
    var nameOffset, verOffset, ix, deviceOffset, dix;
    var typeDesktop = 'Desktop', typeTablet = 'Tablet', typeMobile = 'Mobile';

    ins.init = function () {
        ins.detectDevice();
        ins.detectOs();
        //first: detect app
        ins.detectApp();
        //second : detect browser
        ins.detectBrowser();
        return JSON.stringify({
            deviceName: ins.deviceName,
            deviceType: ins.deviceType,
            deviceModel: ins.deviceModel,
            deviceResolution: ins.deviceResolution,
            devicePlatform: ins.platform,
            osName: ins.osName,
            osVersion: ins.osVersion,
            browserName: ins.browserName,
            browserVersion: ins.browserVersion,
            browserCookie: ins.enabledCookie ? 1 : 0,
            connection: ins.connection,
            userAgent: ins.userAgent,
            ihcmApp: ins.ihcmApp
        });
    }
    ins.detectDevice = function () {
        // mobile version
        if (screen.width) {
            width = (screen.width) ? screen.width : '';
            height = (screen.height) ? screen.height : '';
            ins.deviceResolution = width + ' x ' + height;
        }
        var isMobile = (/iphone|ipod|android|blackberry|opera|mini|Fennec|windows\sce|palm|smartphone|iemobile|phone|mobile/.test(nVer.toLowerCase()));
        var isTablet = (/ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/.test(nVer.toLowerCase()));
        ins.mobile = isMobile;
        //device type
        if (isTablet) {
            ins.deviceType = typeTablet;
            if (/Android/.test(nVer)) {
                if (/mobile/.test(nVer.toLowerCase())) {
                    ins.deviceType = typeMobile;
                }
            }
        } else if (isMobile) {
            ins.deviceType = typeMobile;
        } else if (!isMobile && !isTablet) {
            ins.deviceType = typeDesktop;
        }

        // device model
        for (var id in ins.deviceModels) {
            var model = ins.deviceModels[id];
            if (model.r.test(nVer)) {
                ins.deviceModel = model.s;
                break;
            }
        }
        //device name
        //ipad | iphone | ipod
        if ((deviceOffset = nVer.indexOf('iPad')) != -1) {
            ins.deviceName = nVer.substring(deviceOffset);
        }
        if ((deviceOffset = nVer.indexOf('iPhone')) != -1) {
            ins.deviceName = nVer.substring(deviceOffset);
        }
        if ((deviceOffset = nVer.indexOf('iPod')) != -1) {
            ins.deviceName = nVer.substring(deviceOffset);
        }
        //NOKIA
        if ((deviceOffset = nVer.indexOf('NOKIA')) != -1) {
            ins.deviceName = nVer.substring(deviceOffset + 6);
        }
        //SAMSUNG
        if ((deviceOffset = nVer.indexOf('SM')) != -1) {
            ins.deviceName = nVer.substring(deviceOffset + 3);
        }
        if ((deviceOffset = nVer.indexOf('SAMSUNG')) != -1) {
            ins.deviceName = nVer.substring(deviceOffset + 8);
        }
        //LG
        if ((deviceOffset = nVer.indexOf('LG')) != -1) {
            ins.deviceName = nVer.substring(deviceOffset + 3);
        }
        //htc
        if ((deviceOffset = nVer.indexOf('HTC')) != -1) {
            ins.deviceName = nVer.substring(deviceOffset + 4);
        }
        // blackberry
        if ((deviceOffset = nVer.indexOf('BlackBerry')) != -1) {
            ins.deviceName = nVer.substring(deviceOffset + 11);
        }
        // trim the name string
        if (ins.deviceName != null) {
            if ((dix = ins.deviceName.indexOf(';')) != -1) ins.deviceName = ins.deviceName.substring(0, dix);
            if ((dix = ins.deviceName.indexOf(' ')) != -1) ins.deviceName = ins.deviceName.substring(0, dix);
            if ((dix = ins.deviceName.indexOf(')')) != -1) ins.deviceName = ins.deviceName.substring(0, dix);
        }

    }

    ins.detectApp = function () {
        ins.ihcmApp = /IHCM-APP/.test(nVer);
    }
    //Operator system and version
    ins.detectOs = function () {
        var clientStrings = ins.osList;
        for (var id in clientStrings) {
            var cs = clientStrings[id];
            if (cs.r.test(nAgt)) {
                ins.osName = cs.s;
                break;
            }
        }

        if (/Windows/.test(ins.osName) && !(/Windows Phone/.test(ins.osName))) {
            ins.osVersion = /Windows (.*)/.exec(ins.osName)[1];
            ins.osName = ins.WINDOWS;
        } else if (/Windows Phone/.test(ins.osName)) {
            ins.osVersion = /Windows Phone (.*)/.exec(ins.osName)[1];
            ins.osName = ins.WINDOWS_PHONE;
        } else {
            switch (ins.osName) {
                case ins.MAC_OS_X:
                    ins.osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
                    break;

                case ins.ANDROID:
                    ins.osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
                    break;

                case ins.IOS:
                    ins.osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
                    ins.osVersion = ins.osVersion[1] + '.' + ins.osVersion[2] + '.' + (ins.osVersion[3] | 0);
                    break;
                case ins.LINUX:
                    ins.osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
                    break;
            }
        }

    }

    // Browser and version
    ins.detectBrowser = function () {
        //ihcm app
        if (ins.ihcmApp && (verOffset = nAgt.indexOf('AppleWebKit/')) != -1) {
            ins.browserName = 'AppleWebKit';
            ins.browserVersion = nAgt.substring(verOffset + 12);
        } else {
            // Opera
            if ((verOffset = nAgt.indexOf('Opera')) != -1) {
                ins.browserName = 'Opera';
                ins.browserVersion = nAgt.substring(verOffset + 6);
                if ((verOffset = nAgt.indexOf('Version')) != -1) {
                    version = nAgt.substring(verOffset + 8);
                }
            }
            // Opera Next
            if ((verOffset = nAgt.indexOf('OPR')) != -1) {
                ins.browserName = 'Opera';
                ins.browserVersion = nAgt.substring(verOffset + 4);
            }
            // MSIE
            else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
                ins.browserName = 'Microsoft Internet Explorer';
                ins.browserVersion = nAgt.substring(verOffset + 5);
            }
            // Chrome
            else if (((verOffset = nAgt.indexOf('Chrome')) != -1) && (nAgt.indexOf('Edge/') == -1)) {
                ins.browserName = 'Chrome';
                ins.browserVersion = nAgt.substring(verOffset + 7);
            }
            // Safari
            else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
                ins.browserName = 'Safari';
                ins.browserVersion = nAgt.substring(verOffset + 7);
                if ((verOffset = nAgt.indexOf('Version')) != -1) {
                    version = nAgt.substring(verOffset + 8);
                }
            }
            // Firefox
            else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
                ins.browserName = 'Firefox';
                ins.browserVersion = nAgt.substring(verOffset + 8);
            }
            // MSIE 11+
            else if (nAgt.indexOf('Trident/') != -1) {
                ins.browserName = 'Microsoft Internet Explorer';
                ins.browserVersion = nAgt.substring(nAgt.indexOf('rv:') + 3);
            }
            // Other browsers
            else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
                ins.browserName = nAgt.substring(nameOffset, verOffset);
                ins.browserVersion = nAgt.substring(verOffset + 1);
                if (browser.toLowerCase() == browser.toUpperCase()) {
                    ins.browserName = navigator.appName;
                }
            }
            // MS Edge
            if ((verOffset = nAgt.indexOf('Edge/')) != -1 && nAgt.indexOf('Chrome') != -1) {
                ins.browserName = 'Microsoft Edge';
                ins.browserVersion = nAgt.substring(verOffset + 5);
            }
            // fix : Firefox in iOs
            if ((verOffset = nAgt.indexOf('FxiOS')) != -1 && nAgt.indexOf('Safari') != -1) {
                ins.browserName = 'Firefox iOS';
                ins.browserVersion = nAgt.substring(verOffset + 6);
            }
        }
        // trim the version string
        if ((ix = ins.browserVersion.indexOf(';')) != -1) ins.browserVersion = ins.browserVersion.substring(0, ix);
        if ((ix = ins.browserVersion.indexOf(' ')) != -1) ins.browserVersion = ins.browserVersion.substring(0, ix);
        if ((ix = ins.browserVersion.indexOf(')')) != -1) ins.browserVersion = ins.browserVersion.substring(0, ix);

        majorVersion = parseInt('' + ins.browserVersion, 10);
        if (isNaN(majorVersion)) {
            ins.browserVersion = '' + parseFloat(navigator.appVersion);
            majorVersion = parseInt(navigator.appVersion, 10);
        }
        // cookie
        ins.enabledCookie = (navigator.cookieEnabled) ? true : false;

        if (typeof navigator.cookieEnabled == 'undefined' && !cookieEnabled) {
            document.cookie = 'testcookie';
            ins.enabledCookie = (document.cookie.indexOf('testcookie') != -1) ? true : false;
        }

    }

    return ins;
})(window, jQuery)



