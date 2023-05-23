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
                        result.BasePrice
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
        var params = "";
        AjaxHelper.ajaxCall(url, params, function (result) {
            if (result.ErrCode != "01") {
                result.DataList.forEach(item => {
                    if ($('.hd-code').val() == item.Code) {
                        var code = $('.hd-code').val();
                        code = CommonHelper.getDisplayCode(code);
                        $('.vn-stock-code').html(code);
                        $(".vn-stock-price").html($.number(item.Price, 2));
                        $(".vn-stock-change").html($.number(item.Change, 2));
                        $(".vn-stock-per-change").html("(" + $.number(item.PerChange, 2) + "%)");
                        if (item.Change > 0) {
                            $(".vn-stock-change, .vn-stock-per-change").removeClass("red");
                            $(".vn-stock-change, .vn-stock-per-change").addClass("green");
                        }
                        if (item.Change < 0) {
                            $(".vn-stock-change, .vn-stock-per-change").removeClass("green");
                            $(".vn-stock-change, .vn-stock-per-change").addClass("red");
                        }


                        $(".vn-vonhoa").html($.number(item.MarketCap, 2) + " tỷ");
                        $(".vn-klgd").html($.number(item.Klgd, 0));
                        $(".vn-gtgd").html($.number(item.Gtgd, 2) + " tỷ");
                        $(".vn-nnmua").html($.number(item.NNmua, 0));
                        $(".vn-nnban").html($.number(item.NNban, 0));

                        $(".vn-highest").html($.number(item.Highest, 2));
                        $(".vn-lowest").html($.number(item.Lowest, 2));
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
                        $('.' + tab + '-stock-price').html($.number(item.Price, 2));
                        $('.' + tab + '-stock-change').html($.number(item.Change, 2));
                        $('.' + tab + '-stock-per-change').html("(" + $.number(item.PerChange, 2) + "%)");
                        if (item.Change > 0) {
                            $('.' + tab + '-stock-change, .tg-stock-per-change').removeClass("red");
                            $('.' + tab + '-stock-change, .tg-stock-per-change').addClass("green");
                        }
                        if (item.Change < 0) {
                            $('.' + tab + '-stock-change, .tg-stock-per-change').removeClass("green");
                            $('.' + tab + '-stock-change, .tg-stock-per-change').addClass("red");
                        }


                        $('.' + tab + '-klgd').html($.number(item.Klgd, 0));
                        $('.' + tab + '-gtgd').html($.number(item.Gtgd, 0));

                        $('.' + tab + '-highest').html($.number(item.Highest, 2));
                        $('.' + tab + '-lowest').html($.number(item.Lowest, 2));
                        $('.div-last-update-world').html(item.LastUpdate);
                    }

                    $("." + item.Code + "-price").html($.number(item.Price, 2));
                    $("." + item.Code + "-change").html($.number(item.Change, 2));
                    $("." + item.Code + "-change").addClass(item.Change > 0 ? "green" : (item.Change < 0 ? "red" : ""));
                    $("." + item.Code + "-per-change").html("(" + $.number(item.PerChange, 2) + "%)");
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
        var url = configHomeUrl.homeTopIndex;
        var params = "code=" + code + "&type=" + type;
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

                // configure labels
                //chart.labels().format(
                //    "<span style='font-weight:bold; color: #ffffff'>{%name}<br/>{%Perchange}%</span>"
                //);
                chart.labels().format(function () {
                    return "<span style='font-weight:bold; color: #ffffff'>" + this.name + "<br/>" + $.number(this.getData("Perchange"), 2) + "%</span>"
                });
                // configure tooltips
                //chart.tooltip().format(
                //    "<div style='width: 200px;'>Giá: {%Price} {%Change} {%Perchange}%\n7D: {%Price7Day} {%Change7Day} {%Perchange7Day}%\nKLGD: {%TotalVolume}\nGTGD: {%TotalValue}\nNN Mua: {%NnMua}\nNN bán: {%NnBan}</div>"
                //);
                chart.tooltip().useHtml(true);
                var isMobile = $("body").hasClass("mobile");
                if (isMobile) {
                    chart.tooltip().enabled(true);
                }
                chart.tooltip().titleFormat(function () {
                    return "<span style='font-size: 15px;'>" + this.getData("name")  + ":</span> <span style='font-size: 13px;'>" + this.getData("CompanyName") + "</span>";
                });
                chart.tooltip().format(function () {
                    //return "<div class='div-tree-map-tooltip'>Giá: " + $.number(this.getData("Price"), 2) + " " + $.number(this.getData("Change"), 2) + " " + $.number(this.getData("Perchange"), 2)
                    //    + "%\n7D: " + $.number(this.getData("Price7Day"), 2) + " " + $.number(this.getData("Change7Day"), 2) + " "
                    //    + $.number(this.getData("Perchange7Day"), 2) + "%\nKLGD: " + $.number(this.getData("TotalVolume"), 2) + "\nGTGD: "
                    //    + $.number(this.getData("TotalValue"), 2) + "\nNN Mua: " + $.number(this.getData("NnMua"), 2) + "\nNN bán: " + $.number(this.getData("NnBan"), 2) + "</div>";
                    var priceClass = "";
                    var price7DClass = "";
                    if (this.getData("Change") > 0) priceClass = "green";
                    if (this.getData("Change") < 0) priceClass = "red";
                    if (this.getData("Change7Day") > 0) price7DClass = "green";
                    if (this.getData("Change7Day") < 0) price7DClass = "red";

                    var str = "<table class='tb-tree-map-tooltip'><tbody>"
                    str += "<tr><td>Giá hiện tại:</td><td class='text-right'>" + $.number(this.getData("Price"), 2) + "</td><td class='text-right " + priceClass + "'>" + $.number(this.getData("Change"), 2) + "</td><td class='text-right " + priceClass + "'>(" + $.number(this.getData("Perchange"), 2) + "%)</td></tr>";
                    str += "<tr><td>7 ngày trước:</td><td class='text-right'>" + $.number(this.getData("Price7Day"), 2) + "</td><td class='text-right " + price7DClass + "'>" + $.number(this.getData("Change7Day"), 2) + "</td><td class='text-right " + price7DClass + "'>(" + $.number(this.getData("Perchange7Day"), 2) + "%)</td></tr>";
                    str += "<tr><td>KLGD: </td><td class='text-right'>" + $.number(this.getData("TotalVolume"), 0) + "&nbsp;cp</td><td colspan='2'></td></tr>";
                    str += "<tr><td>GTGD: </td><td class='text-right'>" + $.number(this.getData("TotalValue"), 2) + "&nbsp;tỷ</td><td colspan='2'></td></tr>";
                    str += "<tr><td>NN Mua:</td><td class='text-right'>" + $.number(this.getData("NnMua"), 0) + "&nbsp;cp</td><td colspan='2'></td></tr>";
                    str += "<tr><td>NN Bán:</td><td class='text-right'>" + $.number(this.getData("NnBan"), 0) + "&nbsp;cp</td><td colspan='2'></td></tr>";
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

                //ChartHelper.renderChartColumnNN("container-nn-value", 0, result.Value.BuyData, result.Value.SellData);
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

                $('.thongso ul.pbdt').append('<li title="' + result.Data3[0] + '" style="background-color: #fc0002; width: ' + percentValueGiam + '%">' + $.number(result.Data3[0], 2) + '</li>');
                $('.thongso ul.pbdt').append('<li title="' + result.Data3[1] + '" style="background-color: #ffb800; color: #000; width: ' + percentValueKoDoi + '%">' + $.number(result.Data3[1], 2) + '</li>');
                $('.thongso ul.pbdt').append('<li title="' + result.Data3[2] + '" style="background-color: #33a42e; width: ' + percentValueTang + '%">' + $.number(result.Data3[2], 2) + '</li>');
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
}

HomePage.loadDataExChart();
HomePage.loadExIndex();
HomePage.loadTopIndex();
HomePage.loadStockMap();
HomePage.loadNNDataChart("VN-Index");
HomePage.loadTkSlCp("HOSE");
HomePage.loadTopCpAnhHuongChart("HOSE");

setInterval(function () {
    HomePage.loadDataExChart();
    HomePage.loadExIndex();
}, 1000 * 60);

$('#tabChart').on('shown.bs.tab', function (event) {
    var tab = $(event.target).attr('data-tab');
    var code = $(event.target).attr('data-code');

    $('.hd-tab').val(tab);
    $(".index-data").css("display", "none");
    $(".index-data[data-tab='" + tab + "']").css("display", "block");
    if (tab == "vn") {
        $('.hd-code').val(code);
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
