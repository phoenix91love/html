var lableReportKQKD, dataReportKQKD1, dataReportKQKD2, lableReportCDKT, dataReportCDKT1, dataReportCDKT2;
function loadDataChartHeader(el, type, code) {
    var url = urlGetDataStockBy + '?type=' + type + '&code=' + code;
    var params = "";
    AjaxHelper.ajaxCall(url, params, function (result) {
        if (result.ErrCode != "01") {
            if (type === "DAY" || type == "6MONTH" || type == "1YEAR" || type == "5YEAR" || type == "") {
                ChartHelper.renderChartIndex(el,
                    code,
                    result.DataIndex,
                    result.DataVolume,
                    result.BasePrice,
                    result.MinPrice,
                    result.MaxPrice,
                    type == "DAY"
                );
            } else {
                ChartHelper.renderChartCandleStick(el,
                    code,
                    result.DataIndex,
                    result.DataVolume,
                    result.BasePrice
                );
            }
        }
    });
}
function loadAllChart() {
    if ($(".hd-type").val() === "DAY") {
        var code = $("#input-code").val();
        loadDataChartHeader("chart-doanh-nghiep", "DAY", code);
    }
}
function loadDataPriceHistory(exId, code) {
    var fromDate = formatDateToStr(addDays(new Date(), -60));
    var toDate = formatDateToStr(new Date());
    var url = urlPriceHistoryData + "?fromDate=" + fromDate + "&toDate=" + toDate + "&exId=" + exId + "&code=" + code;
    var params = "";
    AjaxHelper.ajaxCall(url, params, function (result) {
        if (result.ErrCode != "01") {
            var data = result.DataList;
            var index = 0;
            $('ul.history li.note').remove();
            $('#pricehistory-mobile').empty();
            $('#pricehistory').empty();
            $('#pricehistory').append(`<li><div class="c-box__title">
                                                <h2 class="c-box__title__name">Lịch sử giao dịch</h2>
                                            </div>
                                        </li>
                                        <li class="labelname">
                                            <span>Ngày</span>
                                            <span>Thay đổi giá</span>
                                            <span>KLGD</span>
                                            <span>GTGD</span>
                                        </li>`);
            $('#pricehistory-mobile').append(`<li>
                                                <div class="c-box__title">
                                                    <h2 class="c-box__title__name">Lịch sử giao dịch</h2>
                                                </div>
                                            </li>
                                        <li class="labelname">
                                            <span>Ngày</span>
                                            <span>Thay đổi giá</span>
                                            <span>KLGD</span>
                                            <span>GTGD</span>
                                        </li>`);
            for (var i = 0; i < data.length; i++) {
                index++;
                if (index > 10)
                    break;
                $('#pricehistory').append(`<li>
                    <span> `+ formatDateTodatemonthStr(data[i].Date) + `</span >
                    <span class="` + (data[i].Change > 0 ? 'green' : 'red') + `"> <span>` + data[i].ClosePrice + '</span><span> ' + Math.abs(data[i].Change) + '(' + Math.abs(data[i].PerChange) + `%)</span></span>
                    <span>`+ CommonHelper.formatNumber(data[i].MatchVolBase.toFixed(0), 0) + `</span>
                    <span>`+ CommonHelper.formatNumber(data[i].MatchVal.toFixed(2), 2) + `</span>
                   </li>`);
                $('#pricehistory-mobile').append(`<li>
                    <span> `+ formatDateTodatemonthStr(data[i].Date) + `</span >
                    <span class="` + (data[i].Change > 0 ? 'green' : 'red') + `"> <span>` + data[i].ClosePrice + '</span><span> ' + Math.abs(data[i].Change) + '(' + Math.abs(data[i].PerChange) + `%)</span></span>
                    <span>`+ CommonHelper.formatNumber(data[i].MatchVolBase.toFixed(0), 0) + `</span>
                    <span>`+ CommonHelper.formatNumber(data[i].MatchVal.toFixed(2), 2) + `</span>
                   </li>`);
            }
            $('#pricehistory').append(`<li class="note">
                <a href="`+ urlHistoryTrade + `" class="float-left text-nowrap">Xem tất cả </a>
                <span class="float-right text-nowrap text-right">Đơn vị GTGD: Tỷ đồng</span>
             </li>`);
            $('#pricehistory-mobile').append(`<li class="note">
                <a href="`+ urlHistoryTrade + `" class="float-left text-nowrap">Xem tất cả </a>
                <span class="float-right text-nowrap text-right">Đơn vị GTGD: Tỷ đồng</span>
             </li>`);
        }

    });
}

function addDays(date, days) {
    let dateCopy = new Date(date);
    dateCopy.setDate(date.getDate() + days);
    return dateCopy;
}

function formatDateToStr(date) {

    let yyyy = date.getFullYear();
    let mm = date.getMonth() + 1; // Months start at 0!
    let dd = date.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return dd + '/' + mm + '/' + yyyy;
}

function formatDateTodatemonthStr(date) {
    if (date.includes('/')) {
        var arr = date.split("/")
        return arr[0] + '/' + arr[1];
    }
    else {
        var arr = date.split("-");
        return arr[0] + '/' + arr[1];
    }
}


function loadDataCompanyEvent(page) {
    var code = $('#input-code').val();
    var type = $('#option-events :selected').attr('data-type');
    var category = $('#option-events').val();
    var params = { code: code, page: page, type: type, category: category };
    App.loadPartial(urlCompanyEvents, params, "#company_events");
}
$(document).on("change", "#option-events", function () {
    loadDataCompanyEvent(1);
});
function loadDataCompanyNews(page) {
    var code = $('#input-code').val();
    var params = "page=" + page + "&code=" + code;
    App.loadPartial(urlCompanyNews, params, "#company-News");
}

function eventClick(e) {
    var id = $(e).attr("id");
    var title = $("#title-" + id).html();
    var url = $("#url-" + id).html();
    var content = $("#content-" + id).html();
    $("#event-detail-title").html("");
    $("#event-detail-content").html("");
    $("#event-detail-download").html("");

    $("#event-detail-title").html(title);
    $("#event-detail-content").html(content);
    if (url != "" && url != null)
        $("#event-detail-download").html("<a target='_blank' href=" + url + ">" + TextEllipsis(url, 50, 'mid', '...') + "</a>");
    $('.modal-detail').modal('show');
}

$(document).on("click", ".paging-event .page-link", function () {
    var page = $(this).attr("data-page");
    if (page == undefined)
        return;
    loadDataCompanyEvent(page);
});

$(document).on("click", ".paging-news .page-link", function () {
    var page = $(this).attr("data-page");
    if (page == undefined)
        return;
    loadDataCompanyNews(page);
});
$(document).on("click", ".btn-load", function () {
    var type = $(this).attr("data-type");
    var code = $("#input-code").val();
    $(".btn-load").removeClass("active");
    $(this).addClass("active");
    $(".hd-type").val(type);
    loadDataChartHeader("chart-doanh-nghiep", type, code);
});

$(document).ready(function () {
    loadDataCompanyEvent(1);
    loadDataCompanyNews(1);
    loadAllChart();
    loadDataPriceHistory(1, $("#input-code").val());
    const dataShearHolder = {
        labels: [
            'Ban lãnh đạo',
            'Nước ngoài',
            'Khác'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [percentStockCeo, overRatios, 100.0 - overRatios - percentStockCeo],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 205, 86)',
                'rgb(255, 105, 86)'
            ],
            hoverOffset: 4
        }],

    };
    new Chart("charShearHolder", {
        type: "pie",
        data: dataShearHolder,
        options: {
            responsive: true,
            legend: {
                display: false
            },
            plugins: {
                labels: {
                    render: 'value'
                }
            }
        }
    });

    $('.r-tab .tile li:nth-child(1)').html('Ban lãnh đạo: ' + CommonHelper.formatNumber(percentStockCeo, 2) + "%");
    $('.r-tab .tile li:nth-child(2)').html('Nước ngoài: ' + CommonHelper.formatNumber(overRatios.toFixed(2), 2) + "%");
    $('.r-tab .tile li:nth-child(3)').html('Khác: ' + CommonHelper.formatNumber((100.0 - overRatios - percentStockCeo), 2) + "%");
    loadFinanceByCode();
    LoadFinanceTarget();
    LoadMoreNews();
    CreateTooltip();
    $('#modalNewShowPopup').modal('show');
});

function ShowDetail() {
    $('.modal-company-detail').modal('show');
}

function loadFinanceByCode() {
    var code = $('#finance-code').val();
    var pageIndex = $('#finance-pageindex').val();
    var type = $('#finance-typeView').val();
    var params = { code: code, pageIndex: pageIndex, type: type };
    App.loadPartialCallback(urlCompanyFinaFinacial, params, "#content-finance", function () {
        renderChartFinaceKQKD('chart-kqkd', 1, lableReportKQKD, dataReportKQKD1, dataReportKQKD2);
        renderChartFinaceKQKD('chart-cdkt', 2, lableReportCDKT, dataReportCDKT1, dataReportCDKT2);
        LoadDataChartCompareProfession();
        LoadCompanyDebtBank();
        LoadCompanyFinanceReportFile();
    });
}

function getNextPropertiesBCTC() {
    var index = parseInt($('#finance-pageindex').val());
    if (index == 0)
        return;
    $('#finance-pageindex').val(index - 1);
    loadFinanceByCode();
}

function getPrePropertiesBCTC() {
    if ($('#finishData').val() == 'true')
        return;
    var index = parseInt($('#finance-pageindex').val());
    $('#finance-pageindex').val(index + 1);
    loadFinanceByCode();
}


function financeNext() {
    getNextPropertiesBCTC();
}
function financePre() {
    getPrePropertiesBCTC();
}
function ChangeTypeView(i) {
    $('#finance-typeView').val(i);
    $('#finance-pageindex').val(0);
    loadFinanceByCode();
}


function LoadFinanceTarget(year) {
    if (year == undefined)
        year = new Date().getFullYear();
    var param = { code: $('#finance-code').val(), year: year };
    App.loadPartial(urlFinanceTarget, param, "#content-finance-target");
}
function financeTargetPre() {
    var curentYear = parseInt($('#finance-target-year').val());
    var isFinish = $('#finance-finish-pre').val();
    if (isFinish != '')
        return;
    $('#finance-target-year').val(curentYear - 1);
    LoadFinanceTarget(curentYear - 1);
}
function financeTargetNext() {
    var curentYear = parseInt($('#finance-target-year').val());
    if (curentYear >= new Date().getFullYear())
        return;
    $('#finance-target-year').val(curentYear + 1);
    LoadFinanceTarget(curentYear + 1);
}

function renderChartFinaceKQKD(elementId, type, lables, data1, data2) {
    var densityData = {
        label: type == 1 ? 'Doanh thu(tỷ)' : 'Tài sản(tỷ)',
        data: data1,
        backgroundColor: '#dd6c66',
        borderColor: '#dd6c66',
    };

    var gravityData = {
        label: type == 1 ? 'Lợi nhuận(tỷ)' : 'Vốn CSH(tỷ)',
        data: data2,
        backgroundColor: '#759aa0',
        borderColor: '#759aa0',
    };

    const cfg = {
        type: 'bar',
        data: {
            datasets: [densityData, gravityData],
            labels: lables
        },
        options: {
            legend: {
                position: 'bottom'
            },
            responsive: true,
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false
                    },

                }],
                yAxes: [{
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        callback: (label) => CommonHelper.formatNumber(label, 2),
                        beginAtZero: true
                    },
                }],

            },

            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        //console.log('data', data);
                        //console.log('tooltipItem', tooltipItem);
                        let lable = data.datasets[tooltipItem.datasetIndex].label;
                        return lable + ': ' + (CommonHelper.formatNumber(tooltipItem.value, 2));
                    }
                }
            }

        }
    };
    new Chart(elementId, cfg);
}




function TextEllipsis(str, maxLength, side = "end", ellipsis = "...") {
    if (str.length > maxLength) {
        switch (side) {
            case "start":
                return ellipsis + str.slice(-(maxLength - ellipsis.length));
            case "mid":
                let sublen = parseInt(maxLength / 2);
                return str.substr(0, sublen) + '...' + str.substr(str.length - sublen, str.length);
            case "end":
            default:
                return str.slice(0, maxLength - ellipsis.length) + ellipsis;

        }
    }
    return str;
}

function LoadMoreNews(e) {
    var page = parseInt($('#getnew-page').val());
    page += 1;
    $('#getnew-page').val(page);
    var code = $("#input-code").val();
    var param = { code: code, page: page };
    App.loadPartialAppendCallback(urlGetNews, param, "#company-get-news", function () {
        if ($('#company-get-news-finish').val() == '1')
            $(e).addClass('d-none');
    });
}
var isShow = false;
function ShowMoreDetail(e) {
    isShow = !isShow;
    if (isShow) {
        $(e).html(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up" viewBox="0 0 16 16">
  <path d="M3.204 11h9.592L8 5.519 3.204 11zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659z"/>
</svg>`);
        $('.content-extent').removeClass('d-none');
    } else {
        $(e).html(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down" viewBox="0 0 16 16">
  <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"/>
</svg>`);
        $('.content-extent').addClass('d-none');
    }
}


function CreateTooltip() {
    $('[data-toggle="tooltip"]').tooltip({
        html: true,
        trigger: 'hover',
        delay: {
            //hide: 50000
        },
        title: function () {
            var name = this.getAttribute('data-name');
            var code = this.getAttribute('data-code');
            var price = this.getAttribute('data-price');
            var change = this.getAttribute('data-change');
            var perchange = this.getAttribute('data-percent-change');
            var klgd = this.getAttribute('data-volume');
            var gtgd = this.getAttribute('data-value');
            var nnmua = this.getAttribute('data-foreign-buy');
            var nnban = this.getAttribute('data-foreign-sell');
            var price7D = this.getAttribute('data-priceBefor7day');
            var change7D = this.getAttribute('data-changeBefor7day');
            var percentChange7D = this.getAttribute('data-changePercentBefor7day');

            let priceClass = this.getAttribute('data-PriceClass');
            let price7DClass = '';
            //if (parseFloat(change.replace(/,/g,'')) > 0) priceClass = "green";
            //if (parseFloat(change.replace(/,/g, '')) == 0) priceClass = "yellow";
            //if (parseFloat(change.replace(/,/g, '')) < 0) priceClass = "red";
            if (parseFloat(change7D.replace(/,/g, '')) > 0) price7DClass = "green-price";
            if (parseFloat(change7D.replace(/,/g, '')) == 0) price7DClass = "yellow";
            if (parseFloat(change7D.replace(/,/g, '')) < 0) price7DClass = "red-price";

            var str = `<div class='top-tool-tip'>
                        <h2><span class='code'>` + code + `</span> : <span class='name'>` + name + `</span></h2><hr/>
                        <h3><span class='item1'>Giá hiện tại: </span><span class='item2'>` + price + `</span><span class='item3 ` + priceClass + "'>" + change + `</span><span class='item4 ` + priceClass + "'>(" + perchange + `%)</span></h3>
                        <h3><span class='item1'>7 ngày trước:</span><span class='item2'>` + price7D + `</span><span class='item3 ` + price7DClass + "'>" + change7D + "</span><span class='item4 " + price7DClass + "'>(" + percentChange7D + `%)</span></h3>
                        <h3><span class='item1'>KLGD:</span><span class='item2'>` + klgd + ` cp</span><span class='item3'></span><span class='item4'></span></h3>
                        <h3><span class='item1'>GTGD:</span><span class='item2'>` + gtgd + ` tỷ</span><span class='item3'></span><span class='item4'></span></h3>
                        <h3><span class='item1'>NN Mua:</span><span class='item2'>` + nnmua + ` cp</span><span class='item3'></span><span class='item4'></span></h3>
                        <h3><span class='item1'>NN Bán:</span><span class='item2'>` + nnban + ` cp</span><span class='item3'></span><span class='item4'></span></h3>
                    </div>`;
            return str;
        }
    }).on('hide.bs.tooltip', () => {
        $('.tooltip').remove();
    });;
}

function LoadDataChartCompareProfession() {
    var param = { code: $("#input-code").val(), type: $('#compareType').val() };
    AjaxHelper.ajaxCall(urlGetDataCompareProfession, param, function (data) {
        if (data != undefined && data.length > 0)
            InitChartCompareProfession(data);
    });
}
function InitChartCompareProfession(data) {
    var dataChart = [];
    var currentCode = $("#input-code").val();
    data.forEach(function print(item, index) {
        var subItem = {
            x: item.Code == currentCode ? data.length / 2 : Math.floor(Math.random() * data.length),
            y: item.Value / 1000000000, z: item.Value / 1000000000,
            name: item.Code,
            reportTime: item.ReportTime,
            valueView: CommonHelper.formatNumber(item.Value / 1000000000.0, 2),
            color: item.Code != currentCode ? '#c735eb' : '#ee7224',
            fillColor: item.Code != currentCode ? '#c735eb' : '#ee7224',
        };
        dataChart.push(subItem);
    });
    var title = "";
    switch (dataChart[0].Type) {
        case 1:
            title = "Tổng doanh thu";
            break;
        case 2:
            title = "Tổng lợi nhuận"
            break;
        case 3:
            title = "Tổng tài sản"
            break;
        case 4:
            title = "Tổng vốn chủ sở hữu"
            break;
    }
    Highcharts.chart('chart-compare-profession', {
        chart: {
            type: 'bubble',
            plotBorderWidth: 1,
            zoomType: 'xy'
        },

        legend: {
            enabled: false
        },

        title: {
            text: title,
            align: 'bottom'
        },

        xAxis: {
            startOnTick: false,
            endOnTick: false,
            gridLineWidth: 1,
            title: {
                enabled: true,
                text: '(*) Số liệu so sánh tính theo kỳ báo cáo gần nhất',
                align: 'left'
            },
        },
        yAxis: {
            startOnTick: false,
            endOnTick: false,
            title: {
                text: dataChart[0].Name
            },
            labels: {
                formatter: function () {
                    return CommonHelper.formatNumber(this.value, 0) + 'Tỷ';
                }
            },
            maxPadding: 0.2,
        },

        tooltip: {
            useHTML: true,
            headerFormat: '<table>',
            pointFormat: `<tr><th colspan="2"><h3>{point.name}</h3></th></tr>
                <tr><td>{point.valueView}Tỷ</td></tr>
                <tr><td>(*){point.reportTime}</td></tr>`,
            footerFormat: '</table>',
            followPointer: true
        },

        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }
        },

        series: [{
            data: dataChart,
            colorByPoint: true,
        }]

    });
}

function ComboboxCompareProfessionType() {
    LoadDataChartCompareProfession();
}

function LoadCompanyDebtBank() {
    var typeBCTC = parseInt($('#company-financial-type').val());
    if (typeBCTC != 3)
        return;
    var param = { code: $("#input-code").val() };
    App.loadPartialAppendCallback(urlGetDataDebtBank, param, "#company-financial-debtBank-content", function () {
    });
}
function LoadCompanyFinanceReportFile() {
    var param = { code: $("#input-code").val() };
    App.loadPartialAppendCallback(urlGetFinanceFileReport, param, "#company-financial-reportFile", function () {
    });
}

function ShowAllFireReport(e) {
    var guidId = $(e).attr('data-guid');
    $('#' + guidId+' tr').each(function (index) {
        $(this).removeClass('d-none');
    });
    $($(e).closest('tr')).remove();
}