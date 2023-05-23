var App = {
    loadPartial: function (url, params, resultEl) {
        AjaxHelper.ajaxCall(url, params, function (result) {
            $(resultEl).html(result);
        });
    },
    loadPartialCallback: function (url, params, resultEl,callback) {
        AjaxHelper.ajaxCall(url, params, function (result) {
            $(resultEl).html(result);
            callback();
        });
    },
    loadPartialAppend: function (url, params, resultEl) {
         AjaxHelper.ajaxCall(url, params, function (result) {
             $(resultEl).append(result);
             if (callback != undefined)
                 callback();
        });
    },
    loadPartialAppendCallback: function (url, params, resultEl,callback) {
        AjaxHelper.ajaxCall(url, params, function (result) {
            $(resultEl).append(result);
            if (callback != undefined)
                callback();
        });
    },
}