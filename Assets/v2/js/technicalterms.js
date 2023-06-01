$(function () {
    LoadMoreTechnicalTerms();
    LoadAllTermsForComplete();

});
$(document).on("click", ".paging-event .page-link", function () {
    var page = $(this).attr("data-page");
    if (page == undefined)
        return;
    LoadMoreTechnicalTerms(page);
});
function LoadMoreTechnicalTerms(page = 1,) {
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

function SetTag(e) {
    $('#type').val($(e).attr('data-type'));
    $('.option .tag a').removeClass('active');
    $(e).addClass('active');
    LoadMoreTechnicalTerms();
}

function LoadAllTermsForComplete() {
    var params = {};
    AjaxHelper.ajaxCall(urlLoadAllTerms, params, InitAutoCompleteTechnicalTerms);
}
var dataAutoComplete;
function InitAutoCompleteTechnicalTerms(result) {
    var element = '.technical-terms-search';
    if (result.IsSuccess) {
        dataAutoComplete = result.DataObject;
        $(element).autocomplete({
            source: dataAutoComplete,
            highlightClass: 'text-danger',
            maximumItems: 10,
            treshold: 1,
            value: "TermId",
            label: "Title",
            byThreeChar: true,
            onSelectItem: function (item, element) {
                var termsId =item.value;
                let data = dataAutoComplete.find(x => x.TermId == termsId);
                window.location.href = data.Url;
                
            }
        });
    }
    
}


function SearchByText() {
    if ($('#input-technical-terms-search').val().trim() == '')
        return;
    $('#typeSearch').val(2);
    $('#valueSearch').val($('#input-technical-terms-search').val().trim());
    LoadMoreTechnicalTerms(1);
}