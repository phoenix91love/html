var Events = {
    loadData: function (page) {
        var fromDate = $('#input-from-date').val();
        var toDate = $('#input-to-date').val();
        var code = $('#input-code').val();
        if (code === "")
            code = $('#txt-input-code').val();
        var exCode = $('#ddl-exchange').val();

        var type = $('#hd-type').val();
        var cateId = $('#ddl-type').val();
        var params = "page=" + page + "&fromDate=" + fromDate + "&toDate=" + toDate + "&exchangeCode=" + exCode + "&code=" + code + "&type=" + type + "&cateId=" + cateId;

        App.loadPartial(eventUrl.eventPartialList, params, ".grid-data");
    },
    loadCompany: function () {
        var exCode = $('#ddl-exchange').val();
        CommonIndex.loadCompany(exCode, 0, 0, function (result) {
            if (result.ErrCode != "01") {

                $('#txt-input-code').autocomplete({
                    source: result.DataList,
                    highlightClass: 'text-danger',
                    treshold: 1,
                    value: "Code",
                    label: "Name",
                    onSelectItem: function (item, element) {
                        $('#input-code').val(item.value);
                    }
                });
            }
        });
    }
}
CommonHelper.showDatePicker("#input-from-date, #input-to-date", {});
Events.loadCompany();
Events.loadData(1);


$(document).on("click", "#common-paging .page-link", function () {
    var page = $(this).attr("data-page");
    Events.loadData(page);
});

$(document).on("change", "#ddl-type", function () {
    var type = $(this).find(':selected').attr('data-type');
    $('#hd-type').val(type);
});


$(document).on("click", ".btn-search", function () {
    Events.loadData(1);
});
$(document).on("mouseleave", "#txt-input-code", function () {
    var value = $(this).val();
    if (value == "") {
        $('#input-code').val("");
    }
});
$(document).on("click", ".a-btn-show-modal-detail", function () {
    var id = $(this).attr("data-id");
    var title = $("#title-" + id).html();
    var url = $("#link-download-" + id).html();
    var content = $("#content-" + id).html();
    $("#event-detail-title").html("");
    $("#event-detail-content").html("");
    $("#event-detail-download").html("");

    $("#event-detail-title").html(title);
    $("#event-detail-content").html(content);
    if (url != "" && url != null)
        $("#event-detail-download").html("<a target='_blank' href=" + url + ">" + url + "</a>");

    $('.modal-detail').modal('show');
});
