// Client side .js for viewing data
google.charts.load("current", { packages: ["corechart", "pie"] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    $.get('/data/number', (response) => {
        console.log(response);

        // Create the data table
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Name');
        data.addColumn('number', 'Has Created');
        data.addRows(response);

        // Style the chart div
        document.getElementById('numberAwards').style.height = '950px';
        document.getElementById('numberAwards').style.width = '950px';

        //create and draw the chart from DIV
        var chart = new google.visualization.PieChart(document.getElementById('numberAwards'));
        chart.draw(data);
    }, 'json');
}