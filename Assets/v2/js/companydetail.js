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
                                                <div class="c-box__title__name">Lịch sử giao dịch</div>
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
                                                    <div class="c-box__title__name">Lịch sử giao dịch</div>
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
                    <span>`+ new Intl.NumberFormat('EN').format(data[i].MatchVolBase.toFixed(0)) + `</span>
                    <span>`+ new Intl.NumberFormat('EN').format(data[i].MatchVal.toFixed(2)) + `</span>
                   </li>`);
                $('#pricehistory-mobile').append(`<li>
                    <span> `+ formatDateTodatemonthStr(data[i].Date) + `</span >
                    <span class="` + (data[i].Change > 0 ? 'green' : 'red') + `"> <span>` + data[i].ClosePrice + '</span><span> ' + Math.abs(data[i].Change) + '(' + Math.abs(data[i].PerChange) + `%)</span></span>
                    <span>`+ new Intl.NumberFormat('EN').format(data[i].MatchVolBase.toFixed(0)) + `</span>
                    <span>`+ new Intl.NumberFormat('EN').format(data[i].MatchVal.toFixed(2)) + `</span>
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
Number.prototype.format = function (n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};
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

    $('.r-tab .tile li:nth-child(1)').html('Ban lãnh đạo: ' + new Intl.NumberFormat('EN').format(percentStockCeo) + "%");
    $('.r-tab .tile li:nth-child(2)').html('Nước ngoài: ' + new Intl.NumberFormat('EN').format(overRatios.toFixed(2)) + "%");
    $('.r-tab .tile li:nth-child(3)').html('Khác: ' + new Intl.NumberFormat('EN').format((100.0 - overRatios - percentStockCeo)) + "%");
    loadFinanceByCode();
    LoadFinanceTarget();
    LoadMoreNews();
    CreateTooltip();
});

function ShowDetail() {
    $('.modal-company-detail').modal('show');
}

function loadFinanceByCode() {
    var code = $('#finance-code').val();
    var year = $('#finance-year').val();
    var quy = $('#finance-quarter').val();
    var type = $('#finance-typeView').val();
    var params = { code: code, quy: quy, year: year, type: type };
    App.loadPartialCallback(urlCompanyFinaFinacial, params, "#content-finance", function () {
        //$('.table-kqkd').treegrid();
        //$('.table-bctc').treegrid();
        renderChartFinaceKQKD('chart-kqkd', 1, lableReportKQKD, dataReportKQKD1, dataReportKQKD2);
        renderChartFinaceKQKD('chart-cdkt', 2, lableReportCDKT, dataReportCDKT1, dataReportCDKT2);
    });
}

function getNextPropertiesBCTC() {
    var type = $('#finance-typeView').val();
    if (type == "1") {
        var quy = parseInt($("#finance-quarter").val());
        var currentYear = new Date().getFullYear();
        var year = parseInt($('#finance-year').val());
        if (quy == 4) {
            if (year < currentYear) {
                year = parseInt(year) + 1;
                $("#finance-quarter").val(1);
            } else
                year = currentYear;
            $('#finance-year').val(year);
        } else {
            if (quy < 4) {
                if (currentYear == year && quy+1 >= (new Date().getMonth() / 3)) {
                    return;
                }
                quy = parseInt(quy) + 1;
                $("#finance-quarter").val(quy);
            }
        }
    }
    else {
        var currentYear = new Date().getFullYear();
        var year = parseInt($('#finance-year').val());
        if (year < currentYear) {
            year = parseInt(year) + 1;
        } else
            year = currentYear;
        $('#finance-year').val(year);
    }
}

function getPrePropertiesBCTC() {
    var type = $('#finance-typeView').val();
    if (type == "1") {
        var quy = parseInt($("#finance-quarter").val());
        if (quy == 1) {
            $("#finance-quarter").val(4);
            var year = parseInt($('#finance-year').val());
            if (year > 2005) {
                year = parseInt(year) - 1;
            }
            $('#finance-year').val(year);
        } else {
            if (quy > 1) {
                quy = parseInt(quy) - 1;
                $("#finance-quarter").val(quy);
            }
        }
    }
    else {
        var year = parseInt($('#finance-year').val());
        if (year > 2005) {
            year = parseInt(year) - 1;
        }
        $('#finance-year').val(year);
    }
}


function financeNext() {
    getNextPropertiesBCTC();
    loadFinanceByCode();
}
function financePre() {
    getPrePropertiesBCTC();
    loadFinanceByCode();
}
function ChangeTypeView(i) {
    $('#finance-typeView').val(i);
    $('#finance-year').val(new Date().getFullYear());
    $('#finance-quarter').val(quarter_of_the_year());
    loadFinanceByCode();
}

function quarter_of_the_year() {
    var month = new Date().getMonth() + 1;
    return (Math.ceil(month / 3));
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
                        callback: (label) => new Intl.NumberFormat('en-US').format(label),
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
                        return lable + ': ' + (new Intl.NumberFormat('en-US').format(tooltipItem.value));
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
    if (page == 4)
        $(e).addClass('d-none');
    page += 1;
    $('#getnew-page').val(page);
    var code = $("#input-code").val();
    var param = { code: code, page: page };
    App.loadPartialAppendCallback(urlGetNews, param, "#company-get-news", function () { });
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
        delay: {
            //hide: 50000
        },
        title: function () {
            var code = this.getAttribute('data-code');
            var price = this.getAttribute('data-price');
            var change = this.getAttribute('data-change');
            var perchange = this.getAttribute('data-percent-change');
            var klgd = $.number(this.getAttribute('data-volume'), 0);
            var gtgd = new Intl.NumberFormat("en-IN").format(this.getAttribute('data-value'));
            var nnmua = new Intl.NumberFormat("en-IN").format( $.number(this.getAttribute('data-foreign-buy'), 0));
            var nnban = new Intl.NumberFormat("en-IN").format( $.number(this.getAttribute('data-foreign-sell'), 0));
            var priceClass = "";
            var price7DClass = "";

            if (this.getAttribute('data-change') > 0) priceClass = "green";
            if (this.getAttribute('data-change') < 0) priceClass = "red";
            if (this.getAttribute('data-change7day') > 0) price7DClass = "green";
            if (this.getAttribute('data-change7day') < 0) price7DClass = "red";

            var str = "<div class='top-tool-tip'>";
            str += "<h2>" + code + "</h2><hr/>";
            str += "<h3><span class='item1'>Giá: </span><span class='item2'>" + price + "</span><span class='item3 " + priceClass + "'>" + change + "</span><span class='item4 " + priceClass + "'>(" + perchange + "%)</span></h3>";
          /*  str += "<h3><span class='item1'>7 ngày trước:</span><span class='item2'>" + price7day + "</span><span class='item3 " + price7DClass + "'>" + change7day + "</span><span class='item4 " + price7DClass + "'>(" + perchange7day + "%)</span></h3>";*/
            str += "<h3><span class='item1'>KLGD:</span><span class='item2'>" + klgd + " cp</span><span class='item3'></span><span class='item4'></span></h3>";
            str += "<h3><span class='item1'>GTGD:</span><span class='item2'>" + gtgd + " </span><span class='item3'></span><span class='item4'></span></h3>";
            str += "<h3><span class='item1'>NN Mua:</span><span class='item2'>" + nnmua + " cp</span><span class='item3'></span><span class='item4'></span></h3>";
            str += "<h3><span class='item1'>NN Bán:</span><span class='item2'>" + nnban + " cp</span><span class='item3'></span><span class='item4'></span></h3>";
            str += "</div>";
            return str;
        }
    });
}