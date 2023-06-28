
$(document).on("click", ".a-btn-watch-list-code", function () {
    var code = $(this).attr("data-code");
    var inIframe = $('div').hasClass("wrap-iframe");
    if (inIframe)
        window.location.href = configCommonUrl.companyDetail + code;
    else
        window.parent.location.href = configCommonUrl.companyDetail + code;
});

$(document).on("click", ".a-btn-remove-item-watch-list", function () {
    var code = $(this).attr("data-code");
    var type = $(this).attr("data-type");
    if (type == 1) {
        CommonIndex.excludeCodeDefault(code, type);
    } else {
        CommonIndex.removeItemWatchList(code);
    }
    $(".li-watch-list-item-" + code).remove();
    CommonIndex.loadWatchList();
});

$(document).ready(function () {

    CommonIndex.loadHeaderIndex();
    var isMobile = $("body").hasClass("mobile");
    if (!isMobile) {
        CommonIndex.loadHeaderNews();

        CommonIndex.loadHeaderExchanegRate();
        CommonIndex.loadWatchList();
        CommonIndex.loadDataChartHeader();
    } else {
        CommonIndex.loadDataChartHeaderMobile("chart-VnIndex", "VN-Index");
        CommonIndex.loadDataChartHeaderMobile("chart-HnxIndex", "HNX-Index");
        CommonIndex.loadDataChartHeaderMobile("chart-UpcomIndex", "UPCOM-Index");
        CommonIndex.loadDataChartWorldMobile("DJI");
        CommonIndex.loadDataChartWorldMobile("N225");
        CommonIndex.loadDataChartWorldMobile("HSI");
    }
    setTimeout(() => {
        CommonIndex.bindHeaderSearchBox();
    }, 2000);

});

setInterval(() => {
    var code = $('#hd-header-select-code').val();
    if (code == "VN-Index" || code == "HNX-Index" || code == "UPCOM-Index") {
        var isMobile = $("body").hasClass("mobile");
        if (!isMobile) {
            CommonIndex.loadDataChartHeader();
        }
    }
    else
        CommonIndex.loadDataChartWorld(code);

    CommonIndex.loadHeaderIndex();
    var isMobile = $("body").hasClass("mobile");
    if (isMobile) {
        CommonIndex.loadDataChartHeaderMobile("chart-VnIndex", "VN-Index");
        CommonIndex.loadDataChartHeaderMobile("chart-HnxIndex", "HNX-Index");
        CommonIndex.loadDataChartHeaderMobile("chart-UpcomIndex", "UPCOM-Index");
    } else {
        CommonIndex.loadWatchList();

    }

}, 60 * 1000);
setInterval(() => {
    var isMobile = $("body").hasClass("mobile");
    if (!isMobile) {
        CommonIndex.loadHeaderNews();
    }
}, 3 * 60 * 1000);

setInterval(() => {
    var isMobile = $("body").hasClass("mobile");
    if (!isMobile) {
        CommonIndex.loadHeaderExchanegRate();
    }
}, 15 * 60 * 1000);

$(document).on("keyup", ".txt-keyword-header, .txt-keyword-header-mobile", function (e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13) {
        var data = $(this).val();
        var inIframe = $('body').hasClass("wrap-iframe");
        if (inIframe)
            window.parent.location.href = "https://nguoiquansat.vn/search?q=" + data;
        else
            window.location.href = "https://nguoiquansat.vn/search?q=" + data;

    }
});
$(document).on("click", ".btn-header-search", function () {
    var data = $(".txt-keyword-header").val();
    if (data == "")
        return;
    var inIframe = $('body').hasClass("wrap-iframe");
    if (inIframe)
        window.parent.location.href = "https://nguoiquansat.vn/search?q=" + data;
    else
        window.location.href = "https://nguoiquansat.vn/search?q=" + data;
});

$(document).on("click", ".btn-header-mobile-search", function () {
    var data = $(".txt-keyword-header-mobile").val();
    if (data == "")
        return;
    var inIframe = $('body').hasClass("wrap-iframe");
    if (inIframe)
        window.parent.location.href = "https://nguoiquansat.vn/search?q=" + data;
    else
        window.location.href = "https://nguoiquansat.vn/search?q=" + data;
});


$(document).on("click", ".a-btn-show-popup-watch-list", function () {
    $('.watch-list-modal').modal('show');
    CommonIndex.loadWatchList();
    setTimeout(() => {
        CommonIndex.loadCompany("", 0, 0, function (result) {
            if (result.ErrCode != "01") {

                $('#txt-keyword').autocomplete({
                    source: result.DataList,
                    highlightClass: 'text-danger',
                    maximumItems: 10,
                    treshold: 1,
                    value: "Code",
                    label: "Name",
                    onSelectItem: function (item, element) {
                        CommonIndex.saveWatchList({ Code: item.value, Name: item.label });
                        CommonIndex.loadWatchList();
                    }
                });
            }
        });
    }, 1000);
});

$(document).on("click", ".li-header-select", function () {
    var code = $(this).attr("data-code");
    var codeSelected = $('#hd-header-select-code').val();
    if (code != codeSelected) {
        $('ul.chiso li.active').removeClass("active");
        $(this).addClass("active");
        $('#hd-header-select-code').val(code);
        if (code == "VN-Index" || code == "HNX-Index" || code == "UPCOM-Index")
            CommonIndex.loadDataChartHeader();
        else
            CommonIndex.loadDataChartWorld(code);
    }
});