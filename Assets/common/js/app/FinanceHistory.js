var FinanceHistory = {
    loadDataKqkd: function () {
        var type = $('#ddl-kqkd-type').val();
        if (type == "nam") {
            var code = $('#hd-company-code').val();
            var year = $('#hd-kqkd-year').val();
            var params = "code=" + code + "&year=" + year;
            App.loadPartial(financeHistory.FinanceKqkdNamPartial, params, ".grid-kqkd");
        } else {
            var code = $('#hd-company-code').val();
            var year = $('#hd-kqkd-year').val();
            var quy = $('#hd-kqkd-quarter').val();
            var params = "code=" + code + "&year=" + year + "&quy=" + quy;
            App.loadPartial(financeHistory.FinanceKqkdQuyPartial, params, ".grid-kqkd");
        }
    },
    getNamQuyKqkdPre: function () {
        var type = $('#ddl-kqkd-type').val();
        if (type == "nam") {
            var year = $('#hd-kqkd-year').val();
            if (year > 2005) {
                year = parseInt(year) - 1;
            }
            $('#hd-kqkd-year').val(year);
        }
        if (type == "quy") {
            var quy = $("#hd-kqkd-quarter").val();
            if (quy == 1) {
                $("#hd-kqkd-quarter").val(4);
                var year = $('#hd-kqkd-year').val();
                if (year > 2005) {
                    year = parseInt(year) - 1;
                }
                $('#hd-kqkd-year').val(year);
            } else {
                if (quy > 1) {
                    quy = parseInt(quy) - 1;
                    $("#hd-kqkd-quarter").val(quy);
                }
            }
        }
    },

    getNamQuyKqkdNext: function () {
        var type = $('#ddl-kqkd-type').val();
        if (type == "nam") {
            var currentYear = $("#hd-current-year").val();
            var year = $('#hd-kqkd-year').val();
            if (year < currentYear) {
                year = parseInt(year) + 1;
            }
            $('#hd-kqkd-year').val(year);
        }
        if (type == "quy") {
            var quy = $("#hd-kqkd-quarter").val();
            if (quy == 4) {
                var currentYear = $("#hd-current-year").val();
                var year = $('#hd-kqkd-year').val();
                if (year < currentYear) {
                    year = parseInt(year) + 1;
                }
                $('#hd-kqkd-year').val(year);
            } else {
                if (quy < 4) {
                    quy = parseInt(quy) + 1;
                    $("#hd-kqkd-quarter").val(quy);
                }
            }
        }
    },
    loadDataCdkt: function () {
        var type = $('#ddl-cdkt-type').val();
        if (type == "nam") {
            var code = $('#hd-company-code').val();
            var year = $('#hd-cdkt-year').val();
            var params = "code=" + code + "&year=" + year;
            App.loadPartial(financeHistory.FinanceCdktNamPartial, params, ".grid-cdkt");
        } else {
            var code = $('#hd-company-code').val();
            var year = $('#hd-cdkt-year').val();
            var quy = $('#hd-cdkt-quarter').val();
            var params = "code=" + code + "&year=" + year + "&quy=" + quy;
            App.loadPartial(financeHistory.FinanceCdktQuyPartial, params, ".grid-cdkt");
        }
    },
    getNamQuyCdktPre: function () {
        var type = $('#ddl-cdkt-type').val();
        if (type == "nam") {
            var year = $('#hd-cdkt-year').val();
            if (year > 2005) {
                year = parseInt(year) - 1;
            }
            $('#hd-cdkt-year').val(year);
        }
        if (type == "quy") {
            var quy = $("#hd-cdkt-quarter").val();
            if (quy == 1) {
                $("#hd-cdkt-quarter").val(4);
                var year = $('#hd-cdkt-year').val();
                if (year > 2005) {
                    year = parseInt(year) - 1;
                }
                $('#hd-cdkt-year').val(year);
            } else {
                if (quy > 1) {
                    quy = parseInt(quy) - 1;
                    $("#hd-cdkt-quarter").val(quy);
                }
            }
        }
    },

    getNamQuyCdktNext: function () {
        var type = $('#ddl-cdkt-type').val();
        if (type == "nam") {
            var currentYear = $("#hd-current-year").val();
            var year = $('#hd-cdkt-year').val();
            if (year < currentYear) {
                year = parseInt(year) + 1;
            }
            $('#hd-cdkt-year').val(year);
        }
        if (type == "quy") {
            var quy = $("#hd-cdkt-quarter").val();
            if (quy == 4) {
                var currentYear = $("#hd-current-year").val();
                var year = $('#hd-cdkt-year').val();
                if (year < currentYear) {
                    year = parseInt(year) + 1;
                }
                $('#hd-cdkt-year').val(year);
            } else {
                if (quy < 4) {
                    quy = parseInt(quy) + 1;
                    $("#hd-cdkt-quarter").val(quy);
                }
            }
        }
    }
}

//FinanceHistory.loadDataKqkd();
////begin cdkt
//FinanceHistory.loadDataCdkt();

$('#btn-kqkd-prev').click(function () {
    FinanceHistory.getNamQuyKqkdPre();
    FinanceHistory.loadDataKqkd();
});

$('#btn-kqkd-next').click(function () {
    FinanceHistory.getNamQuyKqkdNext();
    FinanceHistory.loadDataKqkd();
});

$('#ddl-kqkd-type').change(function () {
    FinanceHistory.loadDataKqkd();
});

$(document).on("shown.bs.tab", "#mainTab", function (event) {
    var tab = event.target.getAttribute('data-id');
    $('#hd-tab').val(tab);
    if (tab == "kqkd")
        FinanceHistory.loadDataKqkd();
    if (tab == "cdkt")
        FinanceHistory.loadDataCdkt();
});

$('#btn-cdkt-prev').click(function () {
    FinanceHistory.getNamQuyCdktPre();
    FinanceHistory.loadDataCdkt();
});

$('#btn-cdkt-next').click(function () {
    FinanceHistory.getNamQuyCdktNext();
    FinanceHistory.loadDataCdkt();
});

$('#ddl-cdkt-type').change(function () {
    FinanceHistory.loadDataCdkt();
});

$(function () {
    var tabInit = $('#hd-tab').val();
    if (tabInit == 'kqkd')
        FinanceHistory.loadDataKqkd();
    else
        FinanceHistory.loadDataCdkt();
});