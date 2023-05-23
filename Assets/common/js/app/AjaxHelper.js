var AjaxHelper = {
    ajaxCall: function (url, dataParams, callback) {
        $.ajax({
            cache: false,
            url: url,
            data: dataParams,
            success: function (data) {
                callback(data);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                //alert('Xảy ra lỗi khi tải dữ liệu');
            },
        });
    },
    ajaxCallWithBeforeSend: function (url, dataParams, beforeSend, callback) {
        $.ajax({
            cache: false,
            url: url,
            data: dataParams,
            beforeSend: function () {
                beforeSend();
            },
            success: function (data) {
                callback(data);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                //alert('Xảy ra lỗi khi tải dữ liệu');
            },
        });
    },
    ajaxCallFormSubmitWithBeforeSend: function (
        element,
        url,
        beforeSend,
        callback
    ) {
        var postData = $(element).serializeArray();
        $.ajax({
            url: url,
            cache: false,
            type: "POST",
            data: postData,
            beforeSend: function () {
                beforeSend();
            },
            success: function (data, textStatus, jqXHR) {
                callback(data);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                //alert('Xảy ra lỗi khi tải dữ liệu');
            },
        });
    },
    ajaxCallPost: function (url, postData, beforeSend, callback) {
        $.ajax({
            url: url,
            cache: false,
            type: "POST",
            data: postData,
            beforeSend: function () {
                beforeSend();
            },
            success: function (data, textStatus, jqXHR) {
                callback(data);
            },
            error: function (xhr, ajaxOptions, thrownError) { },
        });
    },
}