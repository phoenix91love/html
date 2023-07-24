const highchartOption = {
    lang: {
        shortMonths: [
            '01', '02', '03', '04',
            '05', '06', '07', '08',
            '09', '10', '11', '12'
        ],
        months: [
            'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4',
            'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8',
            'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
        ],
        weekdays: [
            'CN', 'T2', 'T3', 'T4', 'T5',
            'T6', 'T7'
        ]
    }
};
var ChartHelper = {
    renderChartIndex: function (containerId, code, priceData, volumeData, openPrice, min, max, isStock = true) {
        const chartAtr = {
            lineColor: '#ffb800',
            redColor: '#fc0002',
            greenColor: "#33a42e"
        };
        var color = openPrice < 0 ? chartAtr.redColor : chartAtr.greenColor;
        // create the chart
        Highcharts.setOptions(highchartOption);
        Highcharts.stockChart(containerId, {

            exporting: {
                enabled: false
            },

            credits: {
                enabled: false
            },
            rangeSelector: {
                enabled: false
            },
            scrollbar: {
                enabled: false
            },
            navigator: {
                enabled: false
            },
            title: {
                text: code.length == 3 ? "<span style='opacity: 0.5; font-size: 25px;'>" + code + "</span>" : "",
                floating: true,
                align: 'left',
                x: 50,
                y: 21,
                style: {
                    color: "#242323"
                },
                useHTML: true,
                enabled: false
            },
            xAxis: [{
                tickAmount: 3,
                lineWidth: 0,
                tickWidth: 0
            }],
            yAxis: [
                {
                    labels: {
                        align: "right",
                        x: -7,
                        formatter: function () {
                            if (isStock)
                                return new Intl.NumberFormat("es-US").format(this.value / 1000);
                            else
                                return new Intl.NumberFormat("es-US").format(this.value);
                        },
                    },
                    title: {
                        enabled: false
                    },
                    height: "70%",
                    resize: {
                        enabled: true
                    },
                    opposite: false,
                    min: min,
                    max: max,
                    plotLines: [{
                        value: openPrice,
                        color: chartAtr.lineColor,
                        dashStyle: 'shortdash',
                        width: 1.5,
                        zIndex: 3
                    }],
                    //tickAmount: 3,
                    lineWidth: 0,
                },
                {
                    labels: {
                        align: "right",
                        x: -7
                    },
                    title: {
                        enabled: false,
                    },
                    top: "75%",
                    height: "25%",
                    offset: 0,
                    opposite: false,
                    lineWidth: 0,
                }
            ],
            tooltip: {
                style: {
                    color: 'black',
                    fontSize: '12px',
                    fontWeight: 'bold'
                },
                backgroundColor: 'transparent',
                borderWidth: 0,
                shadow: false,
                positioner: function () {
                    return { x: 120, y: 0 };
                },
                valueDecimals: 0,
                shared: true,
                formatter: function () {
                    let time = Highcharts.dateFormat('%A, %e/%b/%Y %H:%M', this.points[0].point.x);
                    let index = Math.round((this.points[0].point.y + Number.EPSILON) * 100) / 100;
                    let volume = this.points[1].point.y.toString();
                    return code + ":" + time + "<br>Giá: " + CommonHelper.formatNumber(isStock ? index / 1000 : index, 2) + ", KLGD: " + CommonHelper.formatNumber(volume, 0);
                }
            },
            series: [
                {
                    type: "area",
                    name: "xxxx",
                    data: priceData,
                    dataGrouping: {
                        enabled: false
                    },

                    lineColor: "transparent",
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, color],
                            [
                                1,
                                Highcharts.color(color)
                                    .setOpacity(0.2)
                                    .get("rgba")
                            ]
                        ]
                    }

                },
                {
                    pointWidth: 2,//độ rộng cột
                    dataGrouping: {
                        enabled: false
                    },
                    type: "column",
                    name: "Khối lượng",
                    data: volumeData,
                    yAxis: 1,
                    color: 'rgb(124,181,236)'
                }
            ]
        });
    },
    renderChartCandleStick: function (containerId, code, priceData, volumeData, isStock = true) {
        const chartAtr = {
            lineColor: 'rgba(255,158,13,1)',
            redColor: 'rgba(239, 83, 80, 1)',
            greenColor: 'rgba(4, 181, 172, 1)'
        };
        // create the chart
        Highcharts.stockChart(containerId, {

            exporting: {
                enabled: false
            },

            credits: {
                enabled: false
            },
            rangeSelector: {
                enabled: false
            },
            scrollbar: {
                enabled: false
            },
            navigator: {
                enabled: false
            },
            title: {
                text: isStock ? "<span style='opacity: 0.5; font-size: 25px;'>" + code + "</span>" : "",
                floating: true,
                align: 'left',
                x: 50,
                y: 21,
                style: {
                    color: "#242323"
                },
                useHTML: true,
                enabled: false
            },
            plotOptions: {
                candlestick: {
                    color: chartAtr.redColor,
                    upColor: chartAtr.greenColor
                }
            },
            yAxis: [{
                labels: {
                    align: 'right',
                    x: -7
                },
                title: {
                    enabled: false
                },
                height: '60%',
                lineWidth: 2,
                opposite: false,
                resize: {
                    enabled: true
                }
            }, {
                labels: {
                    align: 'right',
                    x: -15
                },
                title: {
                    enabled: false
                },
                top: '65%',
                height: '35%',
                offset: 0,
                lineWidth: 2,
                opposite: false,
            }],

            tooltip: {
                split: true,
                shared: true,
                formatter: function () {
                    let time = Highcharts.dateFormat('%A, %e/%b/%Y', this.points[0].point.x);
                    let open = this.points[0].point.open;
                    let highest = this.points[0].point.high;
                    let lowest = this.points[0].point.low;
                    let close = this.points[0].point.close;
                    let volume = this.points[1].point.y.toString();
                    return code + ":" + time + "<br/>Mở cửa:" + CommonHelper.formatNumber(open, 2) + "<br/>Cao nhất: " + CommonHelper.formatNumber(highest, 2) + "<br/>Thấp nhất: " + CommonHelper.formatNumber(lowest, 2) + "<br/>Đóng cửa: " + CommonHelper.formatNumber(close, 2) + "<br/>KLGD:" + CommonHelper.formatNumber(volume, 0);
                },
                style: {
                    fontSize: 12
                }
            },

            series: [{
                type: 'candlestick',
                name: code,
                data: priceData
            }, {
                type: 'column',
                name: 'KLGD',
                data: volumeData,
                yAxis: 1,
                color: 'rgb(124,181,236)'
            }]
        });
    },
    renderChartIndex1: function (containerId, code, priceData, volumeData, openPrice, min, max, showx=true) {
        var isMobile = $("body").hasClass("mobile");

        const chartAtr = {
            lineColor: '#ffb800',
            redColor: '#fc0002',
            greenColor: "#33a42e"
        };
        var color = openPrice < 0 ? chartAtr.redColor : chartAtr.greenColor;
        // create the chart
        Highcharts.setOptions(highchartOption);
        Highcharts.stockChart(containerId, {
            chart: {
                backgroundColor: "#ffffff26",
            },

            exporting: {
                enabled: false
            },

            credits: {
                enabled: false
            },
            rangeSelector: {
                enabled: false
            },
            scrollbar: {
                enabled: false
            },
            navigator: {
                enabled: false
            },

            title: {
                enabled: false
            },
            xAxis: [{
                tickColor: '#f3f3f3',
                lineWidth: 0,
                tickInterval: 1800 * 1000,
                tickWidth: 1,
                visible: showx ? !isMobile : false
            }],
            yAxis: [
                {
                    labels: {
                        align: "left",
                        x: 3,
                        enabled: !isMobile
                    },
                    title: {
                        enabled: false
                    },
                    lineWidth: 1,
                    resize: {
                        enabled: true
                    },
                    opposite: false,
                    min: min,
                    plotLines: [{
                        value: openPrice,
                        color: chartAtr.lineColor,
                        dashStyle: 'shortdash',
                        width: 1.5,
                        zIndex: 3
                    }],
                    lineWidth: 0,
                    visible: showx ? !isMobile : false
                }
            ],
            tooltip: {
                enabled: false
            },
            series: [
                {
                    type: "area",
                    name: "xxxx",
                    data: priceData,
                    dataGrouping: {
                        enabled: false
                    },

                    lineColor: "transparent",
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, color],
                            [
                                1,
                                Highcharts.color(color)
                                    .setOpacity(0.2)
                                    .get("rgba")
                            ]
                        ]
                    }

                }
            ]
        });
    },
    renderChartStackColumn: function (containerId, title, data1, data2) {
        var colors = [];
        colors[0] = "#0f0";//tăng
        colors[1] = "#ff3737";//giảm
        colors[2] = "#ffd900";//ko đổi

        var colors1 = [];
        colors1[0] = "#ff25ff";//trần
        colors1[1] = "#1eeeee";//sàn
        colors1[2] = "#ffd900";//ko đổi

        Highcharts.chart(containerId, {
            chart: {
                type: 'column',
                height: '250px'
            },

            exporting: {
                enabled: false
            },
            title: {
                text: title,
                align: 'center',
                enabled: false
            },
            xAxis: {
                categories: ['Tăng', 'Giảm', 'Không đổi']
            },
            yAxis: {
                min: 0,
                labels: {
                    enabled: false
                },


                title: {
                    enabled: false,
                    text: 'Count trophies'
                },
                stackLabels: {
                    enabled: false,
                    style: {
                        fontWeight: 'bold',
                        color: ( // theme
                            Highcharts.defaultOptions.title.style &&
                            Highcharts.defaultOptions.title.style.color
                        ) || 'gray',
                        textOutline: 'none'
                    }
                }
            },
            legend: {
                enabled: false
            },
            tooltip: {
                enabled: false,
                shared: false,
                formatter: function () {

                    var point0 = this.points[0];
                    var point = point0.point;

                    var series = point0.series;
                    console.log("point: ", series.name);
                    var s = '<b>' + point.category + '</b><br/>';
                    if (point.category == "Tăng" && series.name == "Series 1")
                        s = '<b>' + point.category + ' trần</b><br/>';

                    if (point.category == "Giảm" && series.name == "Series 2")
                        s = '<b>' + point.category + ' sàn</b><br/>';
                    s = s + 'xxx:' + point.y + '<br/>Tổng: ' + point.stackTotal;
                    return s;
                },
                pointFormat: '{series.name}: {point.y}<br/>Tổng: {point.stackTotal}'
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true
                    },
                    colorByPoint: true
                }
            },
            series: [{
                data: data1,
                colors: colors,
            }, {
                data: data2,
                colors: colors1
            }]
        });
    },
    renderChartColumnNNChartJs: function (containerId, type, time, buyData, sellData, rongData) {

        const ctx = document.getElementById(containerId);
        var title = type == 0 ? "Giá trị giao dịch (tỷ đồng)" : "Khối lượng giao dịch (cổ phiếu)";
        var itemTitle = type == 0 ? "Giá trị " : "Khối lượng ";
        var unit = type == 0 ? " (tỷ đồng)" : " (cổ phiếu)";
        const labels = time;

        const data = {
            labels: labels,
            datasets: [
                {
                    label: itemTitle + 'mua',
                    data: buyData,
                    borderColor: "blue",
                    backgroundColor: "blue",
                    order: 1
                },
                {
                    label: itemTitle + 'bán',
                    data: sellData,
                    borderColor: "red",
                    backgroundColor: "red",
                    order: 2
                },
                {
                    label: itemTitle + 'ròng',
                    data: rongData,
                    borderColor: "#dda055",
                    backgroundColor: "#dda055",
                    order: 0,
                    type: 'line',
                }
            ]
        };
        const config = {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                scales: {
                    x: {
                        stacked: true,
                    },
                    y: {
                        stacked: true,
                        ticks: {
                            // Include a dollar sign in the ticks
                            callback: function (value, index, ticks) {
                                return CommonHelper.formatNumber(value);
                            }
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index',
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        display: true,
                        labels: {
                            boxWidth: 10,
                            boxHeight: 10
                        }
                    },
                    title: {
                        display: true,
                        text: title
                    },
                    tooltip: {
                        callbacks: {

                            label: function (item) {
                                if (item.datasetIndex == 0)
                                    return itemTitle + "mua: " + CommonHelper.formatNumber(item.raw, 2) + unit;
                                if (item.datasetIndex == 1)
                                    return itemTitle + "bán: " + CommonHelper.formatNumber(item.raw, 2) + unit;
                                if (item.datasetIndex == 2)
                                    return itemTitle + "ròng: " + CommonHelper.formatNumber(item.raw, 2) + unit;
                            },
                        }
                    }
                }
            },
        };

        var chart = new Chart(ctx, config);
        return chart;
    },
    renderChart10CpAnhHuong: function (containerId, labels, dataTop) {

        const ctx = document.getElementById(containerId);

        const data = {
            labels: labels,
            datasets: [
                {

                    data: dataTop,

                    order: 0
                }
            ]
        };

        function colorize() {
            return (ctx) => {
                const v = ctx.parsed.y;
                const c = v > 0 ? '#33A42E' : "#e45959";

                return c;
            };
        }
        const config = {
            type: 'bar',
            data: data,
            options: {
                plugins: {
                    legend: {
                        display: false,
                    },
                    title: {
                        display: false,
                    },
                    tooltip: {
                        callbacks: {

                            label: function (item) {
                                return "Đóng góp: " + CommonHelper.formatNumber(item.raw, 2) + " điểm";
                            },
                        },
                    }
                },
                responsive: false,
                elements: {
                    bar: {
                        backgroundColor: colorize()
                    }
                },
                interaction: {
                    mode: 'point'
                }
            }
        };
        ctx.onclick = (evt) => {
            const res = chart.getElementsAtEventForMode(
                evt,
                'nearest',
                { intersect: true },
                true
            );
            // If didn't click on a bar, `res` will be an empty array
            if (res.length === 0) {
                return;
            }
            window.open(configCommonUrl.companyDetail + chart.data.labels[res[0].index], "_self");
        };
        var chart = new Chart(ctx, config);
        return chart;
    },
    renderChartGdp: function (containerId, time, percentData, valueData) {

        const ctx = document.getElementById(containerId);
        var title = "GDP";
        const labels = time;

        const data = {
            labels: labels,
            datasets: [
                {
                    type: 'line',
                    label: "Tăng trưởng GDP (%)",
                    data: percentData,
                    borderColor: "#50b432",
                    backgroundColor: "#50b432",
                    order: 0,
                    yAxisID: 'y',
                },
                {
                    type: 'bar',
                    label: "GDP theo giá hiện hành ( triệu tỷ đồng)",
                    data: valueData,
                    borderColor: "#058dc7",
                    backgroundColor: "#058dc7",
                    order: 1,
                    yAxisID: 'y1',
                }
            ]
        };
        const config = {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    y: {
                        display: true,
                        position: 'left',
                    },
                    y1: {
                        display: true,
                        position: 'right',
                        // grid line settings
                        grid: {
                            drawOnChartArea: false, // only want the grid lines for one axis to show up
                        },
                        ticks: {
                            // Include a dollar sign in the ticks
                            callback: function (value, index, ticks) {
                                return CommonHelper.formatNumber(value / 1000000);
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index',
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        display: true,
                    },
                    title: {
                        display: false,
                        text: title
                    },
                    tooltip: {
                        callbacks: {

                            label: function (item) {
                                if (item.datasetIndex == 0)
                                    return "Tăng trưởng GDP: " + CommonHelper.formatNumber(item.raw, 2) + " (%)";
                                if (item.datasetIndex == 1)
                                    return "GDP theo giá hiện hành: " + CommonHelper.formatNumber(item.raw / 1000000, 2) + " ( triệu tỷ đồng)";
                            },
                        }
                    }
                }
            },
        };

        var chart = new Chart(ctx, config);
        return chart;
    },
    renderChartCpi: function (containerId, time, dataValue) {

        const ctx = document.getElementById(containerId);
        var title = "CPI";
        const labels = time;

        const data = {
            labels: labels,
            datasets: [
                {
                    type: 'bar',
                    label: "Chỉ số giá tiêu dùng",
                    data: dataValue,
                    borderColor: "#058dc7",
                    backgroundColor: "#058dc7",
                    order: 0,
                }
            ]
        };
        const config = {
            type: 'bar',
            data: data,

            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index',
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        display: false,
                    },
                    title: {
                        display: false,
                        text: title
                    },
                    tooltip: {
                        callbacks: {
                            label: function (item) {
                                if (item.datasetIndex == 0)
                                    return "Chỉ số giá tiêu dùng: " + CommonHelper.formatNumber(item.raw, 2);
                            },
                        }
                    }
                }
            },
        };

        var chart = new Chart(ctx, config);
        return chart;
    },
    renderChartXnk: function (containerId, time, value1, value2, value3) {

        const ctx = document.getElementById(containerId);
        var title = "GDP";
        const labels = time;

        const data = {
            labels: labels,
            datasets: [
                {
                    type: 'line',
                    label: "Cán cân thương mại",
                    data: value3,
                    borderColor: "#ee7224",
                    backgroundColor: "#ee7224",
                    order: 0,
                },
                {
                    type: 'bar',
                    label: "Xuất khẩu",
                    data: value1,
                    borderColor: "#058dc7",
                    backgroundColor: "#058dc7",
                    order: 1,
                },
                {
                    type: 'bar',
                    label: "Nhập khẩu",
                    data: value2,
                    borderColor: "#50b432",
                    backgroundColor: "#50b432",
                    order: 2,
                }
            ]
        };
        const config = {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: true,
                interaction: {
                    intersect: false,
                    mode: 'index',
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        display: true,
                    },
                    title: {
                        display: false,
                        text: title
                    },
                    tooltip: {
                        callbacks: {
                            label: function (item) {
                                if (item.datasetIndex == 0)
                                    return "Cán cân thương mại: " + CommonHelper.formatNumber(item.raw, 0) + " (triệu USD)";
                                if (item.datasetIndex == 1)
                                    return "Xuất khẩu: " + CommonHelper.formatNumber(item.raw, 0) + " (triệu USD)";
                                if (item.datasetIndex == 2)
                                    return "Nhập khẩu: " + CommonHelper.formatNumber(item.raw, 0) + " (triệu USD)";
                            },
                        }
                    }
                }
            },
        };

        var chart = new Chart(ctx, config);
        return chart;
    },
    renderChartFdi: function (containerId, time, value1, value2) {

        const ctx = document.getElementById(containerId);
        var title = "GDP";
        const labels = time;

        const data = {
            labels: labels,
            datasets: [
                {
                    type: 'line',
                    label: "Đăng ký",
                    data: value1,
                    borderColor: "#50b432",
                    backgroundColor: "#50b432",
                    order: 0,
                },
                {
                    type: 'line',
                    label: "Giải ngân",
                    data: value2,
                    borderColor: "#058dc7",
                    backgroundColor: "#058dc7",
                    order: 1,
                }
            ]
        };
        const config = {
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: true,
                interaction: {
                    intersect: false,
                    mode: 'index',
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        display: true,
                    },
                    title: {
                        display: false,
                        text: title
                    },
                    tooltip: {
                        callbacks: {

                            label: function (item) {
                                if (item.datasetIndex == 0)
                                    return "Đăng ký: " + CommonHelper.formatNumber(item.raw, 2) + " (tỷ USD)";
                                if (item.datasetIndex == 1)
                                    return "Giải ngân FDI: " + CommonHelper.formatNumber(item.raw, 2) + " (tỷ USD)";
                            },
                        }
                    }
                }
            },
        };

        var chart = new Chart(ctx, config);
        return chart;
    },
    renderChartTinDung: function (containerId, time, values1, values2, values3, values4) {

        const ctx = document.getElementById(containerId);
        var title = "Tín dụng";
        const labels = time;

        const data = {
            labels: labels,
            datasets: [
                {
                    type: 'bar',
                    label: "Tín dụng (MoM)",
                    data: values1,
                    borderColor: "#058dc7",
                    backgroundColor: "#058dc7",
                    order: 2,
                    yAxisID: 'y',
                },
                {
                    type: 'bar',
                    label: "Cung tiền M2 (MoM)",
                    data: values2,
                    borderColor: "#50b432",
                    backgroundColor: "#50b432",
                    order: 3,
                    yAxisID: 'y',
                },
                {
                    type: 'line',
                    label: "Tăng trưởng tín dụng (YoY)",
                    data: values3,
                    borderColor: "#3b1b70",
                    backgroundColor: "#3b1b70",
                    order: 0,
                    yAxisID: 'y1',
                },
                {
                    type: 'line',
                    label: "Tăng trưởng Cung tiền M2 (YoY)",
                    data: values4,
                    borderColor: "#ee7224",
                    backgroundColor: "#ee7224",
                    order: 1,
                    yAxisID: 'y1',
                }
            ]
        };
        const config = {
            type: 'bar',
            data: data,
            options: {
                //responsive: true,
                //maintainAspectRatio: true,
                scales: {
                    y: {
                        display: true,
                        position: 'left',
                    },
                    y1: {
                        display: true,
                        position: 'right',
                        // grid line settings
                        grid: {
                            drawOnChartArea: false, // only want the grid lines for one axis to show up
                        },
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index',
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        display: true,
                    },
                    title: {
                        display: false,
                        text: title
                    },
                    tooltip: {
                        callbacks: {
                            label: function (item) {
                                if (item.datasetIndex == 0)
                                    return "Tín dụng (MoM): " + CommonHelper.formatNumber(item.raw, 2);
                                if (item.datasetIndex == 1)
                                    return "Cung tiền M2 (MoM): " + CommonHelper.formatNumber(item.raw, 2);
                                if (item.datasetIndex == 2)
                                    return "Tăng trưởng tín dụng (YoY): " + CommonHelper.formatNumber(item.raw, 2);
                                if (item.datasetIndex == 3)
                                    return "Tăng trưởng Cung tiền M2 (YoY): " + CommonHelper.formatNumber(item.raw, 2);
                            },
                        }
                    }
                }
            },
        };

        var chart = new Chart(ctx, config);
        return chart;
    },
    renderChartDsld: function (containerId, time, values1, values2, values3) {

        const ctx = document.getElementById(containerId);
        var title = "Tín dụng";
        const labels = time;

        const data = {
            labels: labels,
            datasets: [
                {
                    type: 'bar',
                    label: "Dân số",
                    data: values1,
                    borderColor: "#058dc7",
                    backgroundColor: "#058dc7",
                    order: 1,
                    yAxisID: 'y',
                },
                {
                    type: 'bar',
                    label: "Số lượng lao động",
                    data: values2,
                    borderColor: "#50b432",
                    backgroundColor: "#50b432",
                    order: 2,
                    yAxisID: 'y',
                },
                {
                    type: 'line',
                    label: "Tỉ lệ lao động",
                    data: values3,
                    borderColor: "#ee7224",
                    backgroundColor: "#ee7224",
                    order: 0,
                    yAxisID: 'y1',
                }
            ]
        };
        const config = {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    y: {
                        display: true,
                        position: 'left',
                    },
                    y1: {
                        display: true,
                        position: 'right',
                        // grid line settings
                        grid: {
                            drawOnChartArea: false, // only want the grid lines for one axis to show up
                        },
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index',
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        display: true,
                    },
                    title: {
                        display: false,
                        text: title
                    },
                    tooltip: {
                        callbacks: {

                            label: function (item) {
                                if (item.datasetIndex == 0)
                                    return "Dân số: " + CommonHelper.formatNumber(item.raw, 2) + " (triệu người)";
                                if (item.datasetIndex == 1)
                                    return "Số lượng lao động: " + CommonHelper.formatNumber(item.raw, 2) + " (triệu người)";
                                if (item.datasetIndex == 2)
                                    return "Tỉ lệ lao động: " + CommonHelper.formatNumber(item.raw, 2) + "(%)";
                            },
                        }
                    }
                }
            },
        };

        var chart = new Chart(ctx, config);
        return chart;
    },

    renderChartVangSjc: function (containerId, time, values1, values2) {

        const ctx = document.getElementById(containerId);
        const title = "Giá vàng SJC Hà Nội";
        const labels = time;

        const data = {
            labels: labels,
            datasets: [
                {
                    type: 'line',
                    label: "Giá mua",
                    data: values2,
                    borderColor: "#50b432",
                    backgroundColor: "#50b432",
                    order: 1,
                },
                {
                    type: 'line',
                    label: "Giá bán",
                    data: values1,
                    borderColor: "#ee7224",
                    backgroundColor: "#ee7224",
                    order: 0,
                }
            ]
        };
        const config = {
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index',
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        display: true,
                    },
                    title: {
                        display: true,
                        text: title
                    },
                    tooltip: {
                        callbacks: {
                            label: function (item) {
                                if (item.datasetIndex == 0)
                                    return "Giá mua: " + CommonHelper.formatNumber(item.raw, 0);
                                if (item.datasetIndex == 1)
                                    return "Giá bán: " + CommonHelper.formatNumber(item.raw, 0);
                            },
                        }
                    }
                }
            },
        };

        var chart = new Chart(ctx, config);
        return chart;
    },
    renderChartVangUSD: function (containerId, time, values1, values2) {

        const ctx = document.getElementById(containerId);
        const title = "Giá USD";
        const labels = time;

        const data = {
            labels: labels,
            datasets: [
                {
                    type: 'line',
                    label: "Giá mua",
                    data: values2,
                    borderColor: "#50b432",
                    backgroundColor: "#50b432",
                    order: 1,
                },
                {
                    type: 'line',
                    label: "Giá bán",
                    data: values1,
                    borderColor: "#ee7224",
                    backgroundColor: "#ee7224",
                    order: 0,
                }
            ]
        };
        const config = {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index',
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        display: true,
                    },
                    title: {
                        display: true,
                        text: title
                    },
                    tooltip: {
                        callbacks: {
                            label: function (item) {
                                if (item.datasetIndex == 0)
                                    return "Giá mua: " + CommonHelper.formatNumber(item.raw, 0);
                                if (item.datasetIndex == 1)
                                    return "Giá bán: " + CommonHelper.formatNumber(item.raw, 0);
                            },
                        }
                    }
                }
            },
        };

        var chart = new Chart(ctx, config);
        return chart;
    },

    renderChartDongTienChartJs: function (containerId, data) {

        const ctx = document.getElementById(containerId);
        var title = "Diễn biến dòng tiền 5 phiên gần nhất";
        var date1 = data.Date[0];
        var date2 = data.Date[1];
        var date3 = data.Date[2];
        var date4 = data.Date[3];
        var date5 = data.Date[4];
        var datasets = [];
        if (data.Day1.length > 0) {
            datasets.push({
                type: 'line',
                label: date1,
                data: data.Day1,
                borderWidth: 1.5,
                borderColor: "blue",
                backgroundColor: "blue",
                order: 0
            });
        }
        if (data.Day2.length > 0) {
            datasets.push({
                type: 'line',
                label: date2,
                data: data.Day2,
                borderWidth: 1.5,
                borderColor: "red",
                backgroundColor: "red",
                order: 1
            });
        }
        if (data.Day3.length > 0) {
            datasets.push({
                type: 'line',
                label: date3,
                data: data.Day3,
                borderWidth: 1.5,
                borderColor: "green",
                backgroundColor: "green",
                order: 2,
            });
        }
        if (data.Day4.length > 0) {
            datasets.push({
                type: 'line',
                label: date4,
                data: data.Day4,
                borderWidth: 1.5,
                borderColor: "cyan",
                backgroundColor: "cyan",
                order: 3,

            });
        }
        if (data.Day5.length > 0) {
            datasets.push({
                type: 'line',
                label: 'Hiện tại',
                data: data.Day5,
                borderWidth: 2,
                borderColor: "purple",
                backgroundColor: "purple",
                order: 4,
            });
        }
        var unit = " (tỷ đồng)";

        const dataConfig = {
            labels: data.Time,
            datasets: datasets
        };
        const config = {
            type: 'line',
            data: dataConfig,
            options: {
                responsive: true,

                elements: {

                    point: {
                        radius: 0
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index',
                },
                scales: {

                    y: {
                        ticks: {
                            // forces step size to be 50 units
                            stepSize: 2000
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        display: true,
                        labels: {
                            boxWidth: 10,
                            boxHeight: 10
                        }
                    },
                    title: {
                        display: true,
                        text: title
                    },
                    tooltip: {
                        callbacks: {

                            label: function (item) {
                                if (item.datasetIndex == 0)
                                    return date1 + ": " + CommonHelper.formatNumber(item.raw, 2) + unit;
                                if (item.datasetIndex == 1)
                                    return date2 + ": " + CommonHelper.formatNumber(item.raw, 2) + unit;
                                if (item.datasetIndex == 2)
                                    return date3 + ": " + CommonHelper.formatNumber(item.raw, 2) + unit;
                                if (item.datasetIndex == 3)
                                    return date4 + ": " + CommonHelper.formatNumber(item.raw, 2) + unit;
                                if (item.datasetIndex == 4)
                                    return date5 + ": " + CommonHelper.formatNumber(item.raw, 2) + unit;
                            },
                        }
                    }
                }
            },
        };

        var chart = new Chart(ctx, config);
        return chart;
    },
    renderChartTop5NganhChartJs: function (containerId, data) {

        const ctx = document.getElementById(containerId);
        var title = "Top 5 ngành hút tiền nhiều nhất (phiên hiện tại)";
        var nganh1 = data.Nganh[0];
        var nganh2 = data.Nganh[1];
        var nganh3 = data.Nganh[2];
        var nganh4 = data.Nganh[3];
        var nganh5 = data.Nganh[4];

        var val1 = data.NganhValue[0];
        var val2 = data.NganhValue[1];
        var val3 = data.NganhValue[2];
        var val4 = data.NganhValue[3];
        var val5 = data.NganhValue[4];

        var datasets = [];
        datasets.push({
            type: 'bar',
            barPercentage: 2,
            label: nganh1,
            data: [{ x: nganh1, y: val1 }],
            bordercolor: "blue",
            backgroundColor: "blue",
            order: 0
        });
        datasets.push({
            type: 'bar',
            barPercentage: 2,
            label: nganh2,
            data: [{ x: nganh2, y: val2 }],
            bordercolor: "red",
            backgroundColor: "red",
            order: 1
        });
        datasets.push({
            type: 'bar',
            barPercentage: 2,
            label: nganh3,
            data: [{ x: nganh3, y: val3 }],
            borderColor: "green",
            backgroundColor: "green",
            order: 2,
        });
        datasets.push({
            type: 'bar',
            barPercentage: 2,
            label: nganh4,
            data: [{ x: nganh4, y: val4 }],
            borderColor: "cyan",
            backgroundColor: "cyan",
            order: 3,

        });
        datasets.push({
            type: 'bar',
            barPercentage: 2,
            label: nganh5,
            data: [{ x: nganh5, y: val5 }],
            borderColor: "purple",
            backgroundColor: "purple",
            order: 4,
        });
        var unit = " (tỷ đồng)";

        const dataConfig = {
            datasets: datasets
        };
        const config = {
            type: 'bar',
            data: dataConfig,
            options: {
                responsive: true,

                interaction: {
                    intersect: false,
                    mode: 'index',
                },
                scales: {
                    x: {
                        display: true,
                    },
                    y: {
                        ticks: {
                            // forces step size to be 50 units
                            stepSize: 100
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        display: false,
                        align: 'center',
                    },
                    title: {
                        display: true,
                        text: title
                    },
                    tooltip: {
                        callbacks: {

                            label: function (item) {
                                if (item.datasetIndex == 0)
                                    return nganh1 + ": " + CommonHelper.formatNumber(item.raw.y, 2) + unit;
                                if (item.datasetIndex == 1)
                                    return nganh2 + ": " + CommonHelper.formatNumber(item.raw.y, 2) + unit;
                                if (item.datasetIndex == 2)
                                    return nganh3 + ": " + CommonHelper.formatNumber(item.raw.y, 2) + unit;
                                if (item.datasetIndex == 3)
                                    return nganh4 + ": " + CommonHelper.formatNumber(item.raw.y, 2) + unit;
                                if (item.datasetIndex == 4)
                                    return nganh5 + ": " + CommonHelper.formatNumber(item.raw.y, 2) + unit;
                            },
                        }
                    }
                }
            },
        };

        var chart = new Chart(ctx, config);
        return chart;
    },
}