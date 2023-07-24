

$(document).ready(function () {

    $(document).on("click", ".a-btn-watch-list-code", function () {
        var code = $(this).attr("data-code");
        var inIframe = $('body').hasClass("wrap-iframe");
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
            CommonIndex.removeItemWatchList(code);
        } else {
            CommonIndex.removeItemWatchList(code);
        }
        $(".li-watch-list-item-" + code).remove();
        CommonIndex.loadWatchList();
    });

    var isMobile = $("body").hasClass("mobile");
    if (!isMobile) {
        CommonIndex.loadHeaderIndex();
        CommonIndex.loadHeaderNews();
        CommonIndex.bindHeaderSearchBox();
        CommonIndex.loadHeaderExchanegRate();
        CommonIndex.loadWatchList();
        CommonIndex.loadDataChartHeader();
    } else {
        var inIframe = $('body').hasClass("wrap-iframe");
        if (!inIframe) {
            CommonIndex.loadHeaderIndex();
            CommonIndex.loadDataChartHeaderMobile("chart-VnIndex", "VN-Index");
            CommonIndex.loadDataChartHeaderMobile("chart-HnxIndex", "HNX-Index");
            CommonIndex.loadDataChartHeaderMobile("chart-UpcomIndex", "UPCOM-Index");
            CommonIndex.loadDataChartWorldMobile("DJI");
            CommonIndex.loadDataChartWorldMobile("N225");
            CommonIndex.loadDataChartWorldMobile("HSI");
        }
    }

    if (CommonHelper.isInTransactionTime()) {
        setInterval(() => {
            var isMobile = $("body").hasClass("mobile");

            if (!isMobile) {
                var code = $('#hd-header-select-code').val();
                if (code == "VN-Index" || code == "HNX-Index" || code == "UPCOM-Index") {
                    CommonIndex.loadDataChartHeader();
                }
                else
                    CommonIndex.loadDataChartWorld(code);

                CommonIndex.loadHeaderIndex();
                CommonIndex.loadWatchList();
            } else {
                CommonIndex.loadDataChartHeaderMobile("chart-VnIndex", "VN-Index");
                CommonIndex.loadDataChartHeaderMobile("chart-HnxIndex", "HNX-Index");
                CommonIndex.loadDataChartHeaderMobile("chart-UpcomIndex", "UPCOM-Index");
                CommonIndex.loadDataChartWorldMobile("DJI");
                CommonIndex.loadDataChartWorldMobile("N225");
                CommonIndex.loadDataChartWorldMobile("HSI");
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
    }
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
        if (data == "" || data == null || data == undefined)
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


    $(document).on("click", ".txt-keyword-header-mobile", function () {
        $.fn.modal.Constructor.prototype.enforceFocus = function () { };
        $('.search-modal').modal('show');
        CommonIndex.bindHeaderSearchBox();
        CommonIndex.bindHeaderThuatNguSearchBox();
    });

    $(document).on('keyup', '.select2-search__field', function (e) {
        if (e.which === 13) {
            var inIframe = $('body').hasClass("wrap-iframe");
            var text = $(this).val();
            if (text != "" && text != null) {
                if (inIframe)
                    window.parent.location.href = "https://nguoiquansat.vn/search?q=" + text;
                else
                    window.location.href = "https://nguoiquansat.vn/search?q=" + text;
            }
        }
    });
});

