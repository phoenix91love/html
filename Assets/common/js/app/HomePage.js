var HomePage = {
    loadDataExChart: function () {
        var type = $('.hd-type').val();
        var code = $('.hd-code').val();
        var url = configHomeUrl.homeGetDataBy;
        var params = "type=" + type + "&code=" + code;
        AjaxHelper.ajaxCall(url, params, function (result) {
            if (result.ErrCode != "01") {

                if (type === "DAY" || type == "6MONTH" || type == "1YEAR" || type == "5YEAR" || type == "") {
                    ChartHelper.renderChartIndex("chart-index",
                        code,
                        result.DataIndex,
                        result.DataVolume,
                        result.BasePrice,
                        result.MinPrice,
                        result.MaxPrice,
                        false
                    );
                } else {
                    ChartHelper.renderChartCandleStick("chart-index",
                        code,
                        result.DataIndex,
                        result.DataVolume,
                        false
                    );
                }
            }

        });
    },
    loadDataChartWorld: function () {
        var tab = $('.hd-tab').val();
        var type = $('.hd-type-world').val();
        var code = $('.hd-code-world').val();
        var url = configHomeUrl.homeGetDataWorldBy;
        var params = "type=" + type + "&code=" + code;
        AjaxHelper.ajaxCall(url, params, function (result) {
            if (result.ErrCode != "01") {

                ChartHelper.renderChartIndex("chart-" + tab + "-index",
                    code,
                    result.DataIndex,
                    result.DataVolume,
                    result.BasePrice,
                    result.MinPrice,
                    result.MaxPrice,
                    false

                );
            }

        });
    },
    loadExIndex: function () {
        var url = configHomeUrl.homeGetExIndex;
        var params = "code=" + $('.hd-code').val();
        AjaxHelper.ajaxCall(url, params, function (result) {
            if (result.ErrCode != "01") {
                result.DataList.forEach(item => {
                    if ($('.hd-code').val() == item.Code) {
                        var code = $('.hd-code').val();
                        code = CommonHelper.getDisplayCode(code);
                        $('.vn-stock-code').html(code);
                        $(".vn-stock-price").html(CommonHelper.formatNumber(item.Price, 2));
                        $(".vn-stock-change").html(CommonHelper.formatNumber(item.Change, 2));
                        $(".vn-stock-per-change").html("(" + CommonHelper.formatNumber(item.PerChange, 2) + "%)");
                        if (item.Change > 0) {
                            $(".vn-stock-change, .vn-stock-per-change").removeClass("red");
                            $(".vn-stock-change, .vn-stock-per-change").addClass("green");
                        }
                        if (item.Change < 0) {
                            $(".vn-stock-change, .vn-stock-per-change").removeClass("green");
                            $(".vn-stock-change, .vn-stock-per-change").addClass("red");
                        }


                        $(".vn-vonhoa").html(CommonHelper.formatNumber(item.MarketCap, 2) + " tỷ");
                        $(".vn-klgd").html(CommonHelper.formatNumber(item.Klgd, 0));
                        $(".vn-gtgd").html(CommonHelper.formatNumber(item.Gtgd, 2) + " tỷ");
                        $(".vn-nnmua").html(CommonHelper.formatNumber(item.NNmua, 0));
                        $(".vn-nnban").html(CommonHelper.formatNumber(item.NNban, 0));

                        $(".vn-highest-lowest").html("<span class='" + item.LowestColor + "'>" + CommonHelper.formatNumber(item.Lowest, 2) + "</span> / " + "<span class='" + item.HighestColor + "'>" + CommonHelper.formatNumber(item.Highest, 2)) + "</span>";
                        $(".vn-highest-lowest-52t").html(CommonHelper.formatNumber(item.Lowest52T, 2) + " / " + CommonHelper.formatNumber(item.Highest52T, 2));
                        $(".div-last-update").html(item.LastUpdate);
                    }
                });

            }

        });
    },
    loadWorldIndex: function () {
        var tab = $('.hd-tab').val();
        var url = configHomeUrl.homeGetWorldIndex;
        var params = "";
        AjaxHelper.ajaxCall(url, params, function (result) {
            if (result.ErrCode != "01") {
                var listData = [...result.ChauMy, ...result.ChauAu, ...result.ChauA];

                listData.forEach(item => {
                    if ($('.hd-code-world').val() == item.Code) {
                        $('.' + tab + '-stock-code').html($('.hd-code-world').val());
                        $('.' + tab + '-stock-price').html(CommonHelper.formatNumber(item.Price, 2));
                        $('.' + tab + '-stock-change').html(CommonHelper.formatNumber(item.Change, 2));
                        $('.' + tab + '-stock-per-change').html("(" + CommonHelper.formatNumber(item.PerChange, 2) + "%)");
                        if (item.Change > 0) {
                            $('.' + tab + '-stock-change, .tg-stock-per-change').removeClass("red");
                            $('.' + tab + '-stock-change, .tg-stock-per-change').addClass("green");
                        }
                        if (item.Change < 0) {
                            $('.' + tab + '-stock-change, .tg-stock-per-change').removeClass("green");
                            $('.' + tab + '-stock-change, .tg-stock-per-change').addClass("red");
                        }


                        $('.' + tab + '-klgd').html(CommonHelper.formatNumber(item.Klgd, 0));
                        $('.' + tab + '-gtgd').html(CommonHelper.formatNumber(item.Gtgd, 0));

                        $('.' + tab + '-highest').html(CommonHelper.formatNumber(item.Highest, 2));
                        $('.' + tab + '-lowest').html(CommonHelper.formatNumber(item.Lowest, 2));
                        $('.div-last-update-world').html(item.LastUpdate);
                    }

                    $("." + item.Code + "-price").html(CommonHelper.formatNumber(item.Price, 2));
                    $("." + item.Code + "-change").html(CommonHelper.formatNumber(item.Change, 2));
                    $("." + item.Code + "-change").addClass(item.Change > 0 ? "green" : (item.Change < 0 ? "red" : ""));
                    $("." + item.Code + "-per-change").html("(" + CommonHelper.formatNumber(item.PerChange, 2) + "%)");
                    $("." + item.Code + "-per-change").addClass(item.Change > 0 ? "green" : (item.Change < 0 ? "red" : ""));
                    if (item.Change > 0) {
                        $("." + item.Code + "-price, ." + item.Code + "-per-change").removeClass("red");
                        $("." + item.Code + "-price, ." + item.Code + "-per-change").addClass("green");
                    }
                    if (item.Change < 0) {
                        $("." + item.Code + "-price, ." + item.Code + "-per-change").removeClass("green");
                        $("." + item.Code + "-price, ." + item.Code + "-per-change").addClass("red");
                    }

                });
            }
        });
    },
    loadTopIndex: function () {
        var code = $('.hd-top-code').val();
        var type = $('.hd-top-type').val();
        var xPhien = $('#top-x-phien').val();
        var url = configHomeUrl.homeTopIndex;
        var params = "code=" + code + "&type=" + type + "&xPhien=" + xPhien;
        AjaxHelper.ajaxCall(url, params, function (result) {
            $(".top-content").html(result);
        });
    },
    loadStockMap: function () {
        var exId = $('.hd-exchange-id').val();
        var type = $('.hd-exchange-type').val();
        var nganh = $(".hd-nganh").val();
        var url = configHomeUrl.homeGetDatMap;
        var params = "exCode=" + exId + "&type=" + type + "&idNganh=" + nganh;
        $('#treeMap').empty();
        AjaxHelper.ajaxCall(url, params, function (result) {
            if (result.ErrCode != "01") {
                var data = [result];

                // create a chart and set the data
                chart = anychart.treeMap(data, "as-tree");

                // enable HTML for labels
                chart.labels().useHtml(true);

                chart.labels().format(function () {
                    return "<span style='font-weight:bold; color: #ffffff'>" + this.name + "<br/>" + CommonHelper.formatNumber(this.getData("Perchange"), 2) + "%</span>"
                });

                chart.tooltip().useHtml(true);
                var isMobile = $("body").hasClass("mobile");
                if (isMobile) {
                    chart.tooltip().enabled(true);
                }
                chart.tooltip().titleFormat(function () {
                    return "<span style='font-size: 15px;'>" + this.getData("name") + ":</span> <span style='font-size: 13px;'>" + this.getData("CompanyName") + "</span>";
                });
                chart.tooltip().format(function () {

                    var priceClass = this.getData("Color");
                    var price7DClass = "";
                    if (this.getData("Change7Day") > 0) price7DClass = "green";
                    if (this.getData("Change7Day") < 0) price7DClass = "red";

                    var str = "<table class='tb-tree-map-tooltip'><tbody>"
                    str += "<tr><td>Giá hiện tại:</td><td class='text-right'>" + CommonHelper.formatNumber(this.getData("Price"), 2) + "</td><td class='text-right " + priceClass + "'>" + CommonHelper.formatNumber(this.getData("Change"), 2) + "</td><td class='text-right " + priceClass + "'>(" + CommonHelper.formatNumber(this.getData("Perchange"), 2) + "%)</td></tr>";
                    str += "<tr><td>7 ngày trước:</td><td class='text-right'>" + CommonHelper.formatNumber(this.getData("Price7Day"), 2) + "</td><td class='text-right " + price7DClass + "'>" + CommonHelper.formatNumber(this.getData("Change7Day"), 2) + "</td><td class='text-right " + price7DClass + "'>(" + CommonHelper.formatNumber(this.getData("Perchange7Day"), 2) + "%)</td></tr>";
                    str += "<tr><td>KLGD: </td><td class='text-right'>" + CommonHelper.formatNumber(this.getData("TotalVolume"), 0) + "&nbsp;cp</td><td colspan='2'></td></tr>";
                    str += "<tr><td>GTGD: </td><td class='text-right'>" + CommonHelper.formatNumber(this.getData("TotalValue"), 2) + "&nbsp;tỷ</td><td colspan='2'></td></tr>";
                    str += "<tr><td>NN Mua:</td><td class='text-right'>" + CommonHelper.formatNumber(this.getData("NnMua"), 0) + "&nbsp;cp</td><td colspan='2'></td></tr>";
                    str += "<tr><td>NN Bán:</td><td class='text-right'>" + CommonHelper.formatNumber(this.getData("NnBan"), 0) + "&nbsp;cp</td><td colspan='2'></td></tr>";
                    return str += "</tbody></table>";
                });

                chart.headers(false);
                chart.container("treeMap");
                chart.listen("drillChange", function (e) {
                    // get the drilldown path and convert it to a string
                    var companyUrl = configCommonUrl.companyDetail + e.current.get('name');

                    window.open(companyUrl, "_self");

                    return false;
                });
                chart.draw();
                chart.autoRedraw(true);
            }
        });

    },

    loadNNDataChart: function (code) {
        var url = configHomeUrl.homeGetGdnnChartDate;
        var params = "code=" + code;
        AjaxHelper.ajaxCall(url, params, function (result) {
            if (result.ErrCode != "01") {

                if (this.chart1 != null)
                    this.chart1.destroy();
                if (this.chart2 != null)
                    this.chart2.destroy();
                this.chart1 = ChartHelper.renderChartColumnNNChartJs("container-nn-value", 0, result.Time, result.Value.BuyData, result.Value.SellData, result.Value.RongData);
                this.chart2 = ChartHelper.renderChartColumnNNChartJs("container-nn-volume", 1, result.Time, result.Volume.BuyData, result.Volume.SellData, result.Volume.RongData);
            }
        });
    },
    loadTkSlCp: function (code) {
        var url = configHomeUrl.homeGetTkSlCp;
        var params = "code=" + code;
        AjaxHelper.ajaxCall(url, params, function (result) {
            if (result.ErrCode != "01") {
                $('.thongso ul.slcp, .thongso ul.pbdt').empty();
                var percentSan = result.DataPercent[0];
                var percentGiam = result.DataPercent[1];
                var percentKoDoi = result.DataPercent[2];
                var percentTang = result.DataPercent[3];
                var percentTran = result.DataPercent[4];
                var addPercent = 10;
                if (percentSan < addPercent && percentSan > 0) percentSan = addPercent;
                if (percentGiam < addPercent) percentGiam = addPercent;
                if (percentKoDoi < addPercent) percentKoDoi = addPercent;
                if (percentTang < addPercent) percentTang = addPercent;
                if (percentTran < addPercent && percentTran > 0) percentTran = addPercent;

                if (percentSan > 0)
                    $('.thongso ul.slcp').append('<li title="' + result.Data1[0] + '" style="background-color: #8eabdc; width: ' + percentSan + '%">' + result.Data1[0] + '</li>');
                $('.thongso ul.slcp').append('<li title="' + result.Data1[1] + '" style="background-color: #fc0002; width: ' + percentGiam + '%">' + result.Data1[1] + '</li>');
                $('.thongso ul.slcp').append('<li title="' + result.Data1[2] + '" style="background-color: #ffb800; color: #000; width: ' + percentKoDoi + '%">' + result.Data1[2] + '</li>');
                $('.thongso ul.slcp').append('<li title="' + result.Data1[3] + '" style="background-color: #33a42e; width: ' + percentTang + '%">' + result.Data1[3] + '</li>');
                if (percentTran > 0)
                    $('.thongso ul.slcp').append('<li title="' + result.Data1[4] + '" style="background-color: #efc2fa; width: ' + percentTran + '%">' + result.Data1[4] + '</li>');

                var percentValueGiam = result.DataPercent1[0];
                var percentValueKoDoi = result.DataPercent1[1];
                var percentValueTang = result.DataPercent1[2];

                if (percentValueGiam < 25)
                    percentValueGiam = 25;
                if (percentValueKoDoi < 25)
                    percentValueKoDoi = 25;
                if (percentValueTang < 25)
                    percentValueTang = 25;

                $('.thongso ul.pbdt').append('<li title="' + result.Data3[0] + '" style="background-color: #fc0002; width: ' + percentValueGiam + '%">' + CommonHelper.formatNumber(result.Data3[0], 2) + '</li>');
                $('.thongso ul.pbdt').append('<li title="' + result.Data3[1] + '" style="background-color: #ffb800; color: #000; width: ' + percentValueKoDoi + '%">' + CommonHelper.formatNumber(result.Data3[1], 2) + '</li>');
                $('.thongso ul.pbdt').append('<li title="' + result.Data3[2] + '" style="background-color: #33a42e; width: ' + percentValueTang + '%">' + CommonHelper.formatNumber(result.Data3[2], 2) + '</li>');
            }
        });
    },

    loadTopCpAnhHuongChart: function (exCode) {
        var url = configHomeUrl.homeGetTopCpAnhHuong;
        var params = "exCode=" + exCode;
        AjaxHelper.ajaxCall(url, params, function (result) {
            if (result.ErrCode != "01") {

                if (this.chart10CpAnhHuong != null)
                    this.chart10CpAnhHuong.destroy();

                this.chart10CpAnhHuong = ChartHelper.renderChart10CpAnhHuong("container-top-10-cp-anh-huong", result.Labels, result.Data);
            }
        });
    },
    loadDongTienChart: function (code) {
        var url = configHomeUrl.homeGetDongTien;
        var params = "code=" + code;
        AjaxHelper.ajaxCall(url, params, function (result) {

            if (this.chartDongTien != null)
                this.chartDongTien.destroy();
            if (this.chartTop5Nganh != null)
                this.chartTop5Nganh.destroy();

            this.chartDongTien = ChartHelper.renderChartDongTienChartJs("container-dong-tien-x-day", result);
            this.chartTop5Nganh = ChartHelper.renderChartTop5NganhChartJs("container-dong-tien-top-nganh", result);
            

        });
    },
}

HomePage.loadDataExChart();
HomePage.loadExIndex();
HomePage.loadTopIndex();
HomePage.loadDongTienChart("VN-Index");
HomePage.loadStockMap();
HomePage.loadNNDataChart("VN-Index");
HomePage.loadTkSlCp("HOSE");
HomePage.loadTopCpAnhHuongChart("HOSE");
if (CommonHelper.isInTransactionTime()) {
    setInterval(function () {
        HomePage.loadDataExChart();
        HomePage.loadExIndex();
    }, 1000 * 60);
}
$('#tabChart').on('shown.bs.tab', function (event) {
    var tab = $(event.target).attr('data-tab');
    var code = $(event.target).attr('data-code');

    $('.hd-tab').val(tab);
    $(".index-data").css("display", "none");
    $(".index-data[data-tab='" + tab + "']").css("display", "block");
    if (tab == "vn") {
        $('.hd-code').val(code);
        $('.a-btn-view-detail-ex-index').attr("href", configCommonUrl.history + code)
        HomePage.loadDataExChart();
        HomePage.loadExIndex();
        var exCode = "";
        if (code == "VN-Index") exCode = "HOSE";
        if (code == 'VN30-Index') exCode = "VN30";
        if (code == "HNX-Index") exCode = "HNX";
        if (code == 'HNX30-Index') exCode = "HNX30";
        if (code == "UPCOM-Index") exCode = "UPCOM";

        HomePage.loadTkSlCp(exCode);
    }
    else {
        $('.hd-code-world').val(code);
        HomePage.loadDataChartWorld();
        HomePage.loadWorldIndex();
    }

});

$(".btn-load, .btn-load-world").click(function () {
    var type = $(this).attr("data-type");
    var tab = $('.hd-tab').val();
    if (tab == "vn") {
        $(".hd-type").val(type);
        $(".btn-load.active").removeClass("active");
        $(this).addClass("active");
        HomePage.loadDataExChart();
        HomePage.loadExIndex();
    }
    else {
        $(".hd-type-world").val(type);
        $(".btn-load-world.active").removeClass("active");
        $(this).addClass("active");
        HomePage.loadDataChartWorld();
        HomePage.loadWorldIndex();
    }
});

$(".rd-select-chart").change(function () {
    var code = $(this).val();

    var tab = $('.hd-tab').val();
    if (tab == "vn") {
        $('.hd-code').val(code);
        HomePage.loadDataExChart();
        HomePage.loadExIndex();
    } else {
        $('.tablink[data-tab="tg"]').attr('data-code', code);
        $('.hd-code-world').val(code);
        HomePage.loadDataChartWorld();
        HomePage.loadWorldIndex();
    }
});

$('.a-btn-tab-exchange').click(function () {
    $('.a-btn-tab-exchange').parent("li.active").removeClass("active");
    $(this).parent("li").addClass("active");
    var code = $(this).attr("data-code");
    $('.hd-top-code').val(code);
    HomePage.loadTopIndex();
    HomePage.loadTopCpAnhHuongChart(code);
});

$('.a-btn-tab-type').click(function () {
    var type = $(this).attr("data-type");
    $('.hd-top-type').val(type);
    $('.a-btn-tab-type').parent("li").removeClass("active");
    $(this).parent("li").addClass("active");
    HomePage.loadTopIndex();
});

$('#top-x-phien').change(function () {
    HomePage.loadTopIndex();
});

$('#ddl-top-cp-exchange').change(function () {
    var code = $(this).val();
    $('.hd-top-code').val(code);
    HomePage.loadTopIndex();
});

$('#ddl-top-cp-type').change(function () {
    var type = $(this).val();
    $('.hd-top-type').val(type);
    HomePage.loadTopIndex();
});
$("#ddl-exchange, #ddl-exchange-mobile").change(function () {
    var id = $(this).val();
    $('.hd-exchange-id').val(id);
    HomePage.loadStockMap();


});
$("#ddl-exchange-type, #ddl-exchange-type-mobile").change(function () {
    var id = $(this).val();
    $('.hd-exchange-type').val(id);
    HomePage.loadStockMap();
});

$("#ddl-nganh, #ddl-nganh-mobile").change(function () {
    var id = $(this).val();
    $(".hd-nganh").val(id);
    HomePage.loadStockMap();
});

$(".a-btn-show-ttcb-detail").click(function () {
    var id = $(this).attr("data-id");
    var title = $("#title-" + id).html();
    var url = $("#link-download-" + id).html();
    var content = $("#content-" + id).html();
    $("#detail-title").html("");
    $("#detail-content").html("");
    $("#detail-download").html("");

    $("#detail-title").html(title);
    $("#detail-content").html(content);
    if (url != "" && url != null)
        $("#detail-download").html(url);

    $('.modal-detail').modal('show');
});


$('.a-btn-tab-exchange-nn').click(function () {
    var code = $(this).attr("data-code");
    $('.a-btn-tab-exchange-nn').parent("li").removeClass("active");
    $(this).parent("li").addClass("active");
    $('.a-btn-tab-exchange-nn[data-code="' + code + '"]').css("display", "block");
    HomePage.loadNNDataChart(code);
});


$('.btn-tab-tigia').click(function () {
    var tab = $(this).attr("data-tab");
    $('.btn-tab-tigia').removeClass("active");
    $(this).addClass("active");
    $('.ul-tigia').css("display", "none");
    $('.ul-tigia[data-tab="' + tab + '"]').css("display", "block");
});
$('.btn-tab-hanghoacoin').click(function () {
    var tab = $(this).attr("data-tab");
    $('.ul-hanghoacoin').css("display", "none");
    $('.btn-tab-hanghoacoin').removeClass("active");
    $(this).addClass("active");
    $('.ul-hanghoacoin[data-tab="' + tab + '"]').css("display", "block");
});

$('.a-btn-tab-dong-tien').click(function () {

    $('.a-btn-tab-dong-tien').parent("li.active").removeClass("active");
    $(this).parent("li").addClass("active");
    var code = $(this).attr("data-code");
    HomePage.loadDongTienChart(code);
});

$('.thongso ul.slcp, .thongso ul.pbdt').click(function () {
    var code = $('.hd-code').val();
    var strCode = "";
    if (code == "VN-Index")
        strCode = "HOSE";
    if (code == "HNX-Index")
        strCode = "HNX";
    if (code == "UPCOM-Index")
        strCode = "UPCOM";
    if (code == "VN30-Index")
        strCode = "VN30";
    if (code == "HNX30-Index")
        strCode = "HNX30";
    window.location.href = configCommonUrl.history + strCode;
});