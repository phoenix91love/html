$(function () {
    LoadMoreTechnicalTerms();
});
$(document).on("click", ".paging-event .page-link", function () {
    var page = $(this).attr("data-page");
    if (page == undefined)
        return;
    LoadMoreTechnicalTerms(page);
});
function LoadMoreTechnicalTerms(page = 1) {
    var param = { StrValue: $('#valueSearch').val(), Type: $('#type').val(), SearchType: $('#typeSearch').val(), PageIndex: page };
    App.loadPartial(urlLoadMoreTerms, param, "#content-list-terms");
}

function SearchBySymbol(e) {
    var str = $(e).attr("data-symbol");
    $('#valueSearch').val(str);
    $('#search-input').val('');
    $('div.filter-symbol ul li a').removeClass('active');
    $(e).addClass('active');
    LoadMoreTechnicalTerms(1);
}