

var PriceHistory = {
    loadCompany: function () {
        var exCode = $('#ddl-exchange').val();
        CommonIndex.loadCompany(exCode, 1, 0, function (result) {
            if (result.ErrCode != "01") {

                var code = $('#input-code').val();
                if (code != "") {
                    var itemByCode = result.DataList.find(x => x.Code === code);
                    if (itemByCode != null) {
                        $('#txt-input-code').val(itemByCode.Name);
                    }
                }
                $('#txt-input-code').autocomplete({
                    source: result.DataList,
                    highlightClass: 'text-danger',
                    treshold: 1,
                    value: "Code",
                    label: "Name",
                    onSelectItem: function (item, element) {
                        $('#input-code').val(item.value);
                        PriceHistory.loadData(1);
                    }
                });
            }
        });
    },
    loadData: function (page) {
        var tab = $('#hd-tab').val();
        var fromDate = $('#input-from-date').val();
        var toDate = $('#input-to-date').val();
        var code = $('#input-code').val();
        if (code === "")
            code = $('#txt-input-code').val();

        var exId = $('#ddl-exchange').val();
        var params = "page=" + page + "&fromDate=" + fromDate + "&toDate=" + toDate + "&exId=" + exId + "&code=" + code;
        if (tab === "1") {
            App.loadPartial(historyUrl.priceHistory, params, "#1a");
        }
        if (tab === "2") {
            App.loadPartial(historyUrl.orderHistory, params, "#2a");
        }
        if (tab === "3") {
            App.loadPartial(historyUrl.KLNDTNNHistory, params, "#3a");
        }
    }
};
PriceHistory.loadCompany();
PriceHistory.loadData(1);
CommonHelper.showDatePicker("#input-from-date, #input-to-date", {});

$(document).on("click", "#common-paging-price-history .page-link", function () {
    var page = $(this).attr("data-page");
    PriceHistory.loadData(page);
});
$(document).on("click", "#common-paging-order-history .page-link", function () {
    var page = $(this).attr("data-page");
    PriceHistory.loadData(page);
});
$(document).on("click", "#common-paging-ndttnn-history .page-link", function () {
    var page = $(this).attr("data-page");
    PriceHistory.loadData(page);
});

$(".btn-search").click(function () {
    PriceHistory.loadData(1);
});

$(document).on("shown.bs.tab", "#mainTab", function (event) {
    $('#hd-tab').val(event.target.getAttribute('data-id'));
    PriceHistory.loadData(1);
});

$('#ddl-exchange').change(function () {
    PriceHistory.loadCompany();
});

$('#txt-input-code').mouseleave(function (e) {
    e.preventDefault();
    var value = $(this).val();
    if (value == "") {
        $('#input-code').val("");
    }
});
