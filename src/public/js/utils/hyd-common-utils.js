var JCommonUtil = (function (window, $) {
    var SCREEN_WIDTH = 0;
    var ins = {};
    ins.SCREEN1_X = 639;
    ins.SCREEN1_N = 640;
    ins.SCREEN2_X = 767;
    ins.SCREEN2_N = 768;
    ins.SCREEN3_X = 899;
    ins.SCREEN3_N = 900;
    ins.SIDE_BAR_WIDTH = 40;

    ins.MAIN_COLOR_1 = '#0072bc';
    ins.MAIN_COLOR_2 = '#f7921e';

    ins.TREND_UP_COLOR = '#0071BB';
    ins.TREND_NORMAL_COLOR = '#F7931D';
    ins.TREND_DOWN_COLOR = '#ED1C24';
    ins.NONE_COLOR = '#dff0fd';

    ins.IMG_SIZE_24 = 24;
    ins.IMG_SIZE_32 = 32;
    ins.IMG_SIZE_40 = 40;
    ins.IMG_SIZE_48 = 48;
    ins.IMG_SIZE_64 = 64;
    ins.IMG_SIZE_80 = 80;
    ins.IMG_SIZE_120 = 120;

    ins.COMMON_BOX_PADDING = 12;
    ins.COMMON_PADDING = 10;
    ins.COMMON_ELEMENT_PADDING = 5;

    ins.COMMON_ICON_EXPAND_CLASS = 'icon-expand';
    ins.COMMON_ICON_COLLAPSE_CLASS = 'icon-collapse';
    ins.COMMON_ICON_EXPAND_WHITE_CLASS = 'icon-expand-white';
    ins.COMMON_ICON_COLLAPSE_WHITE_CLASS = 'icon-collapse-white';

    ins.COMMON_SCROLL_TOP = 10;

    ins.ICON_SIZE_32 = 32;

    ins.ANIMATE_FOCUS_BG = '#0072bc';
    ins.ERROR_BG = '#FFBABA';
    ins.ANIMATE_FOCUS_TIME = 350 * 2;
    ins.ANIMATE_SHOW_HIDE_TIME = 200;

    ins.APPEND = 'append';
    ins.PREPEND = 'prepend';
    ins.INSERT_BEFORE = 'insert_before';
    ins.INSERT_AFTER = 'insert_after';

    ins.RESULT_ERROR = '@error:';
    ins.RESULT_MESSAGE = '@msg:';

    ins.MESSAGE_TYPE_INFO = 'info';
    ins.MESSAGE_TYPE_WARNING = 'warning';
    ins.MESSAGE_TYPE_ERROR = 'error';
    ins.MESSAGE_TYPE_SUCCESS = 'success';
    ins.MESSAGE_TYPE_PUSH = 'push';

    ins.lyLoadingClass = 'ly-loading-overlay';

    ins.REQUEST_FORM_HEADERS = {'Content-Type': 'application/x-www-form-urlencoded'};

    ins.SPECIAL_NAME = ['m', 'page', 'sortField', 'ascent'];

    ins.setDlgBodyScroll = function (obj) {
        obj = obj || '.dlg-body-scroll';
        var windowHeight = ins.viewport().height;
        var marginTop = 48 + 48, marginBottom = 57 + 48;
        var maxHeight = windowHeight - marginTop - marginBottom - 1;
        $(obj).css('max-height', maxHeight + 'px');
        var contentHeight = 0;
        $(obj).find('.dlg-body-content').each(function () {
            contentHeight += $(this).height();
        });
        if (contentHeight > maxHeight) {
            $(obj).removeClass('overflow-y').addClass('overflow-y');
        } else {
            $(obj).removeClass('overflow-y');
        }
    }

    ins.getTimeNow = function () {
        var dateTimeNow = new Date();
        var hour = dateTimeNow.getHours();
        hour = hour < 10 ? '0' + hour : hour;
        var minute = dateTimeNow.getMinutes();
        minute = minute < 10 ? '0' + minute : minute;
        return hour + ':' + minute;
//        return dateTimeNow.toLocaleTimeString('en-US', {
//            hour12: false,
//            hour: "numeric",
//            minute: "numeric"
//        });
    }
    ins.getHello = function () {
        var today = new Date()
        var curHr = today.getHours()
        if (curHr < 12) {
            return JCommonUtil.message('common.good.morning', 'common');
        } else if (curHr >= 12 && curHr <= 13) {
            return JCommonUtil.message('common.good.afternoon', 'common');
        } else if (curHr > 13 && curHr <= 18) {
            return JCommonUtil.message('common.afternoon', 'common');
        } else {
            return JCommonUtil.message('common.good.evening', 'common');
        }
    }
    ins.callDynamicFunction = function (functionName, objContainer) {
        objContainer = objContainer || window;
        if (functionName.indexOf('.') == -1) {
            objContainer[functionName]();
            return;
        } else {
            ins.callDynamicFunction(functionName.substring(functionName.indexOf('.') + 1), objContainer[functionName.substring(0, functionName.indexOf('.'))])
        }
    }
    ins.getCaptcha = function (target) {
        $(target).attr('src', JCommonUtil.convertUrl('/password?getCaptcha') + '&ts=' + (new Date()).getTime());
    }

    ins.toggleContent = function toggleContent(element) {
        $(element).parents('.card-item-container').find('.card-content').toggleClass('hide');
    }
//    ins.getDataSaveForm = function (form) {
//        var stringFilter = '';
//        for (var i = 0; i < ins.SPECIAL_NAME.length; i++) {
//            stringFilter += '[name="' + ins.SPECIAL_NAME[i] + '"],';
//        }
//        var _form = $(form).clone();
//        _form.find('input[type="hidden"]').filter(stringFilter.substr(0, stringFilter.length - 1)).remove();
//        return _form.serialize();
//    }
//    ins.saveForm = function () {
//        setTimeout(function () {
//            if ($('form')) {
//                if (!JGlobal.originDataForms) {
//                    JGlobal.originDataForms = {};
//                }
//                $('form').each(function () {
//                    if ($bean.isEmpty($(this).attr('form-key'))) {
//                        var unique = ins.genRandomID();
//                        $(this).attr('form-key', unique);
//                        JGlobal.originDataForms[unique] = ins.getDataSaveForm(this);
//                        var callback =  $bean.clone($(this).onsubmit);
//                        $(this).bind('submit',function(){
//                            SUBMIT_FORM = true;
//                        });
//                    }
//                });
//            }
//            $(window).bind('beforeunload', function () {
//                if (JCommonUtil.isFormChange(this)) {
//                    return JCommonUtil.message('error.form.data.not.empy', 'error');
//                }
//            });
//        }, 2000);
//    }
//    ins.ignoreBeforeUnload = function () {
//        SUBMIT_FORM = true;
//        return true;
//    }
//    ins.isFormChange = function () {
//        if (!SUBMIT_FORM && $('form') && JGlobal.originDataForms) {
//            var isChange = false;
//            $('form').each(function () {
//                var unique = $(this).attr('form-key');
//                if (JGlobal.originDataForms[unique] && JGlobal.originDataForms[unique] != ins.getDataSaveForm(this)) {
//                    isChange = true;
//                    return false;
//                }
//            });
//            return isChange;
//        }
//        return false;
//    }
    ins.confirm = function (options) {
        var params = $.extend(true, {
            title: undefined, message: undefined, isYes: undefined, isNo: undefined,
            yesTitle: undefined, noTitle: undefined
        }, options);
        jQuery.confirm(params.message, params.title, params.yesTitle, params.noTitle).then(function (answer) {
            if (answer) {
                if (jQuery.isFunction(params.isYes)) {
                    params.isYes();
                }
            } else {
                if (jQuery.isFunction(params.isNo)) {
                    params.isNo();
                }
            }
            return answer;
        });
    }

    ins.alert = function (options) {
        var params = $.extend(true, {
            title: undefined,
            message: undefined,
            messageType: undefined,
            autoHide: false,
            messageOnly: undefined,
            callback: undefined
        }, options);
        jQuery.alert(params.message, params.title, params.messageType, params.autoHide, params.messageOnly).then(function (answer) {
            if (jQuery.isFunction(params.callback)) {
                params.callback();
            }
        });
    }

    ins.alertError = function (options) {
        var params = $.extend(true, {title: undefined, message: undefined, messageOnly: true, autoHide: true}, options);
        params.messageType = JCommonUtil.MESSAGE_TYPE_ERROR;
        //console.log($bean.toConsoleMsg(params.message), $bean.CONSOLE_LOG_ERROR);
        JCommonUtil.alert(params);
    }
    ins.alertSuccess = function (options) {
        var params = $.extend(true, {title: undefined, message: undefined, messageOnly: true, autoHide: true}, options);
        params.messageType = JCommonUtil.MESSAGE_TYPE_SUCCESS;
        JCommonUtil.alert(params);
    }
    ins.alertWaring = function (options) {
        var params = $.extend(true, {title: undefined, message: undefined, messageOnly: true, autoHide: true}, options);
        params.messageType = JCommonUtil.MESSAGE_TYPE_WARNING;
        JCommonUtil.alert(params);
    }
    ins.alertPush = function (options) {
        var params = {};
        $bean.extend(params, options, {title: undefined, message: undefined, messageOnly: true, autoHide: true});
        params.messageType = JCommonUtil.MESSAGE_TYPE_PUSH;
        JCommonUtil.alert(params);
    }
    ins.alertResponse = function (data) {
        if (!data || !$bean.isString(data)) {
            return true;
        }
        var msg;
        var indexErr = data.indexOf(ERROR_PREFIX);
        if (indexErr != -1) {
            msg = data.substring(ERROR_PREFIX.length);
            ins.alertError({message: msg});
            return false;
        }
        var indexSuc = data.indexOf(SUCCESS_PREFIX);
        if (indexSuc != -1) {
            msg = data.substring(SUCCESS_PREFIX.length);
            ins.alertSuccess({message: msg});
            return true;
        }
        return true;
    }

    ins.dialog = function (options) {
        var params = $.extend(true, {
            content: undefined,
            appendTo: undefined,
            title: undefined,
            messageType: undefined,
            size: undefined,
            classes: undefined,
            buttons: undefined,
            onCreate: undefined,
            onClose: undefined,
            onOpen: undefined
        }, options);
        var messageClass = '';
        if ($bean.isNotEmpty(params.messageType)) {
            if (params.messageType == JCommonUtil.MESSAGE_TYPE_ERROR) {
                params.title = params.title || JCommonUtil.message('common.mesage.warning.title', 'common');
            } else if (params.messageType == JCommonUtil.MESSAGE_TYPE_INFO) {
                params.title = params.title || JCommonUtil.message('common.info', 'common');
            } else if (params.messageType == JCommonUtil.MESSAGE_TYPE_WARNING) {
                params.title = params.title || JCommonUtil.message('common.mesage.warning.title', 'common');
            }
            messageClass += ' message-' + params.messageType;
        }
        if ($bean.isEmpty(params.size)) {
            params.size = JHtmlComponent.DIALOG_SIZE_1;
        }
        var buttonList = [];
        if ($bean.isNotEmpty(params.buttons)) {
            var i;
            for (i in params.buttons) {
                (function (index) {
                    var buttonConf = params.buttons[index];
                    buttonList.push({
                        text: buttonConf.text,
                        click: function () {
                            if ($bean.isFunction(buttonConf.beforeClose)) {
                                buttonConf.beforeClose();
                            }
                            if ($bean.isFunction(buttonConf.onClick)) {
                                buttonConf.onClick();
                            } else {
                                jQuery(this).dialog("close");
                            }
                            if ($bean.isFunction(buttonConf.afterClose)) {
                                buttonConf.afterClose();
                            }
                        }
                    });
                })(i);
            }
        } else {
            buttonList.push({
                text: JCommonUtil.message("common.close", "common"),
                click: function () {
                    jQuery(this).dialog("close");
                }
            });
        }
        if ($bean.isEmpty(params.classes)) {
            params.classes = '';
        }
        params.classes = params.classes.trim().split(',');
        var dialogClasses = '';
        var i;
        for (i in params.classes) {
            dialogClasses += ' ' + params.classes[i];
        }
        params.content.dialog({
            appendTo: params.appendTo,
            title: params.title,
            dialogClass: 'pos-fixed fixed-top' + messageClass + ' size-' + params.size + dialogClasses,
            modal: true,
            draggable: false,
            position: ['center', 'top'],
            closeOnEscape: false,
            resizable: false,
            width: JHtmlComponent.jQueryDialogWidth(params.size),
            create: function (event, ui) {
                $(this).parents('.ui-dialog').css('visibility', 'hidden');
                var i, attrKey;
                for (i in buttonList) {
                    var $button = $(this).closest('.ui-dialog').find('.ui-button:nth-child(' + (i + 1) + ')');
                    if ($bean.isNotEmpty(params.buttons) && $bean.isNotEmpty(params.buttons[i].attrs)) {
                        for (attrKey in params.buttons[i].attrs) {
                            $button.attr(attrKey, params.buttons[i].attrs[attrKey]);
                        }
                    }
                }
                if ($bean.isFunction(params.onCreate)) {
                    params.onCreate();
                }
            },
            open: function (event, ui) {
                $(this).parents('.ui-dialog').css('visibility', 'visible');
                var $dialog = $(this).parents('.ui-dialog');
                $functions.eval(params.onOpen);
                JCommonUtil.reTooltipster($dialog.find('.tooltip-icon'));
                // smell
                if ($('.prettyPopin').length > 0) {
                    $('.ui-dialog').css('z-index', 12002);
                    $('.ui-widget-overlay').css('z-index', 12001);
                }
                //
                JEvent.windowResize();
            },
            close: function (event, ui) {
                $(this).parents('.ui-dialog').remove();
                $functions.eval(params.onClose);
            },
            buttons: buttonList
        });
    }

    ins.getValueSelectMe = function (name) {
        var radios = document.getElementsByName(name);
        if (!radios || radios.length < 1) {
            return null;
        }
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                return radios[i].value;
            }
        }
        return null;
    }

    ins.question = function (msg) {
        var ok = confirm(msg);
        if (ok)
            return true;
        else
            return false;
    }

    ins.questionAjax = function (key, bundle, args) {
        var msg = ins.message(key, bundle, args);
        return ins.question(msg);
    }

    ins.hyperConfirm = function (e, target, key, bundle, args) {
        e.stopPropagation();
        e.preventDefault();
        var msg = ins.message(key, bundle, args);
        JCommonUtil.confirm({
            message: msg,
            messageType: JCommonUtil.MESSAGE_TYPE_WARNING,
            isYes: function () {
                JCommonUtil.goPage($(target).attr('href'));
            }
        });
    }

    ins.showQuickMsg = function (targetId, key, bundle, args) {
        if ($bean.isEmpty($('#' + targetId))) {
            return false;
        }
        if ($bean.isEmpty(bundle)) {
            bundle = 'error';
        }
        var msg = ins.message(key, bundle, args);
        if (bundle == 'error') {
            $.quickMsg.setParams({
                error: msg
            });
        } else {
            $.quickMsg.setParams({
                msg: msg
            });
        }
        $.quickMsg.show(targetId);
    }
    ins.message = function (key, bundle, args, getId) {
        var msg = $.language.getMessage(key, (args || null));
        if (msg) {
            return msg;
        }
        var argsParam = "";
        if (args != null) {
            if (args instanceof Array) {
                for (var i = 0; i < args.length; i++) {
                    argsParam = argsParam + "&args=" + args[i];
                }
            } else {
                argsParam = "&args=" + args;
            }
        }
        if (!bundle) {
            bundle = "error";
        }
        if (!getId) {
            getId = "false";
        }
        var url = encodeURI(ins.convertUrl("/messageUtil?get") + "&getId=" + getId + "&key=" + key + "&bundle=" + bundle + argsParam);
        var msg = 'Register Message Key ' + key;
        console.log($bean.toConsoleMsg(msg), $bean.CONSOLE_LOG_ERROR);
        $.ajax({
            type: 'GET',
            url: JCommonUtil.getUrlAjax(url),
            async: false,
            success: function (t) {
                msg = t;
            }
        });
        return msg;
    }

    ins.showErrorValidation = function (target, message, className) {
        className = className || '';
        $(target).parent().find('.form-error').remove();
        if (className.length > 0) {
            $(target).parent().append('<div class="form-error ' + className + '">' + message + '</div>');
        } else {
            $(target).parent().append('<div class="form-error">' + message + '</div>');
        }
    }
    ins.showMessageValidation = function (target, message) {
        $(target).parent().find('.form-error').remove();
        $(target).parent().append('<div class="form-error">' + message + '</div>');
    }
    ins.removeObject = function (target, isChild) {
        if ($bean.isNotEmpty(target) && $bean.isEmpty(isChild)) {
            $(target).remove();
        } else if ($bean.isNotEmpty(isChild) && isChild) {
            $(target).children().remove();
        }
    }

    // ins.hyperRightUrl = function (url) {
    //     if (!url) {
    //         return url;
    //     }
    //     url = url.trim();
    //     var action = null;
    //     var method = null;
    //     var index = url.toLowerCase().indexOf(JGlobal.actionPattern);
    //     if (index > -1) {
    //         var indexContextRoot = url.toLowerCase().indexOf(JGlobal.contextRoot);
    //         if (indexContextRoot != -1) {
    //             indexContextRoot = indexContextRoot + JGlobal.contextRoot.length;
    //         } else {
    //             indexContextRoot = 0;
    //         }
    //         action = url.substring(indexContextRoot, index);
    //     }
    //     index = url.toLowerCase().indexOf("&" + JGlobal.actionMethod + "=");
    //     if (index == -1) {
    //         index = url.toLowerCase().indexOf("?" + JGlobal.actionMethod + "=");
    //     }
    //     if (index > -1) {
    //         method = url.substring(index + 2 + JGlobal.actionMethod.length);
    //         index = method.indexOf("&");
    //         if (index > -1) {
    //             method = method.substring(0, index);
    //         }
    //     }
    //     if (method == null) {
    //         method = "";
    //     }
    //     return action + "?" + method;
    // }

    ins.convertUrl = function (hyperRightUrl) {
        if (!hyperRightUrl) {
            return hyperRightUrl;
        }
        hyperRightUrl = hyperRightUrl.trim();
        if (hyperRightUrl == '#') {
            return hyperRightUrl;
        }
        var index = hyperRightUrl.indexOf('?');
        if (hyperRightUrl.substring(index + 1) == 'list') {
            hyperRightUrl = hyperRightUrl + '&typeAction=search';
        }
        if (index != -1) {
            if (index < hyperRightUrl.length - 1) {
                hyperRightUrl =
                    hyperRightUrl.substring(0, index) + JGlobal.actionPattern + '?' + JGlobal.actionMethod + '=' +
                    hyperRightUrl.substring(index + 1);
            } else {
                hyperRightUrl = hyperRightUrl.substring(0, index) + JGlobal.actionPattern;
            }
            //} else if (hyperRightUrl.indexOf(JGlobal.actionPattern) == -1) {
            //    hyperRightUrl = hyperRightUrl + JGlobal.actionPattern;
        }
        if (hyperRightUrl.substring(0, 1) != '/') {
            hyperRightUrl = '/' + hyperRightUrl;
        }
        if (hyperRightUrl.indexOf(JGlobal.contextRoot + '/') != 0) {
            hyperRightUrl = JGlobal.contextRoot + hyperRightUrl;
        }
        return hyperRightUrl;
    }

    ins.checkRight = function (right) {
        checkChildren(right.parentNode, right.checked);
        if (right.checked) {
            checkParent(right.parentNode);
        }
    }

    function checkChildren(right, checked) {
        for (var i in right.childNodes) {
            if (right.childNodes[i].nodeName == 'INPUT') {
                right.childNodes[i].checked = checked;
            } else if (right.childNodes[i].nodeName == 'DIV') {
                checkChildren(right.childNodes[i], checked);
            }
        }
    }

    function checkParent(right) {
        if (right.parentNode) {
            var children = right.parentNode.childNodes;
            for (var i = 0; i < children.length; i++) {
                if (children[i].type == "checkbox" && children[i].name == "rightIds") {
                    children[i].checked = true;
                }
            }
            checkParent(right.parentNode);
        }
    }

    ins.checkBoxAll = function (objCheckAllId, objCheckName) {
        var elements = document.getElementsByName(objCheckName);
        var chkAll = document.getElementById(objCheckAllId).checked;
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].disabled != true) {
                elements[i].checked = chkAll;
            }
        }
    }

    ins.checkCheckAll = function (objCheckAllId, objCheckName) {
        var objCheckAll = document.getElementById(objCheckAllId);
        var elements = document.getElementsByName(objCheckName);
        var totalBoxes = 0;
        var totalOn = 0;
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].disabled != true) {
                totalBoxes++;
                if (elements[i].checked) {
                    totalOn++;
                }
            }
        }
        if ((totalBoxes == totalOn) && (totalBoxes != 0)) {
            objCheckAll.checked = true;
        } else {
            objCheckAll.checked = false;
        }
    }

    ins.checkCheckBoxExcludeDisable = function (objCheckName) {
        var elements = document.getElementsByName(objCheckName);
        if (!elements || elements.length == 0) {
            return true;
        }
        for (var i = 0; i < elements.length; i++) {
            var e = elements[i];
            if (elements[i].checked == true && !elements[i].hasAttribute("disabled")) {
                return true;
            }
        }
        return false;
    }

    ins.checkCheckBox = function (objCheckName) {
        var elements = document.getElementsByName(objCheckName);
        if (!elements || elements.length == 0) {
            return true;
        }
        for (var i = 0; i < elements.length; i++) {
            var e = elements[i];
            if (elements[i].checked == true) {
                return true;
            }
        }
        return false;
    }

    ins.getValueOfCheckBox = function (objCheckName) {
        var elements = document.getElementsByName(objCheckName);
        if (!elements || elements.length == 0) {
            return "";
        }
        var values = "";
        for (var i = 0; i < elements.length; i++) {
            var e = elements[i];
            if (elements[i].checked == true) {
                if ("" == values) {
                    values = elements[i].value;
                } else {
                    values = values + "," + elements[i].value;
                }
            }
        }
        return values;
    }

    ins.deleteCheckboxs = function (form, msgUncheck, msgSure) {
        if (!ins.checkCheckBox(form)) {
            JCommonUtil.alert({
                messageType: JCommonUtil.MESSAGE_TYPE_WARNING,
                message: msgUncheck
            });
            return false;
        }
        var question = confirm(msgSure);
        if (question) {
            return true;
        } else {
            return false;
        }
    }

    ins.checkboxCheckAll = function (_this, args, fireEvent, settings) {
        //args : mảng selector
        //settings : object option ({ignoreDisabled:boolean})
        if (!(args instanceof Array)) {
            args = [args];          //cast to array
        }
        //đánh dấu đối tượng _this trong trường hợp selector args select cả _this
        $(_this).attr('sourceFire', 'true');
        if ($(_this).is(':checked')) {
            for (var i = 0; i < args.length; i++) {
                $(args[i]).each(function () {
                    if ($bean.isNotEmpty($(this).attr('sourceFire'))) {
                        return;
                    }
                    if ($bean.isNotEmpty(settings)) {
                        if ($bean.isNotEmpty(settings.ignoreDisabled) && settings.ignoreDisabled && $(this).is(':disabled')) {
                            return;
                        }
                    }
                    $(this).attr('checked', 'checked');
                    if ($bean.isEmpty(fireEvent) || fireEvent) {
                        $(this).change();
                    }
                });
            }
        } else {
            for (var i = 0; i < args.length; i++) {
                $(args[i]).each(function () {
                    if ($bean.isNotEmpty($(this).attr('sourceFire'))) {
                        return;
                    }
                    if ($bean.isNotEmpty(settings)) {
                        if ($bean.isNotEmpty(settings.ignoreDisabled) && settings.ignoreDisabled && $(this).is(':disabled')) {
                            return;
                        }
                    }
                    $(this).removeAttr('checked');
                    if ($bean.isEmpty(fireEvent) || fireEvent) {
                        $(this).change();
                    }
                });
            }
        }
        $(_this).removeAttr('sourceFire');
    }

    ins.allCheckCheckbox = function (_this, relateChkbox, args, fireEvent) {
//        relateChkbox : selector các checkbox kiểm tra xem đã check hết chưa
//        args : mảng selector các checkbox thay đổi trạng thái khi tất cả relateChkbox đều được check
        var check = true;
        $(relateChkbox).each(function () {
            if (!$(this).is(':checked')) {
                check = false;
                return false;
            }
        });
        if (!(args instanceof Array)) {
            args = [args];          //cast to array
        }
        for (var i = 0; i < args.length; i++) {
            if (check && !$(args[i]).is(':checked')) {
                $(args[i]).attr('checked', 'checked');
                if ($bean.isEmpty(fireEvent) || fireEvent) {
                    $(args[i]).change();
                }
            }
            if (!check && $(args[i]).is(':checked')) {
                $(args[i]).removeAttr('checked');
                if ($bean.isEmpty(fireEvent) || fireEvent) {
                    $(args[i]).change();
                }
            }
        }
    }

    ins.checkboxChangeTitle = function (_thisCheckbox, target, value) {
        if ($bean.isNotEmpty(_thisCheckbox)) {
            value = $(_thisCheckbox).is(':checked');
        }
        if (value) {
            $(target).attr('title', $(target).attr('title-checked'));
        } else {
            $(target).attr('title', $(target).attr('title-unchecked'));
        }
    }

    ins.bindingDisabled = function (relateObj, args) {
        var disabled = true;
        $(relateObj).each(function () {
            if (!$(this).is(':disabled')) {
                disabled = false;
                return false;
            }
        });
        if (!(args instanceof Array)) {
            args = [args];          //cast to array
        }
        for (var i = 0; i < args.length; i++) {
            if (disabled && !$(args[i]).is(':disabled')) {
                $(args[i]).attr('disabled', 'disabled');
            }
            if (!disabled && $(args[i]).is(':disabled')) {
                $(args[i]).removeAttr('disabled');
            }
        }
    }

    ins.showHideByCheckbox = function (_checkbox, objApply, isReserve) {
        var value = $(_checkbox).is(':checked');
        if ($bean.isNotEmpty(isReserve) && isReserve) {
            value = !value;
        }
        if (value) {
            $(objApply).show();
        } else {
            $(objApply).hide();
        }
    }

    ins.maintainOneChecked = function (_thisCheck, unchecks, fireEvent) {
        $(_thisCheck).attr('sourceFire', 'true');
        if ($(_thisCheck).is(':checked')) {
            $(unchecks).each(function () {
                if ($(this).is(':checked') && $bean.isEmpty($(this).attr('sourceFire'))) {
                    $(this).removeAttr('checked');
                    if ($bean.isEmpty(fireEvent) || fireEvent) {
                        $(this).change();
                    }
                }
            });
        }
        $(_thisCheck).removeAttr('sourceFire');
    }

    ins.goPage = function (url) {
        window.location.href = url;
    }
    ins.goSinglePage = function (url) {
        history.pushState(null, null, JCommonUtil.convertUrl(url));
        $('#app-main').append(lyLoading());
        $.ajax({
            url: JCommonUtil.getUrlAjax(JCommonUtil.convertUrl(url)),
            success: function (data) {
                $('#app-main').html(data);
            },
            complete: function () {
                removeLyLoading('#app-main');
            }
        });
    }

    ins.openWindow = function (url, target, e) {
        e.preventDefault();
        e.stopPropagation();
        window.open(url, target);
        return false;
    }

    ins.insertParamToUrl = function (targetSelect, key, value, classExclude) {
        $(targetSelect).each(function () {
            if ($bean.isNotEmpty(classExclude) && $(this).hasClass(classExclude)) {
                return;
            }
            var href = $(this).attr('href');
            if (href) {
                var i = href.length;
                if (href.indexOf('?') != -1) {
                    i = href.indexOf('?');
                }
                var params = href.substring(i + 1, href.length).split('&');
                var newParamStr = '';
                for (var index in params) {
                    if (params[index].split('=')[0] != key) {
                        newParamStr += params[index] + '&';
                    }
                }
                newParamStr += key + '=' + value;
                href = href.substring(0, i) + '?' + newParamStr;
            }
            $(this).attr('href', href);
        });
    }
    ins.updateFieldToUrl = function (url, nameValues) {
        if (url) {
            var startParamIndex = url.length;
            if (url.indexOf('?') != -1) {
                startParamIndex = url.indexOf('?');
            }
            var newParamStr = '';
            var i, j;
            var setParams = url.substring(startParamIndex + 1, url.length).split('&');
            nameValues = nameValues.split('&');
            var nameValue, name, value, flag;
            for (i in nameValues) {
                nameValue = nameValues[i].split('=');
                name = nameValue[0];
                value = nameValue[1];
                flag = false;
                for (j in setParams) {
                    if (setParams[j].split('=')[0] == name) {
                        setParams[j] = nameValues[i];
                        flag = true;
                        break;
                    }
                }
                if (!flag) {
                    setParams.push(nameValues[i]);
                }
            }
            for (i in setParams) {
                newParamStr += setParams[i] + '&';
            }
            return url.substring(0, startParamIndex) + '?' + newParamStr.substring(0, newParamStr.length - 1);
        }
    }
    ins.getAllInputAsUrlParam = function (targetSelect) {
        var params = '';
        var name, value;
        $(targetSelect).each(function () {
            name = $(this).attr('name');
            value = $(this).attr('value');
            if (name != undefined && name.trim().length > 0 && value != undefined && value.trim().length > 0) {
                params += name + '=' + value + '&';
            }
        });
        return params.substring(0, params.length - 1);
    }

    ins.toString = function (s) {
        return '"' + s + '"';
    }

    ins.isInteger = function (s) {
        var i;
        if (ins.isEmpty(s)) return false;
        for (i = 0; i < s.length; i++) {
            var c = s.charAt(i);

            if (!ins.isDigit(c)) return false;
        }

        return true;
    }
    ins.isEmpty = function (s) {
        return ((s == null) || (s.length == 0) || (s == "null"))
    }

    ins.isDigit = function (c) {
        return ((c >= "0") && (c <= "9"))
    }

    ins.mustPressInteger = function (obj) {
        var value = obj.value;
        if (!ins.isInteger(value)) {
            obj.value = value.substring(0, value.length - 1);
        }
    }

    ins.toNoSignLowerCase = function (value) {
        if (value == "") {
            return "";
        }
        var str = value;
        str = str.toLowerCase();
        return ins.toNoSign(str);
    }

    ins.toNoSign = function (value) {
        if (value == "") {
            return "";
        }
        var str = value;
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        return str;
    }

    ins.genAlias = function (str) {
        var i_str = str;
        i_str = i_str.replace('/_+/g', ' ');
        i_str = i_str.trim();
        var noSign = JCommonUtil.toNoSign(i_str);
        var alias = noSign.replace(/\s+/g, '_');
        alias = alias.replace(/[^\w]/g, '');
        return alias;
    }

    ins.genAliasLowerCase = function (str) {
        var alias = ins.genAlias(str);
        alias = alias.toLowerCase();
        return alias;
    }

    ins.getSign = function (str) {
        str = str.toLowerCase();
        str = str.replace(/à|ằ|ầ|è|é|ì|ò|ờ|ồ|ù|ỳ/g, "f");
        str = str.replace(/á|ấ|ắ|é|ế|í|ó|ố|ớ|ú|ứ|ý/g, "s");
        str = str.replace(/ạ|ặ|ậ|ẹ|ệ|ị|ọ|ợ|ộ|ụ|ự|ỵ/g, "j");
        str = str.replace(/ã|ẵ|ẫ|ẽ|ễ|ĩ|õ|ỡ|ỗ|ũ|ữ|ỹ/g, "x");
        str = str.replace(/ả|ẳ|ẩ|ẻ|ể|ỉ|ỏ|ở|ổ|ủ|ử|ỷ/g, "r");
        str = str.replace(/ă|ơ|ư/g, "w");
        str = str.replace(/â/g, "a");
        str = str.replace(/ê/g, "e");
        str = str.replace(/ô/g, "o");
        str = str.replace(/đ/g, "d");
        str = str.replace(/\\s/g, " ");
        return str;
    }

    ins.showObjects = function (oIds) {
        if (oIds.constructor.toString().indexOf('Array()') != -1) {
            for (var i = 0; i < oIds.length; i++) {
                if ($("#" + oIds[i])) {
                    $("#" + oIds[i]).css('display', '');
                }
            }
        } else if ($("#" + oIds)) {
            $("#" + oIds).css('display', '');
        }
    }

    ins.hideObjects = function (oIds) {
        if (oIds.constructor.toString().indexOf('Array()') != -1) {
            for (var i = 0; i < oIds.length; i++) {
                if ($("#" + oIds[i])) {
                    $("#" + oIds[i]).css('display', 'none');
                }
            }
        } else if ($("#" + oIds)) {
            $("#" + oIds).css('display', 'none');
        }
    }

    ins.disableObjects = function (oIds) {
        if (oIds.constructor.toString().indexOf('Array()') != -1) {
            for (var i = 0; i < oIds.length; i++) {
                if ($("#" + oIds[i])) {
                    $("#" + oIds[i]).disabled = true;
                }
            }
        } else if ($("#" + oIds)) {
            $("#" + oIds).disabled = true;
        }
    }

    ins.enableObjects = function (oIds) {
        if (oIds.constructor.toString().indexOf('Array()') != -1) {
            for (var i = 0; i < oIds.length; i++) {
                if ($("#" + oIds[i])) {
                    $("#" + oIds[i]).disabled = false;
                }
            }
        } else if ($("#" + oIds)) {
            $("#" + oIds).disabled = false;
        }
    }

    ins.readOnlyObjects = function (oIds) {
        if (oIds.constructor.toString().indexOf('Array()') != -1) {
            for (var i = 0; i < oIds.length; i++) {
                if ($("#" + oIds[i])) {
                    $("#" + oIds[i]).readonly = true;
                }
            }
        } else if ($("#" + oIds)) {
            $("#" + oIds).readonly = true;
        }
    }

    ins.readWriteObjects = function (oIds) {
        if (oIds.constructor.toString().indexOf('Array()') != -1) {
            for (var i = 0; i < oIds.length; i++) {
                if ($("#" + oIds[i])) {
                    $("#" + oIds[i]).readonly = false;
                }
            }
        } else if ($("#" + oIds)) {
            $("#" + oIds).readonly = false;
        }
    }
    ins.animateGoTo = function (target, container, top, duration) {
        //chỉ nên dùng trên trang vì có tính toán thêm chiều cao của header
        if ($(target).length > 0) {
            if ($bean.isEmpty(container)) {
                container = 'html, body';
            }
            if ($bean.isEmpty(top)) {
                top = 0;
            }
            if ($bean.isEmpty(duration)) {
                duration = 500;
            }
            $(container).animate({
                scrollTop: ($(target).offset().top - $('.app-header').height() - top)
            }, duration);
        }
    }
    ins.animateScrollTo = function (target, container, top, duration) {
        if ($(target).length > 0) {
            if ($bean.isEmpty(container)) {
                container = 'html, body';
            }
            if ($bean.isEmpty(top)) {
                top = 0;
            }
            if ($bean.isEmpty(duration)) {
                duration = 500;
            }
            $(container).animate({scrollTop: $(target).position().top - top}, duration);
        }
    }
    ins.goTop = function () {
        $("html, body").animate({scrollTop: 0}, 150);
    }
    ins.offsetScrollTo = function (target, container, top, duration) {
        if ($(target).length > 0) {
            if ($bean.isEmpty(container)) {
                container = 'html, body';
            }
            if ($bean.isEmpty(top)) {
                top = 0;
            }
            if ($bean.isEmpty(duration)) {
                duration = 500;
            }
            $(container).animate({scrollTop: $(target).offset().top - top}, duration);
        }
    }
    ins.animateFocus = function (target, container, top, duration, animate_bg_color, timer, noScroll) {
        if ($(target).length > 0) {
            if ($bean.isEmpty(noScroll) || !noScroll) {
                if ($(target).offset().top + $(target).height() < $(window).scrollTop()
                    || $(target).offset().top > $(window).scrollTop() + $(window).height()) {
                    ins.animateGoTo(target, container, top, duration);
                }
            }
            if ($bean.isEmpty(animate_bg_color)) {
                animate_bg_color = ins.ANIMATE_FOCUS_BG;
            }
            if ($bean.isEmpty(timer)) {
                timer = ins.ANIMATE_FOCUS_TIME;
            }
            $(target).each(function () {
                $(this).stop(true, true).effect("highlight", {color: animate_bg_color}, timer);
            });
        }
    }
    ins.animateFocusPulsate = function (target, container, top, duration, animate_bg_color, timer) {
        if ($(target).length > 0) {
            if ($(target).offset().top + $(target).height() < $(window).scrollTop()
                || $(target).offset().top > $(window).scrollTop() + $(window).height()) {
                ins.animateGoTo(target, container, top, duration);
            }
            if ($bean.isEmpty(animate_bg_color)) {
                animate_bg_color = ins.ANIMATE_FOCUS_BG;
            }
            if ($bean.isEmpty(timer)) {
                timer = ins.ANIMATE_FOCUS_TIME;
            }
            $(target).each(function () {
                $(this).stop(true, true).effect("pulsate", {color: animate_bg_color}, timer);
            });
        }
    }
    ins.animateHighLight = function (target, animate_bg_color, timer) {
        if ($(target).length > 0) {
            if ($bean.isEmpty(animate_bg_color)) {
                animate_bg_color = ins.ANIMATE_FOCUS_BG;
            }
            if ($bean.isEmpty(timer)) {
                timer = ins.ANIMATE_FOCUS_TIME;
            }
            $(target).each(function () {
                $(this).stop(true, true).effect("highlight", {color: animate_bg_color}, timer);
            });
        }
    }
    ins.animatePulsate = function (target, animate_bg_color, timer) {
        if ($(target).length > 0) {
            if ($bean.isEmpty(animate_bg_color)) {
                animate_bg_color = ins.ANIMATE_FOCUS_BG;
            }
            if ($bean.isEmpty(timer)) {
                timer = ins.ANIMATE_FOCUS_TIME;
            }
            $(target).each(function () {
                $(this).stop(true, true).effect("pulsate", {color: animate_bg_color}, timer);
            });
        }
    }
    ins.showPos = function ($target, $posContainer, x, y, padVer, padHoz, minLeft) {
        var arrowPadding = 9;
        var isFloatLeft = $target.attr('show-float') == 'left';
        var isFloatRight = $target.attr('show-float') == 'right';
        if ($bean.isEmpty(padVer)) {
            padVer = 0;
        }
        if ($bean.isEmpty(padHoz)) {
            padHoz = 0;
        }
        var pos_x, pos_y, ver, hoz, o_x, o_y;
        if ($bean.isEmpty($posContainer)) {
            $posContainer = $(window);
            pos_x = $posContainer.scrollLeft();
            pos_y = $posContainer.scrollTop();
        } else {
            pos_x = $posContainer.offset().left;
            pos_y = $posContainer.offset().top;
        }
        ver = 'middle';
        o_y = y + padVer;
        if (pos_y < (y - $target.height())) {
            ver = 'top';
            o_y = y - $target.height() - arrowPadding;
        }
        if ((pos_y + $posContainer.height()) > (y + padVer + $target.height())) {
            ver = 'bottom';
            o_y = y + padVer;
        }

        hoz = 'middle';
        o_x = pos_x;
        if (pos_x < (x - $target.width()) && !isFloatRight) {
            hoz = 'left';
            o_x = x - $target.width() + padHoz;
        }
        if ((pos_x + $posContainer.width()) > (x + $target.width()) && !isFloatLeft) {
            hoz = 'right';
            o_x = x - padHoz / 2;
        }
        var $ardBefore = $target.find('.ard-before');
        var $ardAfter = $target.find('.ard-after');
        if ($bean.isNotEmpty($ardBefore) && $bean.isNotEmpty($ardAfter)) {
            var ardBeforeTop, ardAfterTop, ardLeft;
            if (hoz == 'left') {
                ardLeft = $target.width() - $ardBefore.width();
            } else if (hoz == 'middle') {
                ardLeft = x - pos_x;
            } else if (hoz == 'right') {
                ardLeft = 0;
            }
            if (ver == 'top') {
                ardBeforeTop = $target.height();
                ardAfterTop = $target.height() - 1;
            } else if (ver == 'middle') {
                ardBeforeTop = -parseInt($ardBefore.css('height').replace('px', ''));
                ardAfterTop = -parseInt($ardAfter.css('height').replace('px', ''));
            } else if (ver == 'bottom') {
                ardBeforeTop = -parseInt($ardBefore.css('height').replace('px', ''));
                ardAfterTop = -parseInt($ardAfter.css('height').replace('px', ''));
            }
            $ardBefore.css('top', ardBeforeTop);
            $ardBefore.css('left', ardLeft);
            $ardAfter.css('top', ardAfterTop);
            $ardAfter.css('left', ardLeft + 1);
        }
        if (o_x < minLeft) {
            o_x = minLeft;
        }
        $target.offset({top: o_y, left: o_x}); // loi tren Chrome ko set dung offset lan dau
        $target.offset({top: o_y, left: o_x}); // fix: goi them lan nua
        $target.attr('ver-hoz', ver + '-' + hoz);
    }
    ins.DropDown = function (el) {
        this.dropDown = el;
        this.initEvents();
        DropDown.prototype = {
            initEvents: function () {
                var obj = this;
                obj.dropDown.on('click', function (event) {
                    $(this).toggleClass('active');
                    event.stopPropagation();
                });
            }
        }
        $(function () {
            var dropDown = new DropDown($('#dropDown'));
            $(document).click(function () {
                // all dropdowns
                $('.wrapper-dropdown').removeClass('active');
            });

        });
    }
    ins.registerTooltipster = function (className) {
        if ('true' === JGlobal.labelEdit) {
            $(className).tooltipster({
                trigger: 'click',
                icon: '/img/icon/edit.png',
                iconDesktop: true,
                iconTouch: true,
                interactive: true,
                lbl: 1,
                updateData: true
            });
        }
    }
    ins.reTooltipster = function ($target) {
        if ($bean.isNotEmpty($target)) {
            /*$target.each(function () {
             $(this).attr('title', $(this).attr('data-title-backup'));
             $(this).attr('data-title-backup', '');
             });*/
            $target.tooltipster();
        }
    }
    ins.addEventTooltip = function () {
        $('.tooltip').tooltipster({
            interactive: true
        });
        if ('false' === JGlobal.labelEdit) {
            $('body').find('[title]').each(function () {
                // config tooltipster: do loi keo tha tren kanban
                if ($(this).closest('.tooltipster-disable').length > 0) {
                    return;
                }
                if ($(this).attr('title') != null && !$(this).hasClass('tooltip')) {
                    var title = $(this).attr('title');
                    $(this).addClass('tooltip');
                    $(this).attr('data-title', title);
                    $(this).tooltipster({
                        trigger: '',
                        interactive: true
                    });
                    $(this).attr('title', title);
                }
                $(this).hammer({
                    gesture: true
                }).on("hold", function (ev) {
                    if ($bean.isNotEmpty($(this).attr('href'))) {
                        $(this).attr('href-bk', $(this).attr('href'));
                        $(this).attr('href', 'null');
                    }
                    if ($(this).parent().hasClass('quick-action')) {
                        $(this).parent().attr('show-tooltip', 'tooltip');
                    }
                    $(this).tooltipster('show');
                }).on("click", function (ev) {
                    if ($bean.isNotEmpty($(this).attr('href-bk'))) {
                        $(this).attr('href', $(this).attr('href-bk'));
                        $(this).attr('href-bk', '');
                    }
                    if ($(this).parent().hasClass('quick-action')) {
                        $(this).parent().removeAttr('show-tooltip');
                    }
                });
            });
        }
    }
    ins.openDetail = function () {
        var goalId = $bean.getUrlParam('openDetailGoalId');
        if ($bean.isNotEmpty(goalId)) {
            var aTag = '<a class="hide" id="show-detail-goal-' + goalId + '" onclick="JGoal.showGoalDetail(\'' + goalId + '\', \'goal\', event)"></a>';
            $('body').append(aTag);
            $('#show-detail-goal-' + goalId).click();
        }
        var workingId = $bean.getUrlParam('openDetailWorkingId');
        if ($bean.isNotEmpty(workingId)) {
            var aTag = '<a class="hide" id="show-detail-working-' + workingId + '" onclick="JGoal.showWorkingDetail(\'' + workingId + '\', event)"></a>';
            $('body').append(aTag);
            $('#show-detail-working-' + workingId).click();
        }
        var contactId = $bean.getUrlParam('openDetailContactId');
        if ($bean.isNotEmpty(contactId)) {
            var aTag = '<a class="hide" id="show-detail-contact-' + contactId + '" onclick="JCommonUtil.showContactDetail(\'' + contactId + '\', event)"></a>';
            $('body').append(aTag);
            $('#show-detail-contact-' + contactId).click();
        }
        var settingDialog = window.location.hash.indexOf('openDialogSetting') > -1;
        if (settingDialog) {
            var aTag = '<a class="hide" id="setting-dialog" onclick="JGoal.showSettingDialog(event)"></a>';
            $('body').append(aTag);
            $('#setting-dialog').click();
        }

        var krId = $bean.getUrlParam('openDetailGoalKeyResultId');
        if ($bean.isNotEmpty(krId)) {
            var aTag = '<a class="hide" id="show-detail-goal-key-result-' + krId + '" onclick="JGoal.showGoalKeyResultDetail(\'' + krId + '\', event)"></a>';
            $('body').append(aTag);
            $('#show-detail-goal-key-result-' + krId).click();
        }
        var rapFormInfoId = $bean.getUrlParam('openDetailRapFormInfoId');
        if ($bean.isNotEmpty(rapFormInfoId)) {
            var aTag = '<a class="hide" id="show-detail-rap-form-info-' + rapFormInfoId + '" onclick="JCommonUtil.showCurrentRapFormInfoDetail(\'' + rapFormInfoId + '\', event)"></a>';
            $('body').append(aTag);
            $('#show-detail-rap-form-info-' + rapFormInfoId).click();
        }
    }
    ins.showContactDetail = function (contactId, event) {
        event.stopPropagation();
        if ($('body').find('.prettyPopin').length > 0) {
            closePrettyPopin(function () {
                $contactListScope.showContactDetail({id: contactId}, event);
                $hdDialog.watchClickDialog(event);
            });
        } else {
            $contactListScope.showContactDetail({id: contactId}, event);
            $hdDialog.watchClickDialog(event);
        }

    }
    ins.showCurrentRapFormInfoDetail = function (rapFormInfoId, event) {
        event.stopPropagation();
        if ($('body').find('.prettyPopin').length > 0) {
            closePrettyPopin(function () {
                $scopeBaseRap.getCurrent({id: rapFormInfoId}, event);
                $hdDialog.watchClickDialog(event);
            });
        } else {
            $scopeBaseRap.getCurrent({id: rapFormInfoId}, event);
            $hdDialog.watchClickDialog(event);
        }

    }
    ins.openGettingStarted = function () {
        var aTag = '<a class="hide" id="getting-started-dialog" onclick="JCommonUtil.showGettingStarted(event)"></a>';
        $('#app-main').append(aTag);
        $('#getting-started-dialog').click();
    }
    ins.openSelectDemand = function () {
        var aTag = '<a class="hide" id="demand-selected-dialog" onclick="JCommonUtil.showSelectDemand(event)"></a>';
        $('#app-main').append(aTag);
        $('#demand-selected-dialog').click();
    }
    ins.showGettingStarted = function (event) {
        setTimeout(function () {
            $baseScope.showModalLargest('serverNoCache:/help/dialog_getting_started', 'demandParam', event, false);
            $hdDialog.watchClickDialog(event);
        }, 1000);
    }
    ins.showSelectDemand = function (event) {
        setTimeout(function () {
            $baseScope.showModalLargest('serverNoCache:/help/dialog_select_demand', '', event, false);
            $hdDialog.watchClickDialog(event);
        }, 1000);
    }
    ins.showDialogVideo = function (url, videoName, event) {
        $baseScope.videoParam = {url: url, videoName: videoName};
        $baseScope.showModal('server:/help/dialog_help_video', 'videoParam', event, false);
//        $hdDialog.watchClickDialog(event);
    }
    ins.placeCaretAtEnd = function (el) {
        el.focus();
        if (typeof window.getSelection != "undefined"
            && typeof document.createRange != "undefined") {
            var range = document.createRange();
            range.selectNodeContents(el);
            range.collapse(false);
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        } else if (typeof document.body.createTextRange != "undefined") {
            var textRange = document.body.createTextRange();
            textRange.moveToElementText(el);
            textRange.collapse(false);
            textRange.select();
        }
    }
    ins.updateNumberTable = function (targetSelect, rowSelect, indexColumn) {
        var i = 0;
        $(targetSelect + ' ' + rowSelect).each(function () {
            if ($(this).css('display') != 'none') {
                $(this).removeClass('row' + !i % 2);
                $(this).addClass('row' + i % 2);
                $(this).find(indexColumn).html(++i);
            }
        });
    }
    // lay ra kich thuoc css cua man hinh, dung trong reponsive JCommonUtil.viewPort().width, JCommonUtil.viewPort().height
    ins.viewport = function () {
        var e = window, a = 'inner';
        if (!('innerWidth' in window )) {
            a = 'client';
            e = document.documentElement || document.body;
        }
        return {width: e[a + 'Width'], height: e[a + 'Height']};
    }

    ins.scrollBarWidth = function () {
        var width = $(window).width();
        $('body').addClass('temp-body');
        var widthNew = $(window).width();
        $('body').removeClass('temp-body');
        if (width == widthNew) {
            return 15;
        }
        return 0;
    }
    ins.getUrlAjax = function (url) {
        if ($bean.isNotEmpty(url)) {
            if (url.indexOf("&ts=") == -1) {
                if (url.indexOf("?") == -1) {
                    return url + "?ts=" + new Date().getTime();
                } else {
                    return url + "&ts=" + new Date().getTime();
                }
            }
        }
        return url;
    }
    ins.checkMe = function (selector) {
        $(selector).click();
    }
    // alert cai dat app khi dung browser tren mobile
    ins.alertInstallApp = function () {
        if (!JGlobal.isMobile && !sessionStorage['isAlertInstallApp'] && !JDevice.isIhcmApp() && JDevice.isMobile()) {
            if (JDevice.isIos()) {
                if (confirm(JGlobal.messageAlertInstallApp)) {
                    window.location = 'https://itunes.apple.com/us/app/ihcm-human-capital-management/id854973448?l=vi&ls=1&mt=8';
                }
            } else if (JDevice.isWindowsPhone()) {
                if (confirm(JGlobal.messageAlertInstallApp)) {
                    window.location = 'http://www.windowsphone.com/en-us/store/app/ihcm/6904c184-4058-420e-bf8d-b40147e96597';
                }
            } else if (JDevice.isAndroid()) {
                if (confirm(JGlobal.messageAlertInstallApp)) {
                    window.location = 'https://play.google.com/store/apps/details?id=vn.hyperlogy.ihcm';
                }
            }
            sessionStorage['isAlertInstallApp'] = true;
        }
    }
    ins.downloadFile = function (url, data, method) {
        //url and data options required
        if (url && data) {
            //data can be string of parameters or array/object
            data = typeof data == 'string' ? data : jQuery.param(data);
            //split params into form inputs
            var inputs = '';
            jQuery.each(data.split('&'), function () {
                var pair = this.split('=');
                inputs += '<input type="hidden" name="' + decodeURI(pair[0]) + '" value="' + decodeURI(pair[1]) + '" />';
            });
            //send request
            jQuery('<form action="' + url + '" method="' + (method || 'post') + '">' + inputs + '</form>')
                .appendTo('body').submit().remove();
        }
        ;
    };
    ins.registerCheckBoxLevel = function (event, element) {
        var eLevel = element;
        while (!eLevel.attr('level')) {
            eLevel = eLevel.parent();
        }
        if ($(event.target).is('input[type="checkbox"]')) {
            eLevel.find('input[type="checkbox"]').prop('checked', element.find('input[type="checkbox"]').is(':checked'));
        } else {
            eLevel.find('input[type="checkbox"]').prop('checked', !element.find('input[type="checkbox"]').is(':checked'));
        }
    }
    ins.executeFunctionByName = function (functionName, context /*, args */) {
        if ($bean.isEmpty(context)) {
            context = window;
        }
        var args = [].slice.call(arguments).splice(2);
        if (functionName.indexOf('(')) {
            var paramStr = functionName.substring(functionName.indexOf('('));
            functionName = functionName.substring(0, functionName.indexOf('('));
            var regExp = /\(([^)]+)\)/;
            var matches = regExp.exec(paramStr);

            //matches[1] contains the value between the parentheses
            args = matches[0].substring(1, matches[0].length - 1).split(',');
            for (var i = 0; i < args.length; i++) {
                if (args[i][0] == '\'' || args[i][0] == '"') {
                    args[i] = args[i].substring(1);
                }
                if (args[i][args[i].length - 1] == '\'' || args[i][args[i].length - 1] == '"') {
                    args[i] = args[i].substring(0, args[i].length - 1);
                }
            }
        }
        var namespaces = functionName.split(".");
        var func = namespaces.pop();

        for (var i = 0; i < namespaces.length; i++) {
            context = context[namespaces[i]];
        }
        return context[func].apply(this, args);
    }
    ins.checkItem = function (item) {
        if ($bean.isNotEmpty($(item))) {
            $(item).attr("checked", true);
            $(item).click();
        }
    }
    ins.initTree = function (isPrettyPopin) {
        var container = '';
        if (isPrettyPopin == true) {
            container = '.prettyContent ';
        }
        $(container + '.tree li:has(ul)').addClass('parent_li');
        $(container + '.tree li:not(.parent_li) i').remove();
        $(container + '.tree li.parent_li > span > i').bind(myClickHandler, function (e) {
            var children = $(this).parent().parent('li.parent_li').find(' > ul > li');
            if (children.is(":visible")) {
                children.hide('fast');
                $(this).parent().find(' > i').addClass('icon-plus-sign').removeClass('icon-minus-sign');
            } else {
                children.show('fast');
                $(this).parent().find(' > i').addClass('icon-minus-sign').removeClass('icon-plus-sign');
            }
            e.stopPropagation();
        });
    }
    ins.displayBoxAlert = function (type, msg) {
        var boxAlert = '<div id="display-box-alert" class="box-alert bg-' + type + '"><p>' + msg + '</p></div>';
        $('#display-box-alert').remove();
        return boxAlert;
    }
    ins.getValueObj = function (obj, defaultValue) {
        return (obj ? obj : defaultValue);
    }
    ins.getHiddenOffsetWidth = function (obj) {
        // save a reference to a cloned element that can be measured
        var $hiddenElement = $(obj).clone().appendTo('body');
        // calculate the width of the clone
        var width = $hiddenElement.outerWidth();
        // remove the clone from the DOM
        $hiddenElement.remove();
        return width;
    };
    ins.getParameterByName = function (name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(window.location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    ins.removeParameterByName = function (key, sourceURL) {
        var rtn = sourceURL.split("?")[0],
            param,
            params_arr = [],
            queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
        if (queryString !== "") {
            params_arr = queryString.split("&");
            for (var i = params_arr.length - 1; i >= 0; i -= 1) {
                param = params_arr[i].split("=")[0];
                if (param === key) {
                    params_arr.splice(i, 1);
                }
            }
            rtn = rtn + "?" + params_arr.join("&");
        }
        return rtn;
    }

    ins.changeTypeTimePicker = function(){
        $.cookie('usePickerTime', $.cookie('usePickerTime') == 'false' ? true : false);
        if($.cookie('usePickerTime') != 'false'){
            $('.ui-timepicker-select').removeAttr('disabled');
        }else{
            $('.ui-timepicker-select').attr('disabled', true);
        }
    }

    ins.buildDataFromAction = function (dataSourceName, sourceAction, fields, callback) {
        if (typeof window[dataSourceName] == $bean.TYPE_UNDEFINED) {
            if (typeof (fields) == 'string') {
                fields = JSON.parse(fields);
            }
            $.ajax({
                type: 'GET',
                url: JCommonUtil.getUrlAjax(JCommonUtil.convertUrl(sourceAction)),
                success: function (data) {
                    try {
                        window[dataSourceName] = [];
                        data = JSON.parse(data);
                        if ($bean.isNotEmpty(fields)) {
                            for (var i = 0; i < data.length; i++) {
                                var sourceData = {};
                                for (var key in fields) {
                                    sourceData[key] = data[i][fields[key]];
                                }
                                window[dataSourceName].push(sourceData);
                            }
                        }
                        if (callback) {
                            $functions.eval(callback);
                        } else {
                            return window[dataSourceName];
                        }
                    } catch (e) {
                        console.log($bean.toConsoleMsg(data + ''), $bean.CONSOLE_LOG_ERROR);
                    }
                }
            });
        } else {
            if (callback) {
                $functions.eval(callback);
            } else {
                return window[dataSourceName];
            }
        }
    }

    ins.ADVANCE_CLASS = "class";
    ins.ADVANCE_ACTION = "action";
    ins.ADVANCE_ICON = "icon";
    ins.ADVANCE_RESULT_NAME = "resultName";
    ins.ADVANCE_RESULT_VALUE = "resultValue";
    ins.ADVANCE_SEARCH_TYPE = "searchType";
    ins.ADVANCE_SEARCH_ACTION = "searchAction";
    ins.ADVANCE_TITLE = "title";

    ins.buildAdvanceSearch = function (option, fields) {
        if ($bean.isString(option)) {
            option = JSON.parse(option);
        }
        if ($bean.isString(fields)) {
            fields = JSON.parse(fields);
        }
        var $advanceSearchTag = $('<a></a>');
        $advanceSearchTag.addClass(option[ins.ADVANCE_CLASS]);
        $advanceSearchTag.attr('data-icon', option[ins.ADVANCE_ICON]);
        $advanceSearchTag.attr('title', option[ins.ADVANCE_TITLE]);
        var resultNames = $bean.split(option[ins.ADVANCE_RESULT_NAME]);
        var resultValues = $bean.split(option[ins.ADVANCE_RESULT_VALUE]);
        var selectEvents = $bean.split(option['selectEvent']);
        for (var i = 0; i < resultNames.length; i++) {
            var url = option[ins.ADVANCE_ACTION]
                + '&search-type=' + option[ins.ADVANCE_SEARCH_TYPE]
                + '&result-value=' + encodeURIComponent('#' + resultValues[i])
                + '&result-name=' + encodeURIComponent('#' + resultNames[i]);
            if (option['selectEvent']) {
                url += '&select-event=' + encodeURIComponent(selectEvents[i]);
            }
            if (option[ins.ADVANCE_SEARCH_ACTION]) {
                url = url + '&search-action=' + encodeURIComponent(option[ins.ADVANCE_SEARCH_ACTION]);
            }
            $advanceSearchTag.attr('href', ins.convertUrl(url));
            var t = $advanceSearchTag.clone();
            t.bind(myClickHandler, function () {
                if (typeof window[option["dataSourceName"]] == $bean.TYPE_UNDEFINED) {
                    ins.buildDataFromAction(option["dataSourceName"], option["sourceAction"], fields);
                }
            });
            if ($bean.isEmpty($('#' + resultNames[i]).parent().find('.' + option[ins.ADVANCE_CLASS]))) {
                t.insertAfter('#' + resultNames[i]);
                t.prettyPopin();
                $('#' + resultNames[i]).css('padding-right', parseInt($('#' + resultNames[i]).css('padding-right')) + 24 + 'px')
            }
            $('#' + resultValues[i]).attr('dataSourceName', option["dataSourceName"]);
        }
    }

    var CHAR_POSSIBLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    ins.genRandomID = function (length) {
        if ($bean.isEmpty(length)) {
            length = 5;
        }
        var text = "";
        for (var i = 0; i < length; i++) {
            text += CHAR_POSSIBLE.charAt(Math.floor(Math.random() * CHAR_POSSIBLE.length));
        }
        return text;
    }

    ins.rndInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    ins.showLogin = function () {
        setTimeout(function () {
            $('#btn_login').trigger('click');
        }, 600);
    }

    ins.hideLogin = function () {
        $('#dialog_login').parents('.hyd-dialog').trigger('hydDialog.toggleDialog');
    }

    ins.showDisconnect = function () {
        setTimeout(function () {
            $('#btn_disconnect').trigger('click');
        }, 600);
    }

    ins.hideDisconnect = function () {
        $('#dialog_disconnect').parents('.hyd-dialog').trigger('hydDialog.toggleDialog');
    }

    ins.slideToggle = function (obj) {
        var $toogleRoot = $(obj).closest('[toggle-root = "group"]');
        $toogleRoot.find('[toggle-item = "slide-toggle"]').slideToggle('slow');
        $(obj).toggleClass('s-show', 'slow');
        var $icon = $(obj).find('.icon');
        if ($icon.hasClass('icon-img-arrow-right')) {
            $icon.removeClass('icon-img-arrow-right').addClass('icon-img-arrow-down');
        } else {
            $icon.removeClass('icon-img-arrow-down').addClass('icon-img-arrow-right');
        }
    }

    ins.sliderDestroy = function(){
        if (JCommonUtil.slideSwiper != null) {
            JCommonUtil.slideSwiper.destroy();
            JCommonUtil.slideSwiper = null;
            $('.slider-container .swiper-slide[xmlns]').remove();
        }
    }

    ins.slider = function () {
        var slideHeight = 0;
        $('.slider-container .swiper-container .swiper-slide').each(function () {
            if (slideHeight < $(this).outerHeight(true)) {
                slideHeight = $(this).outerHeight(true);
            }
        });
        $('.slider-container .swiper-container').css('height', parseInt(slideHeight) + 'px');
        // $('.wp-img-video .wp-img').css('height', parseInt(slideHeight) + 'px');
        // $('.wp-img-video .wp-video').css('height', parseInt(slideHeight) + 'px');
        if ($('.slider-container').length > 0) {
            JCommonUtil.slideSwiper = new Swiper('.slider-container .swiper-container', {
                pagination: '.slider-pagination',
                loop: true,
                grabCursor: true,
                paginationClickable: true,
                speed: 1000,
                autoplay: 10000,
                slidesPerView: '1',
                slidesPerGroup: '1'
            });
        }
    }

    ins.dialogSlider = function () {
        var slideHeight = 0;
        $('.dialog-slider-container .swiper-container .swiper-slide').each(function () {
            if (slideHeight < $(this).outerHeight(true)) {
                slideHeight = $(this).outerHeight(true);
            }
        });
        $('.dialog-slider-container .swiper-container').css('height', parseInt(slideHeight) + 'px');
        if ($('.dialog-slider-container').length > 0) {
            JCommonUtil.slideSwiper = new Swiper('.dialog-slider-container .swiper-container', {
                pagination: '.dialog-slider-pagination',
                loop: true,
                grabCursor: true,
                paginationClickable: true,
                speed: 1000,
                autoplay: 10000,
                slidesPerView: '1',
                slidesPerGroup: '1'
            });
        }
    }

    return ins;
})
(window, jQuery);

var JCookies = (function (window, $) {
    var ins = {};

    ins.IHCM_STORAGE_VERSION = 'IHCM-S-VER';
    ins.KPI_CHART_SELECT = 'iHCM-KCS';
    ins.GOAL_BOARD_UI_SELECT = 'IHCM-GBUI';
    ins.GOAL_BOARD_PROCESS_CHART_OBJ_SELECT = 'IHCM-GC-O';
    ins.WORKING_CALENDAR_EMP = 'IHCM-W-C';
    ins.TIMELINE_FOCUS = 'IHCM-TL-F';
    ins.CALENDAR_FOCUS = 'IHCM-C-F';
    ins.IHCM_SIDEBAR_EXPAND = 'IHCM-MENU';

    ins.getDefault = function (key) {
        if (key == ins.GOAL_BOARD_UI_SELECT) {
            return JGoalBoard.KANBAN;
        }
        if (key == ins.GOAL_BOARD_PROCESS_CHART_OBJ_SELECT) {
            return JGoalBoard.GOAL;
        }
        if (key == ins.WORKING_CALENDAR_EMP) {
            return JGoalBoard.WORKING;
        }
        if (key == ins.TIMELINE_FOCUS) {
            return 'month';
        }
        if (key == ins.CALENDAR_FOCUS) {
            return 'month';
        }
        if (key == ins.IHCM_SIDEBAR_EXPAND) {
            return 'e';
        }
        return '';
    }

    ins.get = function (key) {
        var value = $.cookie(key);
        if ($bean.isEmpty(value) || ins.invalidCookie(key)) {
            value = ins.getDefault(key);
        }
        return value;
    }

    ins.set = function (key, value) {
        $.cookie(key, value);
    }

    ins.invalidCookie = function (key, value) {
        var value = $.cookie(key);
        if (key == ins.GOAL_BOARD_UI_SELECT) {
            return JGoalBoard.GOAL_BOARD_VIEWS.indexOf(value) == -1;
        }
        if (key == ins.WORKING_CALENDAR_EMP) {
            return value != JGoalBoard.WORKING && value != JGoalBoard.CALENDAR;
        }
        if (key == ins.TIMELINE_FOCUS) {
            return ['date', 'week', 'month', 'quarter', 'year'].indexOf(value) == 'month';
        }
        if (key == ins.CALENDAR_FOCUS) {
            return ['agendaDay', 'agendaWeek', 'month'].indexOf(value) == -1;
        }
        if (key == ins.IHCM_SIDEBAR_EXPAND) {
            return ['c', 'e'].indexOf(value) == -1;
        }
        return false;
    }

    ins.remove = function (key) {
        $.removeCookie(key);
    }

    return ins;
})(window, jQuery);

var JLocalStorage = (function (window, $) {
    var ins = {};

    ins.PROFILE_LAYOUT = 'IHCM-L';
    ins.PROFILE_LAYOUT_DEFAULT = {
        sidebar: ''
    };
    ins.setToJson = function (key, obj) {
        try {
            var val = JSON.stringify(obj);
            localStorage.setItem(key, val);
        } catch (err) {
            console.warn(err);
        }
    }

    ins.getJsonObj = function (key) {
        var obj = null;
        try {
            obj = JSON.parse(localStorage.getItem(key));
        } catch (err) {
            console.warn(err);
        }
        // return default values if not existed
        if ($bean.isEmpty(obj)) {
            if (key == ins.PROFILE_LAYOUT) {
                obj = ins.PROFILE_LAYOUT_DEFAULT;
            } else {
                obj = {};
            }
        }
        //
        return obj;
    }

    ins.setProfile = function (profileKey, propertyKey, value) {
        try {
            var profile = ins.getJsonObj(profileKey);
            profile[propertyKey] = value;
            ins.setToJson(profileKey, profile);
        } catch (err) {

        }
    }

    return ins;
})(window, jQuery);

// mở rộng jquery.steps.js
// bổ sung thêm chức năng: set chi�?u rộng của các tab, thêm custom action button
var JQuerySteps = (function (window, $) {
    var ins = {};

    ins.intCustoms = function (containerId) {
        var $wizard = $('#' + containerId);
        var $tabList = $wizard.find(' .steps.clearfix ul[role="tablist"]');
        var $tabs = $tabList.find('li[role="tab"]');
        var $linkTabs = $tabList.find('li[role="tab"] a');
        // minWidth cua moi tab la 200px
        var minWidthTab = 200;
        // so tab tren mot dong hien thi nhieu nhat co the
        var numTabOneRow = Math.floor($tabList.width() / minWidthTab);
        var widthPercent = 100 / numTabOneRow;
        if (numTabOneRow > $tabs.length) {
            widthPercent = 100 / $tabs.length;
        }

        $tabs.width(widthPercent + '%');
        if ($tabs.length % numTabOneRow == 0) {
            $tabs.last().width(100 - widthPercent * (numTabOneRow - 1) + '%');
        }
    }

    ins.resizeJQuerySteps = function () {
        $('.wizard').each(function () {
            ins.intCustoms($(this).attr('id'));
        });
    }

    ins.addCustomAction = function (containerId, id, url, label, target) {
        var $container = $('#' + containerId);
        var htmlLink = '<li id="' + id + '" class="" aria-hidden="" aria-disabled=""><a href="' +
            url + '" role="menuitem" target="' + target + '">' + label + '</a></li>';
        $('#' + containerId + ' .actions.clearfix ul[role="menu"]').prepend($(htmlLink));
    }

    ins.addCustomActionForStep = function (containerId, label, customHtml, actionId, enableStep, priority) {
        var $container = $('#' + containerId);
        var htmlLink = '<li class="" aria-hidden="" aria-disabled=""><a ' +
            customHtml + ' role="menuitem" wizard-custom-btn="' + actionId + '" enable-step="' + enableStep + '" action-priority="' + priority + '">' + label + '</a></li>';
        $('#' + containerId + ' .actions.clearfix ul[role="menu"]').prepend($(htmlLink));
        if ($bean.isNotEmpty(actionId)) {
            $('#' + containerId).steps("addAction", actionId);
        }
    }

    ins.positionActionBtn = function (containerId, finishIndex, nextIndex, prevIndex) {
        var maps = [];
        if ($bean.isNotEmpty(finishIndex)) {
            var sortInfo = {};
            sortInfo.priority = finishIndex;
            sortInfo.action = $('#' + containerId + ' .actions a[href$="#finish"]');
            maps.push(sortInfo);
        }
        if ($bean.isNotEmpty(nextIndex)) {
            var sortInfo = {};
            sortInfo.priority = nextIndex;
            sortInfo.action = $('#' + containerId + ' .actions a[href$="#next"]');
            maps.push(sortInfo);
        }
        if ($bean.isNotEmpty(prevIndex)) {
            var sortInfo = {};
            sortInfo.priority = prevIndex;
            sortInfo.action = $('#' + containerId + ' .actions a[href$="#previous"]');
            maps.push(sortInfo);
        }
        $('#' + containerId + ' .actions a[action-priority]').each(function () {
            var sortInfo = {};
            sortInfo.priority = $(this).attr('action-priority');
            sortInfo.action = $(this);
            maps.push(sortInfo);
        });
        //sort asc
        maps.sort(function (a, b) {
            return parseInt(a.priority) - parseInt(b.priority);
        });
        //append right to left
        for (var i = 0; i < maps.length; i++) {
            $('#' + containerId + ' .actions.clearfix ul[role="menu"]').prepend($(maps[i].action).parent());
        }
    }

    return ins;
})(window, jQuery);

var JDisplayUtil = (function (window, $) {
    var ins = {};
    ins.CLASS_LABEL = 'ilabel';
    ins.CLASS_VALUE = 'ivalue';
    ins.CLASS_NULL = 'null';
    ins.CLASS_APPEND_DATA = 'adata';
    ins.DATA_APPEND_LAVEL = ':';
    ins.DATA_NULL = 'N/A';

    ins.displayDefault = function () {
        $('.' + ins.CLASS_LABEL + '.' + ins.CLASS_APPEND_DATA).each(function () {
            var label = $.trim($(this).html());
            if ($bean.isNotEmpty(label)) {
                if (label.indexOf(ins.DATA_APPEND_LAVEL) != (label.length - 1)) {
                    $(this).html(label + ins.DATA_APPEND_LAVEL);
                }
            }
        });
        $('.' + ins.CLASS_VALUE).each(function () {
            if ($bean.isEmpty($.trim($(this).html()))) {
                $(this).addClass(ins.CLASS_NULL);
                $(this).html(ins.DATA_NULL);
            }
        });
    }

    return ins;
})(window, jQuery);

var JElementUtil = (function (window, $) {
    var ins = {};
    ins.distanceRight = function (element) {
        return ($(window).width() - ($(element).offset().left + $(element).outerWidth()));
    }

    ins.resizeTextArea = function () {
        $(document).ready(function () {
            $('textarea[auto-height="true"]').each(function () {
                $(this).height($(this).prop('scrollHeight'));
            });
        });
    }
    return ins;
})(window, jQuery);

var JPrettyPopin = (function (window, $) {
    var ins = {};
    ins.closeOverlay = function () {
        $('[id=overlay]').remove();
    }
    return ins;
})(window, jQuery);

var JQuickAction = (function (window, $) {
    var ins = {};
    ins.QUICK_INSERT_WORKING = '/goalWorking?quickInsertGoalWorking';
    ins.QUICK_INSERT_GOAL = '/goal?quickInsertGoal';
    // if current page's insert goalworking or goal, hiden quick insert (goal or goalworking) link action.
    ins.hiddenLink = function (action) {
        var url = window.location.href;
        if (url.indexOf(action) != -1) {
            $('a[href="' + JCommonUtil.convertUrl(ins.QUICK_INSERT_WORKING).replace(JGlobal.contextRoot + '/', '') + '"][data-rel="prettyPopin"]').remove();
            $('a[href="' + JCommonUtil.convertUrl(ins.QUICK_INSERT_GOAL).replace(JGlobal.contextRoot + '/', '') + '"][data-rel="prettyPopin"]').remove();
        }
    }
    return ins;
})(window, jQuery);

var JCustomField = (function (window, $) {
    var ins = {};
    ins.DATA_TYPE_STRING = 'string';
    ins.DATA_TYPE_TEXT = 'text';
    ins.DATA_TYPE_LIST = 'list';
    ins.DATA_TYPE_MULTI = 'multi';
    ins.DATA_TYPE_BOOLEAN = 'boolean';
    ins.DATA_TYPE_INTEGER = 'integer';
    ins.DATA_TYPE_FLOAT = 'float';
    ins.DATA_TYPE_DATE = 'date';
    ins.DATA_TYPE_DATETIME = 'datetime';

    ins.HTML_TYPE_INPUT = 'input';
    ins.HTML_TYPE_SELECT = 'select';
    ins.HTML_TYPE_UL = 'ul';
    ins.HTML_TYPE_DATE = 'date';
    ins.HTML_TYPE_DATETIME = 'datetime';

    ins.DATA_BOOLEAN_TRUE = 'true';
    ins.DATA_BOOLEAN_FALSE = 'false';

    ins.ITEM_TYPE_OPTION = 'option';
    ins.ITEM_TYPE_TAGIT = 'tagit';

    ins.TAGIT_DATA = null;
    ins.DEFAULT_VALUE_NAME = null;

    ins.DEFAULT_VALUE_HTML_SELECT = '<i class="icon-prepend fa fa-list"></i>' +
        '<select id="bean_defaultValue" name="{name}" class="common3"></select>';
    ins.DEFAULT_VALUE_HTML_DATE = '<i class="icon-prepend fa fa-calendar"></i>' +
        '<input type="text" id="bean_defaultValue" name="{name}" class="common3"/>';
    ins.DEFAULT_VALUE_HTML_UL = '<ul id="bean_defaultValue" class="common3"></ul>';
    ins.DEFAULT_VALUE_HTML_INPUT = '<input type="text" id="bean_defaultValue" name="{name}" class="common3"/>' +
        '<i class="input"></i>';
    ins.DEFAULT_VALUE_HTML_TEXTAREA = '<textarea id="bean_defaultValue" name="{name}" class="common3"></textarea>';

    ins.dataTypeChange = function (element) {
        var dataType = $(element).val();
        var defaultValue = $('#bean_defaultValue').val();
        if (dataType == ins.DATA_TYPE_DATE) {
            $('#bean_objectCategoryId').parents('.trow').addClass('hide');
            ins.changeDefaultValue(ins.HTML_TYPE_DATE);
            $('#bean_defaultValue').val(defaultValue);
        } else if (dataType == ins.DATA_TYPE_DATETIME) {
            $('#bean_objectCategoryId').parents('.trow').addClass('hide');
            ins.changeDefaultValue(ins.HTML_TYPE_DATETIME);
            $('#bean_defaultValue').val(defaultValue);
        } else if (dataType == ins.DATA_TYPE_LIST) {
            $('#bean_objectCategoryId').parents('.trow').removeClass('hide');
            var defaultObj = $('#bean_objectCategoryId').val();
            ins.loadObjectCategoryList(defaultObj);
            ins.changeDefaultValue(ins.HTML_TYPE_SELECT);
            setTimeout(function () {
                ins.loadObjectCategoryItems(ins.ITEM_TYPE_OPTION, defaultValue, ins.DEFAULT_VALUE_NAME);
                $('#bean_defaultValue').val(defaultValue);
            }, 150);
        } else if (dataType == ins.DATA_TYPE_MULTI) {
            $('#bean_objectCategoryId').parents('.trow').removeClass('hide');
            var defaultObj = $('#bean_objectCategoryId').val();
            ins.loadObjectCategoryList(defaultObj);
            ins.changeDefaultValue(ins.HTML_TYPE_UL);
            setTimeout(function () {
                ins.loadObjectCategoryItems(ins.ITEM_TYPE_TAGIT, defaultValue, ins.DEFAULT_VALUE_NAME);
                $('#bean_defaultValue').val(defaultValue);
            }, 150);
        } else if (dataType == ins.DATA_TYPE_FLOAT) {
            $('#bean_objectCategoryId').parents('.trow').addClass('hide');
            ins.changeDefaultValue(ins.HTML_TYPE_INPUT);
            $('#bean_defaultValue').val(defaultValue);
        } else if (dataType == ins.DATA_TYPE_INTEGER) {
            $('#bean_objectCategoryId').parents('.trow').addClass('hide');
            ins.changeDefaultValue(ins.HTML_TYPE_INPUT);
            $('#bean_defaultValue').val(defaultValue);
        } else if (dataType == ins.DATA_TYPE_STRING) {
            $('#bean_objectCategoryId').parents('.trow').addClass('hide');
            ins.changeDefaultValue(ins.HTML_TYPE_INPUT);
            $('#bean_defaultValue').val(defaultValue);
        } else if (dataType == ins.DATA_TYPE_TEXT) {
            $('#bean_objectCategoryId').parents('.trow').addClass('hide');
            ins.changeDefaultValue(ins.HTML_TYPE_INPUT);
            $('#bean_defaultValue').val(defaultValue);
        } else if (dataType == ins.DATA_TYPE_BOOLEAN) {
            $('#bean_objectCategoryId').parents('.trow').addClass('hide');
            ins.changeDefaultValue(ins.HTML_TYPE_SELECT);
            var html = '<option value="">' + JCommonUtil.message('common.select', 'common') + '</option>';
            html += '<option value="' + ins.DATA_BOOLEAN_TRUE + '">' + JCommonUtil.message('common.true', 'common') + '</option>';
            html += '<option value="' + ins.DATA_BOOLEAN_FALSE + '">' + JCommonUtil.message('common.false', 'common') + '</option>';
            $('#bean_defaultValue').html(html);
            $('#bean_defaultValue').val(defaultValue);
        }
    }
    ins.loadObjectCategoryList = function (defaultValue) {
        var url = JCommonUtil.convertUrl('/objectCategory?list&typeAction=ajax');
        $.ajax({
            type: 'GET',
            url: JCommonUtil.getUrlAjax(url),
            success: function (data) {
                if (data.indexOf(ERROR_PREFIX) >= 0) {
                    JCommonUtil.alertError({message: data});
                } else {
                    data = JSON.parse(data);
                    var html = '';
                    for (var i = 0; i < data.length; i++) {
                        html += '<option ' + (defaultValue == data[i].id ? 'selected' : '') + ' value="' + data[i].id + '">' + data[i].name + '</option>';
                    }
                    $('#bean_objectCategoryId').html(html);
                }
            }
        });
    }
    ins.loadObjectCategoryItems = function (itemType, defaultValue, name) {
        var url = JCommonUtil.convertUrl('/objectCategory?loadItem&typeAction=ajax&bean.parentId=' + $('#bean_objectCategoryId').val());
        $.ajax({
            type: 'GET',
            url: JCommonUtil.getUrlAjax(url),
            success: function (data) {
                if (data.indexOf(ERROR_PREFIX) >= 0) {
                    JCommonUtil.alertError({message: data});
                } else {
                    data = JSON.parse(data);
                    if (itemType == ins.ITEM_TYPE_OPTION) {
                        var html = '<option value="">' + JCommonUtil.message('common.select', 'common') + '</option>';
                        for (var i = 0; i < data.length; i++) {
                            html += '<option ' + (defaultValue == data[i].id ? 'selected' : '') + ' value="' + data[i].id + '">' + data[i].name + '</option>';
                        }
                        $('#bean_defaultValue').html(html);
                        ''
                    } else if (itemType == ins.ITEM_TYPE_TAGIT) {
                        ins.buildTagit('bean_defaultValue', name + 's', data, defaultValue);
                    }
                }
            }
        });
    }
    ins.changeObjectCategory = function () {
        var type = $('#bean_dataType').val() == ins.DATA_TYPE_MULTI ? ins.ITEM_TYPE_TAGIT : ins.ITEM_TYPE_OPTION;
        var defaultValue = $('#bean_defaultValue').val();
        ins.loadObjectCategoryItems(type, defaultValue, ins.DEFAULT_VALUE_NAME);
    }
    ins.changeDefaultValue = function (type) {
        var validationset = document.getElementById('bean_defaultValue').validationset;
        var validatorobj = document.getElementById('bean_defaultValue').validatorobj;
        if (type == ins.HTML_TYPE_INPUT) {
            $('#bean_defaultValue').parent().html(ins.DEFAULT_VALUE_HTML_INPUT.replace('{name}', ins.DEFAULT_VALUE_NAME));
            $('#bean_defaultValue').parent().removeClass('select input-calendar').removeClass('trow-complex').addClass('input');
        } else if (type == ins.HTML_TYPE_SELECT) {
            $('#bean_defaultValue').parent().html(ins.DEFAULT_VALUE_HTML_SELECT.replace('{name}', ins.DEFAULT_VALUE_NAME));
            $('#bean_defaultValue').parent().removeClass('input input-calendar').removeClass('trow-complex').addClass('select');
        } else if (type == ins.HTML_TYPE_UL) {
            $('#bean_defaultValue').parent().html(ins.DEFAULT_VALUE_HTML_UL.replace('{name}', ins.DEFAULT_VALUE_NAME));
            $('#bean_defaultValue').parent().removeClass('select input-calendar').addClass('input trow-complex');
        } else if (type == ins.HTML_TYPE_DATE) {
            $('#bean_defaultValue').parent().html(ins.DEFAULT_VALUE_HTML_DATE.replace('{name}', ins.DEFAULT_VALUE_NAME));
            $('#bean_defaultValue').parent().removeClass('select').addClass('input input-calendar');
            $("#bean_defaultValue").datepicker();
        } else if (type == ins.HTML_TYPE_DATETIME) {
            $('#bean_defaultValue').parent().html(ins.DEFAULT_VALUE_HTML_DATE.replace('{name}', ins.DEFAULT_VALUE_NAME));
            $('#bean_defaultValue').parent().removeClass('select').addClass('input input-calendar');
            $("#bean_defaultValue").datetimeminutepicker();
        }
        if ($bean.isNotEmpty(validationset)) {
            validationset.updateValidationSet(null, document.getElementById('bean_defaultValue'), null);
        }
        document.getElementById('bean_defaultValue').validationset = validationset;
        document.getElementById('bean_defaultValue').validatorobj = validatorobj;
    }
    ins.buildTagit = function (id, name, data, defaultValue) {
        ins.TAGIT_DATA = [];
        for (var i = 0; i < data.length; i++) {
            var item = {};
            item.labelValue = data[i].name;
            item.label = data[i].name;
            item.hiddenName = data[i].id;
            ins.TAGIT_DATA.push(item);
        }
        if ($('#' + id).hasClass('tagit')) {
            $('#' + id).tagit('destroy');
        }
        $('#' + id).tagit({
            autocomplete: {
                delay: 0,
                minLength: 0,
                source: ins.TAGIT_DATA,
                create: function () {
                    $(this).data('uiAutocomplete')._renderItem = function (ul, item) {
                        return $('<li>')
                            .append('<a>' + item.labelValue + '</a>')
                            .appendTo(ul);
                    };
                }
            },
            fieldName: name,
            showAutocompleteOnFocus: true,
            singleField: false,
            allowSpaces: true,
            allowDuplicates: false,
            removeConfirmation: true
        });
        if ($bean.isNotEmpty(defaultValue)) {
            defaultValue = defaultValue.trim();
            var values = defaultValue.split(',');
            for (var i = 0; i < values.length; i++) {
                $('#' + id).tagit('createTag', values[i]);
            }
            setTimeout(function () {
                $('ul.tagit-autocomplete').hide();
            }, 50);
        }
        if ($('#' + id).attr('required') == 'required') {
            var validateForm = $('#' + id).attr('validateform');
            if ($bean.isNotEmpty(validateForm)) {
                window[validateForm].addFunctionValidate(function () {
                    if ($('*[name="' + name + '"]').length == 0) {
                        $('#' + id).showError('error.object.required', 'error', $('#' + id).attr('attrname'));
                        return false;
                    }
                    return true;
                });
            }
        }
    }

    return ins;
})(window, jQuery);

var JEasyPieChart = (function (window, $) {
    var ins = {};
    ins.draw = function (container) {
        var $container = $(container);
        var $easyChartList;
        if ($bean.isNotEmpty($container)) {
            if ($container.hasClass('easyPieChart')) {
                $easyChartList = $container;
            } else {
                $easyChartList = $container.find('.easyPieChart');
            }
        } else {
            $easyChartList = $('.easyPieChart');
        }
        $easyChartList.each(function () {
            var $chart = $(this);
            if ($chart.find('canvas').length == 0) {
                var barColor = $chart.css('color') || $chart.data('pie-color'),
                    trackColor = $chart.data('pie-track-color') || 'rgba(0,0,0,0.04)',
                    size = parseInt($chart.data('pie-size')) || 25;
                $chart.easyPieChart({
                    barColor: barColor,
                    trackColor: trackColor,
                    scaleColor: false,
                    lineCap: 'butt',
                    lineWidth: parseInt(size / 8.5),
                    animate: 150,
                    rotate: -90,
                    size: size,
                    onStep: function (from, to, percent) {
                        $(this.el).find('.percent').text(Math.round(percent));
                    }

                });
                $chart = null;
            } else {
                if ($bean.isEmpty($chart.data('easyPieChart'))) {
                    return;
                }
                var color = $chart.css('color');
                var percent = $chart.attr('data-percent');
                if ($bean.isNotEmpty(color)) {
                    $chart.data('easyPieChart').options.barColor = color;
                }
                if ($bean.isNotEmpty(percent)) {
                    $chart.data('easyPieChart').update(percent);
                }
            }
        });
    }
    return ins;
})(window, jQuery);

var JNiceScroll = (function (window, $) {
    var ins = {};
    ins.fixSetBody = function (target) {
        target.body = $("body > .body-wrapper > .ly-wrap");
    }
    return ins;
})(window, jQuery);

var JFullcalendar = (function (window, $) {
    var ins = {};
    ins.montNames = 'Tháng 1_Tháng 2_Tháng 3_Tháng 4_Tháng 5_Tháng 6_Tháng 7_Tháng 8_Tháng 9_Tháng 10_Tháng 11_Tháng 12';
    ins.dayNames = 'Chủ Nhật_Thứ Hai_Thứ Ba_Thứ Tư_Thứ Năm_Thứ Sáu_Thứ Bảy';
    return ins;
})(window, jQuery);

var JTabs = (function (window, $) {
    var ins = {};
    ins.focusTab = function (obj) {
        var tabId = $(obj).attr('data-tab');
        var $container = $(obj).closest('.tabs-container');
        $container.find('.tab-link').removeClass('tab-current');
        $container.find('.tab-content').removeClass('tab-current');
        $(obj).addClass('tab-current');
        $container.find('[data-tab-content="' + tabId + '"]').addClass('tab-current');
    };
    return ins;
})(window, jQuery);
