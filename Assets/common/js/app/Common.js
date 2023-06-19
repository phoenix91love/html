
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

var CommonIndex = {
    loadCompany: function (exCode, includeExCode, includePerson, callback) {
        var url = "";
        if (includePerson == 1)
            url = configHomeUrl.homeGetCompanyWithPerson;
        else
            url = configHomeUrl.homeGetCompanyWithoutPerson;
        var params = "includeExCode=" + includeExCode + "&exCode=" + exCode;
        AjaxHelper.ajaxCall(url, params, callback);
    },
    loadWatchList: function () {

        var inStorageExclude = localStorage.getItem("watch-list-default");
        var arrExclude = [];
        if (inStorageExclude) {
            arrExclude = inStorageExclude.split(',');
        }
        var inStorage = localStorage.getItem("watch-list");
        var arrCode = [];
        if (inStorage) {
            var arrData = $.parseJSON(inStorage);
            arrData.forEach(function (item) {

                arrCode.push(item.Code);
            });
        }

        var params = "code=" + arrCode.join(",");
        AjaxHelper.ajaxCall(configHomeUrl.homeGetWatchList, params, function (result) {
            $('li.wl, .watch-list-popup li').remove();
            let i = 0;
            result.forEach(function (item) {
                if (arrExclude.indexOf(item.Code) < 0) {
                    var cssColor = item.Change > 0 ? "green" : (item.Change < 0 ? "red" : "yellow");
                    var priceCssColor = item.Change > 0 ? "green" : (item.Change < 0 ? "red" : "black");
                    if (item.Type == 0) {
                        
                    } else {
                        if (i < 5) {
                            $('.watch-list').prepend('<li class="wl is-border-right" data-code="' + item.Code + '"><a target="_top" href="' + configCommonUrl.companyDetail + item.Code + '"><div><span class="unit">' + item.Code +
                                '</span><span class="' + priceCssColor + '">' + CommonHelper.formatNumber(item.Price, 2) + '</span></div><div><span class="' + cssColor + '">' + CommonHelper.formatNumber(item.Change, 2) + '</span><span class="' + cssColor + '">' + CommonHelper.formatNumber(item.PerChange, 2) + '%</span></div></li>');
                        }

                        $('.watch-list-popup').append('<li class="li-watch-list-item-' + item.Code + '"><span>' + (i + 1) + '</span><span><a target="_top" href="' + configCommonUrl.companyDetail + item.Code + '">' + item.Code + '</a></span><span>' + CommonHelper.formatNumber(item.Price, 2) +
                            '</span><span class="' + cssColor + '">' + CommonHelper.formatNumber(item.Change, 1) + '(' + CommonHelper.formatNumber(item.PerChange, 2) +
                            '%)</span><span><button class="a-btn-remove-item-watch-list" data-type="' + item.Type + '" data-code="' + item.Code + '" type="button"><i class="icon12-close"></i></button></span></li >');

                        i++;
                    }
                }
            });
        });
    },
    saveWatchList: function (item) {

        var inStorageExclude = localStorage.getItem("watch-list-default");
        if (inStorageExclude) {
            var arrExclude = inStorageExclude.split(',');
            var isInDefaultIndex = arrExclude.indexOf(item.Code);
            if (isInDefaultIndex >= 0) {
                arrExclude.splice(isInDefaultIndex, 1);
                localStorage.setItem("watch-list-default", arrExclude.join(","));
            }
        }

        var inStorage = localStorage.getItem("watch-list");
        var arrData = [];
        var index = -1;
        if (inStorage) {
            arrData = $.parseJSON(inStorage);
            index = arrData.findIndex(x => x.Code == item.Code);
            if (index < 0) {
                arrData.push(item);
            }

        } else {
            arrData.push(item);
        }
        if (index < 0) {
            localStorage.setItem("watch-list", JSON.stringify(arrData));
        }
        $("#txt-keyword").val("");
    },
    removeItemWatchList: function (code) {
        var inStorage = localStorage.getItem("watch-list");

        if (inStorage) {
            var arrData = $.parseJSON(inStorage);
            var index = arrData.findIndex(x => x.Code == code);
            if (index >= 0) {
                arrData.splice(index, 1);
                localStorage.setItem("watch-list", JSON.stringify(arrData));
            }
        }
    },
    excludeCodeDefault: function (code) {
        var inStorage = localStorage.getItem("watch-list-default");

        if (inStorage) {
            var arrData = inStorage.split(",");
            var index = arrData.findIndex(x => x == code);
            if (index < 0) {
                arrData.push(code);
                localStorage.setItem("watch-list-default", arrData.join(","));
            }
        } else {
            var arrData = [code];
            localStorage.setItem("watch-list-default", arrData.join(","));
        }
    },
    loadDataChartHeader: function () {
        var code = $('#hd-header-select-code').val();
        var el = "chart-header";
        var url = configHomeUrl.homeGetDataBy + "?type=DAY&code=" + code;
        var params = "";
        AjaxHelper.ajaxCall(url, params, function (result) {
            if (result.ErrCode != "01") {

                ChartHelper.renderChartIndex1(el,
                    code,
                    result.DataIndex,
                    result.DataVolume,
                    result.BasePrice,
                    result.MinPrice,
                    result.MaxPrice
                );
            }

        });
    },
    loadDataChartHeaderMobile: function (el, code) {
        var url = configHomeUrl.homeGetDataBy + "?type=DAY&code=" + code;
        var params = "";
        AjaxHelper.ajaxCall(url, params, function (result) {
            if (result.ErrCode != "01") {

                ChartHelper.renderChartIndex1(el,
                    code,
                    result.DataIndex,
                    result.DataVolume,
                    result.BasePrice,
                    result.MinPrice,
                    result.MaxPrice
                );
            }

        });
    },
    loadDataChartWorld: function (code) {
        //var code = $('#hd-header-select-code').val();
        var url = configHomeUrl.homeGetDataWorldBy;
        var params = "type=3MONTH&code=" + code;
        AjaxHelper.ajaxCall(url, params, function (result) {
            if (result.ErrCode != "01") {

                ChartHelper.renderChartIndex1("chart-header",
                    code,
                    result.DataIndex,
                    result.DataVolume,
                    result.BasePrice,
                    result.MinPrice,
                    result.MaxPrice
                );
            }

        });
    },
    loadDataChartWorldMobile: function (code) {
        //var code = $('#hd-header-select-code').val();
        var url = configHomeUrl.homeGetDataWorldBy;
        var params = "type=3MONTH&code=" + code;
        AjaxHelper.ajaxCall(url, params, function (result) {
            if (result.ErrCode != "01") {

                ChartHelper.renderChartIndex1("chart-header-world-mobile_" + code,
                    code,
                    result.DataIndex,
                    result.DataVolume,
                    result.BasePrice,
                    result.MinPrice,
                    result.MaxPrice
                );
            }

        });
    },
    loadHeaderIndex: function () {
        var url = configHomeUrl.homeGetHeaderIndex;
        var params = "";
        AjaxHelper.ajaxCall(url, params, function (result) {
            if (result.ErrCode != "01") {
                $('ul.chiso li').remove();
                var code = $('#hd-header-select-code').val();
                result.forEach(function (item) {
                    var isMobile = $("body").hasClass("mobile");
                    if (!isMobile) {
                        var active = code === item.Code ? "active" : "";
                        var color = item.Change > 0 ? "green" : (item.Change < 0 ? "red" : "");
                        var arrow = item.Change > 0 ? "up" : (item.Change < 0 ? "down" : "");
                        var name = CommonHelper.getDisplayCode(item.Code);
                        if (item.Type > 2) {
                            name = item.Name;
                        }
                        $('ul.chiso').append('<li class="li-header-select ' + active + '" data-code="' + item.Code +
                            '"><span>' + name + '</span><span>' + CommonHelper.formatNumber(item.Price, 2) + '</span><span class="' + color + '">' + CommonHelper.formatNumber(item.Change, 2) + '</span><span class="' + color + '">' + CommonHelper.formatNumber(item.PerChange, 2) + '%</span><span class="' + arrow + '"></span></li>');
                    } else {
                        $('.header-' + item.Code + '-price').html(CommonHelper.formatNumber(item.Price, 2));
                        $('.header-' + item.Code + '-change').html(CommonHelper.formatNumber(item.Change, 2));
                        $('.header-' + item.Code + '-per-change').html(CommonHelper.formatNumber(item.PerChange, 2) + "%");
                        if (item.Change > 0) {
                            $('.header-' + item.Code + '-color').removeClass("red");
                            $('.header-' + item.Code + '-color').addClass("green");
                            $('.header-' + item.Code + '-arow').removeClass("down");
                            $('.header-' + item.Code + '-arow').addClass("up");
                        }
                        if (item.Change == 0) {
                            $('.header-' + item.Code + '-color').removeClass("red");
                            $('.header-' + item.Code + '-color').removeClass("green");
                            $('.header-' + item.Code + '-arow').removeClass("down");
                            $('.header-' + item.Code + '-arow').removeClass("up");
                            $('.header-' + item.Code + '-color').addClass("yellow");
                        }
                        if (item.Change < 0) {
                            $('.header-' + item.Code + '-color').removeClass("green");
                            $('.header-' + item.Code + '-color').addClass("red");
                            $('.header-' + item.Code + '-arow').removeClass("up");
                            $('.header-' + item.Code + '-arow').addClass("down");
                        }


                    }
                });
            }

        });
    },
    loadHeaderExchanegRate: function () {
        var url = configHomeUrl.homeGetHeaderExchangeRate;
        var params = "";
        AjaxHelper.ajaxCall(url, params, function (result) {
            if (result.ErrCode != "01") {
                $('ul.thitruong li').remove();

                result.forEach(function (item) {
                    var val = CommonHelper.formatNumber(item.Value,0);
                    if (item.Code == "DAU-THO-WTI" || item.Code == "BTC")
                        val = CommonHelper.formatNumber(item.Value, 2);
                    $('ul.thitruong').append('<li><span>' + item.Name + '</span><span>' + val + '</span></li>');
                });
            }

        });
    },
    loadHeaderNews: function () {
        var url = configHomeUrl.homeGetHeaderNews;
        var params = "";
        AjaxHelper.ajaxCall(url, params, function (result) {
            if (result.ErrCode != "01") {
                $('ul.tinmoi li').remove();

                result.DataList.forEach(function (item) {
                    var title = item.Title;
                    if (title.length > 150)
                        title = title.substring(0, 150) + "...";

                    $('ul.tinmoi').append('<li><span>' + item.Time + '</span><a title="' + item.Title + '" style="line-height: 1.5;" target="_top" href="' + item.Url + '">' + title + '</a></li>');
                });
            }

        });
    },
    bindHeaderSearchBox: function () {
        CommonIndex.loadCompany("", 0, 1, function (result) {
            if (result.ErrCode != "01") {
                var isMobile = $("body").hasClass("mobile");
                var el = ".txt-keyword-header";
                if (isMobile) {
                    el = ".txt-keyword-header-mobile";
                }
                $(el).autocomplete({
                    source: result.DataList,
                    highlightClass: 'text-danger',
                    maximumItems: 10,
                    treshold: 1,
                    value: "Code",
                    label: "Name",
                    byThreeChar: true,
                    onSelectItem: function (item, element) {
                        var isInt = Number.isInteger(item.value);
                        var inIframe = $('body').hasClass("wrap-iframe");
                        if (isInt) {
                            var name = CommonHelper.replacePersonName(CommonHelper.removeVietnameseTones(item.label));
                            if (!inIframe)
                                window.location.href = "/ca-nhan-nqs_" + item.value + "/" + name;
                            else
                                window.parent.location.href = "/ca-nhan-nqs_" + item.value + "/" + name;
                        } else {
                            if (!inIframe)
                                window.location.href = configCommonUrl.companyDetail + item.value;
                            else
                                window.parent.location.href = configCommonUrl.companyDetail + item.value;
                        }
                    }
                });
            }
        });
    }
};

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