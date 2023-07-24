var CommonHelper = {
    showDatePicker: function (el, options) {
        $(el).datepicker({
            format: "dd/mm/yyyy",
            language: "vi",
        });
    },
    getDisplayCode(code) {
        if (code === "VN-Index") code = "VnIndex";
        if (code === "HNX-Index") code = "HnxIndex";
        if (code === "UPCOM-Index") code = "UPCoM";
        if (code === "VN30-Index") code = "VN30";
        if (code === "HNX30-Index") code = "HNX30";
        return code;
    },
    removeVietnameseTones: function (str) {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        // Some system encode vietnamese combining accent as individual utf-8 characters
        // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
        // Remove extra spaces
        // Bỏ các khoảng trắng liền nhau
        str = str.replace(/ + /g, " ");
        str = str.trim();
        // Remove punctuations
        // Bỏ dấu câu, kí tự đặc biệt
        str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
        return str;
    },
    replaceAll: function (source, stringToFind, stringToReplace) {
        var temp = source;
        var index = temp.indexOf(stringToFind);
        while (index != -1) {
            temp = temp.replace(stringToFind, stringToReplace);
            index = temp.indexOf(stringToFind);
        }

        return temp;
    },
    replacePersonName: function (str) {
        return CommonHelper.replaceAll(str.toLowerCase(), " ", "-");
    },
    getQueryStringByForm: function (formEl) {
        let form_data = new FormData(document.querySelector(formEl));
        let queryString = new URLSearchParams(form_data).toString();
        return queryString;
    },
    formatNumber: function (n, decimals) {
        return $.number(n, decimals, '.', ',');
    },
    isInTransactionTime: function () {
        var currentDate = new Date();
        const firstDate = new Date();
        firstDate.setHours(9);
        firstDate.setMinutes(15);
        firstDate.setSeconds(0);

        const secondDate = new Date();
        secondDate.setHours(15);
        secondDate.setMinutes(0);
        secondDate.setSeconds(0);
        
        var dayOfWeek = currentDate.getDay();
        console.log(currentDate, firstDate, secondDate, dayOfWeek);
        if (dayOfWeek === 0 || dayOfWeek === 6 || (currentDate < firstDate) || currentDate > secondDate) {
            return false;
        }
        return true;
    }
}

var LocalStorageHelper = {

    save: function (key, data) {
        localStorage.setItem(key, data);
    },
    remove: function (key) {
        localStorage.removeItem(key);
    },
    get: function (key) {
        return localStorage.getItem(key);
    }
}