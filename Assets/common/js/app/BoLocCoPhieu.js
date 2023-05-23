

var BoLocCoPhieu = {

    loadData: function (page) {

        var exCode = $('#ddl-exchange').val();
        var idNganh = $('#ddl-nganh').val();
        var xDay = $('#ddl-change-pre-x-day').val();
        var thayDoiGiaTu = $('#txt-change-pre-x-day-from').val();
        var thayDoiGiaDen = $('#txt-change-pre-x-day-to').val();
        var soPhien = $('#ddl-tang-giam-phien').val();
        var loaiTangGiam = $('#ddl-tang-giam-loai').val();
        var percentTangGiam = $('#txt-tang-giam-phien-percent').val();
        var kltbTu = $('#txt-kl5phien-from').val();
        var kltbDen = $('#txt-kl5phien-to').val();
        var klgdVuotKltb = $('#txt-klgd-vuot-gttb-tu').val();
        var rongType = $('#hd-rd-mua-ban-rong-type').val();
        var rongTu = $('#txt-nn-rong-from').val();
        var rongDen = $('#txt-nn-rong-to').val();
        var fromPrice = $('#txt-price-from').val();
        var toPrice = $('#txt-price-to').val();
        var epsTu = $('#txt-eps-from').val();
        var epsDen = $('#txt-eps-to').val();
        var peTu = $('#txt-pe-from').val();
        var peDen = $('#txt-pe-to').val();
        var vonHoaTu = $('#txt-vonhoa-from').val();
        var vonHoaDen = $('#txt-vonhoa-to').val();
        var doanhThu4QuyTu = $('#txt-doanhthu-4quy-from').val();
        var doanhThu4QuyDen = $('#txt-doanhthu-4quy-to').val();

        var obj = {
            exCode,
            idNganh,
            fromPrice,
            toPrice,
            xDay,
            thayDoiGiaTu,
            thayDoiGiaDen,
            soPhien,
            loaiTangGiam,
            percentTangGiam,
            kltbTu,
            kltbDen,
            klgdVuotKltb,
            rongType,
            rongTu,
            rongDen,
            epsTu,
            epsDen,
            peTu,
            peDen,
            vonHoaTu,
            vonHoaDen,
            doanhThu4QuyTu,
            doanhThu4QuyDen
        };
        const params = Object.keys(obj)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
            .join('&');

        App.loadPartial(stattisticUrl.boLocCoPhieu, params, "#grid-data");
    }
};


$(document).on("click", ".btn-search", function () {
    BoLocCoPhieu.loadData(1);
});

$(document).on("change", ".rd-nn-rong", function () {
    $('#hd-rd-mua-ban-rong-type').val($(this).val());
})