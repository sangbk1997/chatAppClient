var JFormUtil = (function (window, $) {
    var ins = {};
    ins.changePage = function (page, theForm, method) {
        var oForm = theForm || document.forms[0];
        oForm.reset();
        if (method) {
            oForm["m"].value = method;
        }
        oForm.page.value = page;
        SUBMIT_FORM = true;
        oForm.submit();
    }
    ins.changePageAjax = function (page, action, form, container) {
        $(form).find('[name="page"]').val(page);
        $.ajax({
            url: JCommonUtil.getUrlAjax(JCommonUtil.convertUrl(action)),
            data: $(form).serialize(),
            success: function (data) {
                if (data) {
                    if (data.indexOf('@error:') == 0) {
                        $.quickMsg.setParams({
                            error: data.substring("@error:".length)
                        });
                    } else {
                        $(container).html(data);
                    }
                }
                $.quickMsg.show('msg-box');
            },
            complete: function () {
                removeLyLoading(container);
            }
        });
    }
    ins.changeRangePage = function (startRow, maxRow, theForm, method) {
        var oForm = theForm || document.forms[0];
        oForm.reset();
        if (method) {
            oForm["m"].value = method;
        }
        oForm["startRow"].value = Math.round((startRow - 1) / maxRow) * maxRow + 1;
        oForm["maxRow"].value = maxRow;
        oForm.submit();
    }
    ins.clearFormSearchTargit = function (theForm) {
        $('#company').tagit('removeAll');
        ins.clearForm(theForm);
    }
    ins.clearForm = function (oForm) {
        var elements = oForm.elements;
        //oForm.reset();
        if ($("div[contenteditable=true]").length > 0) {
            $("div[contenteditable=true]").text("");
        }
        for (var i = 0; i < elements.length; i++) {
            if ((elements[i].disabled == false) && (elements[i].readOnly != true) && (elements[i].className.indexOf("noclear") == -1)) {
                if (elements[i].type) {
                    var field_type = elements[i].type.toLowerCase();
                    switch (field_type) {
                        case "text":
                        case "password":
                        case "textarea":
                            elements[i].value = "";
                            break;
                        case "radio":
                        case "checkbox":
                            if (elements[i].checked) {
                                elements[i].checked = false;
                                if (elements[i].id) {
                                    if ($("#" + elements[i].id + "_hidden")) {
                                        $("#" + elements[i].id + "_hidden").val(false);
                                    }
                                }
                            }
                            break;
                        case "hidden":
                            if ($('#' + elements[i].id).attr('reset-mode')) {
                                elements[i].value = "";
                            }
                        default :
                            break;
                    }
                }
            }
        }
    }
    ins.getForm = function (obj) {
        return $(obj).closest("form");
    }
    ins.checkboxBoolean = function (divId, obj) {
        if ($("#" + divId)) {
            $("#" + divId).val(obj.checked);
        }
        var $inputHidden = $("#" + divId + "_hidden");
        if ($inputHidden) {
            $inputHidden.val($inputHidden.val() != "true");
        }
    }
    ins.checkValidMark = function (theForm) {
        var _form = theForm || document.forms[0];
        var inputs = _form.getElementsByClassName("mark-input");
        if (!inputs || inputs.length < 1) {
            return false;
        }
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].value.indexOf(".") != -1 || isNaN(inputs[i].value.replace(',', '.'))) {
                JCommonUtil.alert({
                    messageType: JCommonUtil.MESSAGE_TYPE_WARNING,
                    message: JCommonUtil.message("error.float.invalid")
                });
                inputs[i].focus();
                return false;
            }
        }
        return true;
    }

    //Check validate input float on form
    //appendMes đã được sử dụng : "target","value"
    ins.checkValidFloat = function (formId, inputClass, precision, appendMes) {
        if ($('#' + formId + ' .' + inputClass).length == 0) {
            //trường hợp chỉ có chu kỳ bị disabled
            return true;

        }
        var ok = true;
        $('#' + formId + ' .' + inputClass).each(function () {
            if ($bean.isNotEmpty($(this).val()) && !JMath.isFloatLocale($(this).val())) {
                JCommonUtil.alert({
                    messageType: JCommonUtil.MESSAGE_TYPE_WARNING,
                    message: JCommonUtil.message("error.goal.kpi.input.float.invalid." + appendMes)
                });
                ok = false;
            } else if (JGlobal.language == LOCALE_VI && $(this).val().indexOf(',') != -1 && $(this).val().indexOf(',') < ($(this).val().length - (precision * 1 + 1))) {
                JCommonUtil.alert({
                    messageType: JCommonUtil.MESSAGE_TYPE_WARNING,
                    message: JCommonUtil.message("error.goal.kpi.input.float.precision.invalid." + appendMes, "error", precision)
                });
                ok = false;
            } else if (JGlobal.language != LOCALE_VI && $(this).val().indexOf('.') != -1 && $(this).val().indexOf(',') < ($(this).val().length - (precision * 1 + 1))) {
                JCommonUtil.alert({
                    messageType: JCommonUtil.MESSAGE_TYPE_WARNING,
                    message: JCommonUtil.message("error.goal.kpi.input.float.precision.invalid." + appendMes, "error", precision)
                });
                ok = false;
            }
            if (!ok) {
                $(this).focus();
                return ok;
            }
        });
        return ok;
    }

    ins.checkValidFloatLocale = function (formId, inputClass) {
        if ($('#' + formId + ' .' + inputClass).length == 0) {
            return false;
        }
        var ok = true;
        $('#' + formId + ' .' + inputClass).each(function () {
            if ($bean.isNotEmpty($(this).val()) && !JMath.isFloatLocale($(this).val())) {
                JCommonUtil.alert({
                    messageType: JCommonUtil.MESSAGE_TYPE_WARNING,
                    message: JCommonUtil.message("error.float.invalid")
                });
                JCommonUtil.animateFocus($(this), null, null, null, JCommonUtil.ERROR_BG);
                ok = false;
                return ok;
            }
        });
        return ok;
    }

    //Check validate input priority on table
    ins.checkValidPriority = function (theForm) {
        var _form = theForm || document.forms[0];
        var inputs = _form.getElementsByClassName("priority-input");
        if (!inputs || inputs.length < 1) {
            return false;
        }
        for (var i = 0; i < inputs.length; i++) {
            if (isNaN(inputs[i].value)) {
                if (inputs[i].value.indexOf(",") != -1) {
                    var temp = inputs[i].value.replace(',', '.');
                    if (isNaN(temp)) {
                        JCommonUtil.alert({
                            messageType: JCommonUtil.MESSAGE_TYPE_WARNING,
                            message: JCommonUtil.message("error.priority.invalid")
                        });
                    } else {
                        JCommonUtil.alert({
                            messageType: JCommonUtil.MESSAGE_TYPE_WARNING,
                            message: JCommonUtil.message("error.priority.outrange")
                        });
                    }
                } else {
                    JCommonUtil.alert({
                        messageType: JCommonUtil.MESSAGE_TYPE_WARNING,
                        message: JCommonUtil.message("error.priority.invalid")
                    });
                }
                inputs[i].focus();
                return false;
            } else if (parseInt(inputs[i].value) > 9999 || parseInt(inputs[i].value) < 0 || inputs[i].value.indexOf("-") != -1 || inputs[i].value.indexOf(".") != -1) {
                JCommonUtil.alert({
                    messageType: JCommonUtil.MESSAGE_TYPE_WARNING,
                    message: JCommonUtil.message("error.priority.outrange")
                });
                inputs[i].focus();
                return false;
            }
        }
        return true;
    }
    ins.updateHashMap = function (e, _thisLink, url, funcValidate) {
        e.stopPropagation();
        var $form = $(_thisLink).parents('form');
        var idContainer = $(_thisLink).attr('dataRel');
        var url = JCommonUtil.convertUrl(url);
        if ($.isFunction(funcValidate) && !funcValidate($form, idContainer)) {
            return false;
        }
        $('#' + idContainer).prepend(lyLoading());
        if ($bean.isNotEmpty($form)) {
            $.ajax({
                url: JCommonUtil.getUrlAjax(url),
                data: $form.serialize(),
                success: function (data) {
                    if (data) {
                        if (data.indexOf('@error:') == 0) {
                            $.quickMsg.setParams({
                                error: data.substring("@error:".length)
                            });
                        } else {
                            $('#' + idContainer).html(data);
                        }
                    }
//                    $.quickMsg.show('msg-box');
                    $.quickMsg.show(idContainer);
                },
                complete: function () {
                    removeLyLoading('#' + idContainer);
                }
            });
        }
        return false;
    }
    ins.submitForm = function (form, action) {
        form.m.value = action;
        form.submit();
    }

    ins.commonAjax = function (url, panel, container, form) {
        $(container).prepend(lyLoading());
        $.ajax({
            data: $bean.isNotEmpty(form) ? $(form).serialize() : '',
            url: JCommonUtil.getUrlAjax(url),
            success: function (data) {
                if (data) {
                    $(panel).html(data);
                }
            }
        }).done(function () {
            removeLyLoading(container);
        });
    }

    ins.buildUrlFromBackup = function (backup) {
        var urlPart = "";
        $(backup).each(function () {
            var data = $(this).data();
            var keyNames = Object.keys(data);
            for (var i in keyNames) {
                urlPart += "&{0}={1}".format(keyNames[i], data[keyNames[i]]);
            }
        });
        return urlPart;
    }

    ins.focusFirstInput = function ($target) {
        $target.find('*:input[type!=hidden]:first').focus();
    }

    ins.doInsertDialog = function (form, event, callback) {
        event.preventDefault();
        event.stopPropagation();
        if (form.onsubmit()) {
            var $form = $(form);
            var $dialog = $form.parent('.app-dlg');
            var $dialogBody = $dialog.find('.dlg-body');
            var $dialogContent = $dialogBody.find('.tform');
            $dialog.prepend(lyLoading());
            $form.ajaxForm({
                success: function (data) {
                    if (data) {
                        var $errorMsg = $('#error-msg');
                        if (data.indexOf('@error:') == 0 && $errorMsg) {
                            ins.showBoxMessage($dialogContent, "error", data.substring('@error:'.length), 3);
                        } else {
                            var obj = JSON.parse(data);
                            ins.showBoxMessage($dialogContent, "success", obj.resultMsg, 3);
                            $dialog.find('.toggle-hide').toggleClass('hide');
                            if (callback) {
                                if ($bean.isNotEmpty(data.data) && $bean.isString(data.data)) {
                                    data.data = JSON.parse(data.data);
                                }
                                callback(data.data);
                            }
                        }
                    }
                    removeLyLoading();
                }
            }).submit();
        }
    }
    ins.reInsert = function (form) {
        ins.deleteBoxMessage($(form));
        $(form).find('.toggle-hide').toggleClass('hide');
        $(form).find('input[name][type!="hidden"]').not('.hasDatepicker').val('');
        return false;
    }
    /*
     * ThangTV  - 30/05/2016
     * $obj: $Div cha chứa box message
     * typeMsg: Kiểu message (error, success, warning, info
     * msg: Message hiển thị
     * posShow: Vị trí hiển thị (0: prepend, 1: append, 2: html, 3: insertBefore)
     * */
    ins.showBoxMessage = function ($obj, typeMsg, msg, posShow) {
        var $boxMsg = $obj.find('.js-show-msg');
        if ($boxMsg.length > 0) {
            $boxMsg.remove();
        }
        posShow = posShow | 0;
        $boxMsg = '<div ' + (posShow == 3 ?'style="margin-top:12px"' : '') + ' class="js-show-msg box-confirm bg-' + typeMsg + '"><p>' + msg + '</p></div>';
        if (posShow == 0) {
            $obj.prepend($boxMsg);
        } else if (posShow == 1) {
            $obj.append($boxMsg);
        } else if (posShow == 2) {
            $obj.html($boxMsg);
        } else if (posShow == 3) {
            $($boxMsg).insertBefore($obj);
        }
    }
    ins.deleteBoxMessage = function ($obj) {
        var $boxMsg = $obj.find('.js-show-msg');
        if ($boxMsg.length > 0) {
            $boxMsg.remove();
        }
    }
    
    ins.showHideDiv = function(id, btnClick) {
        var divHideShow = document.getElementById(id);
        btnClick.classList.remove('less');
        var check = divHideShow.style.display;
        if (check === 'none' || check === '') {
            btnClick.className += ' less';
            divHideShow.style.display = 'block';
        } else {
            divHideShow.style.display = 'none';
        }
        return;
    }
    ins.setRapFilter = function (form, rapId) {
        var preFilter = '.rap-filter-' + rapId;
        var filterTypes = $(preFilter + ' input');
        for (var i = 0; i < filterTypes.length; i++) {
            var filterType = $(filterTypes[i]);
            if (filterType.is(':checked')) {
                if (filterType.attr('class').indexOf('filter-type-employee') != -1) {
                    if ($(preFilter + " #emp-data-filter").children().length > 0) {
                        console.log(filterType.attr('name') + '=' + filterType.val());
                        form[filterType.attr('name')] = filterType.val();
                    }
                } else {
                    console.log(filterType.attr('name') + '=' + filterType.val());
                    if (filterType.attr('name')) {
                        form[filterType.attr('name')] = filterType.val();
                    }
                }
            }
        }
    }
    return ins;
})(window, jQuery);