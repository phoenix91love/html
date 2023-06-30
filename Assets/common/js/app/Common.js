
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
                    var cssColor = item.Color;
                    var priceCssColor = item.Change == 0 ? "black" : cssColor;
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
      
        var searchData = "";
        $('.txt-keyword-header').select2({
            placeholder: "Mã CK / Từ khóa",
            allowClear: true,
            dropdownAutoWidth: true,
            tags: true,
            minimumInputLength: 2,
            ajax: {
                delay: 250,
                url: configHomeUrl.homeGetSearchBoxData,
                dataType: 'json',
                data: function (params) {
                    searchData = params.term
                    var query = {
                        search: params.term,
                    }
                    // Query parameters will be ?search=[term]&type=public
                    return query;
                },
                processResults: function (data) {
                    // Transforms the top-level key of the response object from 'items' to 'results'
                    return {
                        results: data
                    };
                },
                cache: true
            },
            templateResult: formatRepo,
            language: {

                inputTooShort: function () {
                    return "Nhập ít nhất 2 ký tự để tìm kiếm";
                }
            }

        });
        function formatRepo(repo) {
            if (repo.loading) {
                return repo.text;
            }
            var idx = repo.text.toLowerCase().indexOf(searchData.toLowerCase());
            var text = repo.text.substring(0, idx)
                + '<span class="red">' + repo.text.substring(idx, idx + searchData.length) + '</span>'
                + repo.text.substring(idx + searchData.length, repo.text.length);

            var $container = $(
                "<div class='select2-result-repository clearfix'>" + text + "</div>"
            );
            return $container;
        }

    }
};

