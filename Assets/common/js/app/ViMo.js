
var ViMo = {
    switchTab: function (tab) {

        if (tab === "1") {
            var params = CommonHelper.getQueryStringByForm("#gdp-form");
            App.loadPartial(vimoUrl.vimoGdp, params, "#gdp-partial");
        }
        if (tab === "2") {
            var params = CommonHelper.getQueryStringByForm("#cpi-form-month");
            App.loadPartial(vimoUrl.vimoCpi, params, "#cpi-partial");
            var params1 = CommonHelper.getQueryStringByForm("#cpi-form-year");
            App.loadPartial(vimoUrl.vimoCpi, params1, "#cpi-partial-year");
        }
        if (tab === "3") {
            var params = CommonHelper.getQueryStringByForm("#xnk-form");
            App.loadPartial(vimoUrl.vimoXuatNhapKhau, params, "#xuatnhapkhau-partial");
        }
        if (tab === "4") {
            var params = CommonHelper.getQueryStringByForm("#fdi-form");
            App.loadPartial(vimoUrl.vimoFdi, params, "#fdi-partial");
        }
        if (tab === "5") {
            var params = CommonHelper.getQueryStringByForm("#tindung-form");
            App.loadPartial(vimoUrl.vimoTinDung, params, "#tindung-partial");
        }
        if (tab === "6") {
            var params = CommonHelper.getQueryStringByForm("#dsld-form");
            App.loadPartial(vimoUrl.vimoDanSoLaoDong, params, "#dsld-partial");
        }
        if (tab === "7") {
            var params = CommonHelper.getQueryStringByForm("#vangngoaite-form");
            App.loadPartial(vimoUrl.vimoVangNgoaiTe, params, "#vangngoaite-partial");
        }
    }
}

var gdpDefautParams = CommonHelper.getQueryStringByForm("#gdp-form");
ViMo.switchTab("1", gdpDefautParams);

$(document).on("shown.bs.tab", "#mainTab", function (event) {
    var id = event.target.getAttribute('data-id');
    var selected = $('#hd-vimo-selected-tab').val();
    var arrSelected = selected.split(',');
    if (arrSelected.indexOf(id) < 0) {
        arrSelected.push(id);
        $('#hd-vimo-selected-tab').val(arrSelected.join(','));
        ViMo.switchTab(id);
    }
});

//GDP
$(document).on("click", ".btn-search-gdp", function () {

    ViMo.switchTab("1");
});

$(document).on("change", "#lbl-gdp-view-by", function () {

    var val = $(this).val();
    if (val == 0) {
        $('.gdp-group-quy').css("display", "block");
        $('.lbl-gdp-from-nam').text("Năm");
        $('.lbl-gdp-to-nam').text("Năm");
    } else {
        $('.gdp-group-quy').css("display", "none");
        $('.lbl-gdp-from-nam').text("Từ năm");
        $('.lbl-gdp-to-nam').text("Đến năm");
    }
});

//CPI
$(document).on("click", "#btn-cpi-part-month-prev", function () {
    var part = parseInt($('#hd-cpi-part-month').val());
    if (part <= 0) {
        part -= 1;
        $('#hd-cpi-part-month').val(part);
    }
    var params = CommonHelper.getQueryStringByForm("#cpi-form-month");
    App.loadPartial(vimoUrl.vimoCpi, params, "#cpi-partial");
});

$(document).on("click", "#btn-cpi-part-month-next", function () {
    var part = parseInt($('#hd-cpi-part-month').val());
    if (part < 0) {
        part += 1;
        $('#hd-cpi-part-month').val(part);
    }
    var params = CommonHelper.getQueryStringByForm("#cpi-form-month");
    App.loadPartial(vimoUrl.vimoCpi, params, "#cpi-partial");
});

$(document).on("click", "#btn-cpi-part-year-prev", function () {
    var part = parseInt($('#hd-cpi-part-year').val());
    if (part <= 0) {
        part -= 1;
        $('#hd-cpi-part-year').val(part);
    }
    var params = CommonHelper.getQueryStringByForm("#cpi-form-year");
    App.loadPartial(vimoUrl.vimoCpi, params, "#cpi-partial-year");
});

$(document).on("click", "#btn-cpi-part-year-next", function () {
    var part = parseInt($('#hd-cpi-part-year').val());
    if (part < 0) {
        part += 1;
        $('#hd-cpi-part-year').val(part);
    }
    var params = CommonHelper.getQueryStringByForm("#cpi-form-year");
    App.loadPartial(vimoUrl.vimoCpi, params, "#cpi-partial-year");
});
//Xuất nhập khẩu

$(document).on("click", ".btn-search-xnk", function () {
    var params = CommonHelper.getQueryStringByForm("#xnk-form");
    ViMo.switchTab("3", params);
});

//Fdi
$(document).on("click", ".btn-search-fdi", function () {
    var params = CommonHelper.getQueryStringByForm("#fdi-form");
    ViMo.switchTab("4", params);
});

//Tín dụng
$(document).on("click", ".btn-search-tindung", function () {
    var params = CommonHelper.getQueryStringByForm("#tindung-form");
    ViMo.switchTab("5", params);
});

//dsld
$(document).on("click", ".btn-search-dsld", function () {
    var params = CommonHelper.getQueryStringByForm("#dsld-form");
    ViMo.switchTab("6", params);
});

//vàng ngoại tệ
$(document).on("click", ".btn-search-vangngoaite", function () {
    var params = CommonHelper.getQueryStringByForm("#vangngoaite-form");
    ViMo.switchTab("7", params);
});

$('.btn-tab-tigia').click(function () {
    var tab = $(this).attr("data-tab");
    $('.btn-tab-tigia').removeClass("active");
    $(this).addClass("active");
    $('.ul-tigia').css("display", "none");
    $('.ul-tigia[data-tab="' + tab + '"]').css("display", "block");
});
$('.btn-tab-hanghoacoin').click(function () {
    var tab = $(this).attr("data-tab");
    $('.ul-hanghoacoin').css("display", "none");
    $('.btn-tab-hanghoacoin').removeClass("active");
    $(this).addClass("active");
    $('.ul-hanghoacoin[data-tab="' + tab + '"]').css("display", "block");
});
