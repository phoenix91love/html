function loadReportProfession(date, exchangeId) {
    var params = { date: date, exchangeId: exchangeId };
    App.loadPartialCallback(urlLoadReportProfess, params, "#container-profess", function () {
        $('.table-bctc').treegrid();
    });
}
$(function () {
    $('#datelast').datepicker({
        format: 'mm/dd/yyyy',
        daysOfWeekDisabled: '0,6',
        autoclose: true,
        endDate: '+1d',
        datesDisabled: '+1d'
    });
    $('#datelast').datepicker('setDate', new Date())
    var date = $("#datelast").data('datepicker').getFormattedDate('yyyy-mm-dd');
    loadReportProfession(date, 0);
});

function loadDataReportProfession() {
    var date = $("#datelast").data('datepicker').getFormattedDate('yyyy-mm-dd');
    var exchangeId = $('#exchange').val();
    loadReportProfession(date,exchangeId);
}


function ViewChildProfession(e) {
    var id = $(e).attr('data-id');
    $('tr.treegrid-' + id + ' .treegrid-expander').click();
}