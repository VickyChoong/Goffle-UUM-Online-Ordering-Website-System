window.addEventListener('DOMContentLoaded', event => {

    const noteModal = document.getElementById('noteModal');
    const noteForm = document.getElementById('noteForm');
    const orderIdInput = document.getElementById('orderIdInput');
    const noteInput = document.getElementById('noteInput');
    const editNoteBtns = document.querySelectorAll('.note-btn');

    editNoteBtns.forEach(editBtn => {
        editBtn.addEventListener('click', function () {
            const orderId = editBtn.getAttribute('data-order-id');
            const note = editBtn.getAttribute('data-note');

            orderIdInput.value = orderId;
            noteInput.value = note;
        });
    });

    // Clear form data when the modal is closed
    $(noteModal).on('hidden.bs.modal', function () {
        noteForm.reset();
    });

    const userbtns = document.querySelectorAll('.user-btn');
    userbtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const username = this.dataset.username;
            const phoneNo = this.dataset.phone;
            const password = this.dataset.password;
            const userId = this.dataset.userId;

            document.getElementById('username').value = username;
            document.getElementById('phoneNo').value = phoneNo;
            document.getElementById('password').value = password;
            document.getElementById('userId').value = userId;
        });
    });

    const userForm = document.getElementById('userForm');
    $(userModal).on('hidden.bs.modal', function () {
        userForm.reset();
    });


    const responsiveConfig = {
        details: {

            display: DataTable.Responsive.display.modal({
                header: function (row) {
                    var data = row.data();
                    return 'Details for item (' + data[0] + ')';
                }
            }),
            renderer: function (api, rowIdx, columns) {
                // Clone the columns and remove the last column (button column) from the cloned array
                const clonedColumns = columns.slice(0, -1);

                // Render the details in the modal with the modified columns array
                const data = $.map(clonedColumns, function (col, i) {
                    return '<tr data-dt-row="' + col.rowIndex + '" data-dt-column="' + col.columnIndex + '">' +
                        '<td>' + col.title + ':' + '</td> ' +
                        '<td>' + col.data + '</td>' +
                        '</tr>';
                }).join('');

                return $('<table class="table"/>').append(data);
            }
        }
    };

    const datatablesSimple = document.getElementsByClassName('jDataTable')
    if (datatablesSimple) {
        for (let i = 0; i < datatablesSimple.length; i++) {
            const tableElement = datatablesSimple[i];
            if (tableElement.getAttribute('class').includes('orderTable')) {
                new DataTable(tableElement, {
                    responsive: responsiveConfig,
                    columnDefs: [
                        {
                            targets: 6, // the target for this configuration, 0 it's the first column
                            render: $.fn.dataTable.render.ellipsis(20)
                        },
                        {
                            targets: -1, // Last column index
                            "searchable": false,
                            "orderable": false,
                            className: 'dt-body-right'
                        }
                    ]
                })
            } else if (tableElement.getAttribute('class').includes('generalTable')) {
                var length = 0
                if (tableElement.rows[0].cells.length > 4) {
                    var length = 4;
                }
                new DataTable(tableElement, {
                    responsive: responsiveConfig,
                    columnDefs: [
                        {
                            targets: length,
                            render: $.fn.dataTable.render.ellipsis(30)
                        },
                        {
                            targets: -1, // Last column index
                            "searchable": false,
                            "orderable": false,
                            className: 'dt-body-right'
                        }
                    ]
                })
            }
        }
    }
});

function createAreaChart(data, itemToReduce, yAxisLabel, dateProperty, chartId) {
    if (data === null) {
        return
    }
    // Aggregate data by date
    const aggregatedData = data.reduce((result, item) => {
        const orderDate = new Date(item[dateProperty]);
        var utcDate = orderDate.toISOString().split('T')[0];
        if (itemToReduce !== null) {
            result[utcDate] = (result[utcDate] || 0) + Number(item[itemToReduce]);
        } else {
            result[utcDate] = (result[utcDate] || 0) + 1;
        }
        return result;
    }, {});

    // Extract aggregated data for the chart
    const formattedDates = Object.keys(aggregatedData);
    const reducedData = formattedDates.map(date => aggregatedData[date]);

    // Sort dates in chronological order
    formattedDates.sort((a, b) => new Date(a) - new Date(b));

    // Chart configuration
    var ctx = document.getElementById(chartId);
    var myAreaChart = new Chart(ctx, {
        type: 'line', // Change type to 'line' for an area chart
        data: {
            labels: formattedDates,
            datasets: [{
                label: yAxisLabel,
                fill: true, // Enable area chart
                lineTension: 0.3,
                backgroundColor: "rgba(255, 117, 7, 0.2)",
                borderColor: "rgb(255, 117, 7, 1)",
                pointRadius: 5,
                pointBackgroundColor: "rgb(239, 11, 31)",
                pointBorderColor: "rgba(255, 255, 255, 0.8)",
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgb(255, 117, 7, 1)",
                pointHitRadius: 50,
                pointBorderWidth: 2,
                data: reducedData,
            }],
        },
        options: {
            animation: {
                duration: 3000, // Set the duration of the animation in milliseconds
                easing: 'easeOutQuart', // Choose the easing function for the animation
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        maxTicks: 7
                    }
                },
                y: {
                    scaleLabel: {
                        display: true,
                        labelString: yAxisLabel,
                    },
                    ticks: {
                        min: 0,
                        max: Math.max(...reducedData) + 10, // Adjust max value to show points clearly
                        maxTicks: 5
                    },
                    grid: {
                        color: "rgba(0, 0, 0, .125)",
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                }
            }
        }
    });
}


function createLineChart(data, itemToReduce, yAxisLabel, dateProperty, chartId) {
    // Aggregate data by date
    if (data === null) {
        return
    }
    const aggregatedData = data.reduce((result, item) => {
        const orderDate = new Date(item[dateProperty]);
        const utcDate = orderDate.toISOString().split('T')[0];
        if (itemToReduce !== null) {
            result[utcDate] = (result[utcDate] || 0) + Number(item[itemToReduce]);
        } else {
            result[utcDate] = (result[utcDate] || 0) + 1;
        }
        return result;
    }, {});

    // Extract aggregated data for the chart
    const formattedDates = Object.keys(aggregatedData);
    const reducedData = formattedDates.map(date => aggregatedData[date]);

    // Sort dates in chronological order
    formattedDates.sort((a, b) => new Date(a) - new Date(b));

    // Chart configuration
    var ctx = document.getElementById(chartId);
    var myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: formattedDates,
            datasets: [{
                label: yAxisLabel,
                lineTension: 0.3,
                backgroundColor: "rgb(255,117,7,0.2)",
                borderColor: "rgb(255,117,7,1)",
                pointRadius: 5,
                pointBackgroundColor: "rgb(239,11,31)",
                pointBorderColor: "rgba(255,255,255,0.8)",
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgb(255,117,7,1)",
                pointHitRadius: 50,
                pointBorderWidth: 2,
                data: reducedData,
            }],
        },
        options: {
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        maxTicks: 7
                    }
                },
                y: {
                    scaleLabel: {
                        display: true,
                        labelString: yAxisLabel,
                    },
                    ticks: {
                        min: 0,
                        max: Math.max(...reducedData) + 10, // Adjust max value to show points clearly
                        maxTicks: 5
                    },
                    grid: {
                        color: "rgba(0, 0, 0, .125)",
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                }
            }
        }
    });
}


function formatDate(date) {
    const month = date.toLocaleString('default', {month: 'short'});
    const day = date.getDate();
    return `${month} ${day}`;
}

function createBarChart(data, xLabel, yLabel, chartId) {
    if (data === null) {
        return
    }
    const xData = Object.keys(data);
    const yData = Object.values(data);
    // Bar Chart Example
    var ctx = document.getElementById(chartId);
    var myBarChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: xData,
            datasets: [{
                label: yLabel,
                backgroundColor: '#ec4b4f',
                categoryPercentage: 1.0,
                barPercentage: 1.0,
                borderWidth: 3,
                borderColor: '#f17474',
                data: yData,
            }],
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: xLabel,
                    },
                    ticks: {
                        // In version 3.x, use maxTicks instead of maxTicksLimit
                        maxTicks: 7
                    },

                },
                y: {
                    beginAtZero: true, // This is deprecated, but still valid in version 3.x
                    title: {
                        display: true,
                        text: yLabel
                    },
                    ticks: {
                        min: 0,
                        maxTicks: 5 // Instead of maxTicksLimit: 5
                    },
                    grid: {
                        display: true // Instead of gridLines: { display: true }
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                }
            }
        }
    });
}

function createPieChart(data, valueProperty, chartTitle, labelProperty, chartId) {
    if (data === null) {
        return
    }
    // Aggregate data by the specified label property
    const aggregatedData = data.reduce((result, item) => {
        const label = item[labelProperty];
        if (labelProperty !== null) {
            result[label] = (result[label] || 0) + Number(item[valueProperty]);
        } else {
            result[label] = (result[label] || 0) + 1;
        }
        return result;
    }, {});

    // Extract aggregated data for the chart
    const labels = Object.keys(aggregatedData);
    const values = Object.values(aggregatedData);

    // Pie Chart Example
    var ctx = document.getElementById(chartId)
    var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: ['#ffd079', '#dc3545', '#ff6a00', '#ff5b86', '#f18030'],
            }],
        },
        options: {
            animation: {
                duration: 4000, // Set the duration of the animation in milliseconds
                easing: 'easeOutQuart', // Choose the easing function for the animation
            },
            title: {
                display: true,
                text: chartTitle,
            },
            responsive: true,
            aspectRatio: 100 / 40,
            plugins: {
                legend: {
                    position: "right",
                    align: "middle"
                }
            }
        },
    });
}

function createWordCloud(wordData, chartId) {
    if (wordData === null) {
        return
    }
    const ctx = document.getElementById(chartId).getContext('2d');
    const jsArray = [];
    for (const [key, value] of Object.entries(wordData)) {
        jsArray.push({key: key, value: value});
    }
    console.log(jsArray)
    new Chart(ctx, {
        type: "wordCloud",
        data: {
            labels: jsArray.map(d => d.key),
            datasets: [
                {
                    label: "",
                    data: jsArray.map(d => Math.sqrt(d.value) * 15)
                }]
        },


        options: {
            title: {
                display: false,
                text: "Chart.js Word Cloud"
            },
            responsive: true,
            aspectRatio: 100 / 40,
            plugins: {
                legend: {
                    display: false,
                }
            },
        }
    });
}

function aos_init() {
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
}

window.addEventListener('load', () => {
    aos_init();
});
