var Bcpt = {
    loadData: function (page) {
        var fromDate = $('#input-from-date').val();
        var toDate = $('#input-to-date').val();
        var code = $('#txt-input-code').val();
        var source = $('#ddl-source').val();
        var params = "page=" + page + "&fromDate=" + fromDate + "&toDate=" + toDate + "&code=" + code + "&source=" + source;

        App.loadPartial(bcptUrl.bcptPartialList, params, ".grid-data");
    }
}
CommonHelper.showDatePicker("#input-from-date, #input-to-date", {});
Bcpt.loadData(1);

$(document).on("click", "#common-paging .page-link", function () {
    var page = $(this).attr("data-page");
    Bcpt.loadData(page);
});

$(document).on("click", ".btn-search", function () {
    Bcpt.loadData(1);
});

