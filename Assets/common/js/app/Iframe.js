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