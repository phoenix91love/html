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
                    fontSize: '10px',
                    fontWeight: 'bold'
                },
                backgroundColor: 'transparent',
                borderWidth: 0,
                shadow: false,
                positioner: function () {
                    return { x: 60, y: 0 };
                },
                valueDecimals: 0,
                shared: true,
                formatter: function () {
                    let time = Highcharts.dateFormat('%A, %e/%b/%Y %H:%M', this.points[0].point.x);
                    let index = Math.round((this.points[0].point.y + Number.EPSILON) * 100) / 100;
                    let volume = this.points[1].point.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    return code + ":" + time + "<br>Giá:" + $.number(isStock ? index / 1000 : index, 2) + ",Volume:" + $.number(volume, 0);
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
    renderChartCandleStick: function (containerId, code, priceData, volumeData, openPrice) {
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
                    let volume = this.points[1].point.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    return code + ":" + time + "<br/>Mở cửa:" + $.number(open, 2) + "<br/>Cao nhất: " + $.number(highest, 2) + "<br/>Thấp nhất: " + $.number(lowest, 2) + "<br/>Đóng cửa: " + $.number(close, 2) + "<br/>KLGD:" + $.number(volume, 0);
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
    renderChartIndex1: function (containerId, code, priceData, volumeData, openPrice, min, max) {
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
                visible: !isMobile
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
    renderChartColumnNN: function (containerId, type, buyData, sellData) {
        let chart = Highcharts.chart(containerId, {
            chart: {
                type: 'column'
            },
            title: {
                text: type == 0 ? "Giá trị giao dịch" : "Khối lượng giao dịch"
            },

            credits: {
                enabled: false
            },
            rangeSelector: {
                inputEnabled: false,
            },
            xAxis: {
                type: 'datetime',

                labels: {
                    rotation: -45,
                },
            },
            yAxis: [
                { // left y axis
                    title: {
                        enabled: false
                    },
                    labels: {
                        x: -10,
                        align: 'left',
                        formatter: function () {
                            return this.value;
                        }
                    },
                    opposite: false,
                    showFirstLabel: false
                }
            ],

            legend: {
                enabled: false
            },
            tooltip: {
                formatter: function () {
                    function renderUnit() {
                        return "";
                        if (type === 0) {
                            return ' tỷ đồng'
                        } else {
                            return ' triệu cp'
                        }
                    }
                    var points = this.points;
                    var pointsLength = points.length;
                    var tooltipMarkup = pointsLength
                        ? '<span style="font-size: 10px">' +
                        chart.time.dateFormat('%d.%m.%Y', points[0].key) +
                        "</span><br/>"
                        : "";
                    var index;
                    var y_value;
                    for (index = 0; index < pointsLength; index += 1) {
                        y_value = points[index].y;
                        tooltipMarkup +=
                            '<span style="color:' +
                            points[index].series.color +
                            '">\u25CF</span> ' +
                            points[index].series.name +
                            ": <b>" +
                            y_value + renderUnit() +
                            ' <span style="line-height: 25px;"></span></b><br/>';
                    }
                    return tooltipMarkup;
                },
                shared: true,
                crosshairs: [
                    {
                        width: 1,
                        color: "rgba(0, 0, 0, 0.1)",
                        zIndex: 3,
                    },
                    false,
                ],
                useHTML: true,
            },
            plotOptions: {
                series: {
                    //pointWidth: 10,

                }
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: type === 0 ? "Giá trị mua" : 'Khối lượng mua',
                color: '#004370',
                data: buyData,

                label: {
                    enabled: false,
                },
            }, {
                name: type === 0 ? "Giá trị bán" : 'Khối lượng bán',
                color: '#C32022',
                data: sellData,

                label: {
                    enabled: false,
                },
            }
            ],
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
        var title = type == 0 ? "Giá trị giao dịch(tỷ đồng)" : "Khối lượng giao dịch(cổ phiếu)";
        var itemTitle = type == 0 ? "Giá trị " : "Khối lượng ";
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
                        stacked: true
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index',
                },
                plugins: {
                    legend: {
                        position: 'top',
                        display: false,
                    },
                    title: {
                        display: true,
                        text: title
                    },

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
                                return "Đóng góp: " + item.raw + " điểm";
                            },
                        }
                    }
                },
                responsive: false,
                elements: {
                    bar: {
                        backgroundColor: colorize()
                    }
                }
            }
        };

        var chart = new Chart(ctx, config);
        return chart;
    },
    renderChartSlCp: function (containerId, giamSan, giam, khongDoi, tang, tangTran) {
        const ctx = document.getElementById(containerId);

        const data = {
            labels: ["Giảm sàn", "Giảm", "Không đổi", "Tăng", "Tăng trần"],
            datasets: [
                {
                    label: "x",
                    data: [giamSan],
                    borderColor: "#8eabdc",
                    backgroundColor: "#8eabdc",
                    order: 0
                },
                {
                    data: [giam],
                    borderColor: "#fc0002",
                    backgroundColor: "#fc0002",
                    order: 1
                },
                {
                    label: "y",
                    data: [khongDoi],
                    borderColor: "#fee49a",
                    backgroundColor: "#fee49a",
                    order: 2,
                },
                {
                    data: [tang],
                    borderColor: "#33a42e",
                    backgroundColor: "#33a42e",
                    order: 3
                },
                {
                    data: [tangTran],
                    borderColor: "#efc2fa",
                    backgroundColor: "#efc2fa",
                    order: 4,
                }
            ]
        };
        const config = {
            type: 'bar',
            data: data,
            height: 50,
            options: {
                interaction: {
                    intersect: false,
                    mode: 'index',
                },
                indexAxis: 'y',
                // Elements options apply to all of the options unless overridden in a dataset
                // In this case, we are setting the border of each horizontal bar to be 2px wide
                elements: {
                    bar: {
                        borderWidth: 2,
                    }
                },
                responsive: true,
                scales: {
                    x: {
                        stacked: true,
                        display: false
                    },
                    y: {
                        stacked: true,
                        display: false
                    },
                },
                plugins: {
                    legend: {
                        position: 'top',
                        display: false,
                    },
                    title: {
                        display: false,

                    }
                },
                animation: {
                    onComplete: function (chart) {
                        var chartInstance = chart.chart;
                        var ctx = chartInstance.ctx;
                        console.log(chartInstance);
                        var width = chartInstance.boxes[0].width;
                        ctx.textAlign = "center";
                        chartInstance.data.datasets.forEach((dataset, i) => {
                            var meta = chartInstance.getDatasetMeta(i);
                            var startPoint = 0;
                            Chart.helpers.each(meta.data.forEach(function (bar, index) {
                                if (dataset.data[index] > 0) {

                                    var pos = (bar.x - startPoint) + ((bar.x - startPoint) / 2);
                                    startPoint = bar.x - startPoint;
                                    ctx.fillText(dataset.data[index], pos, bar.y + 5);
                                }
                            }), this)
                        });

                    }
                }
            },
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
                    label: "GDP theo giá hiện hành (tỷ đồng)",
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
                                    return "Tăng trưởng GDP: " + item.raw + "%";
                                if (item.datasetIndex == 1)
                                    return "GDP theo giá hiện hành: " + $.number(item.raw,0) + " tỷ đồng";
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
                    label: "Đăng ký (tỷ USD)",
                    data: value1,
                    borderColor: "#50b432",
                    backgroundColor: "#50b432",
                    order: 0,
                },
                {
                    type: 'line',
                    label: "Giải ngân (tỷ USD)",
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
                    label: "Lao động",
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

                }
            },
        };

        var chart = new Chart(ctx, config);
        return chart;
    },
}