// Client side .js for viewing data
google.charts.load("current", { packages: ["corechart", "pie", "table"] });
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
        document.getElementById('numberAwards').style.height = '500px';
        document.getElementById('numberAwards').style.width = '750px';

        // Style the chart div
        document.getElementById('numberAwards2').style.height = '950px';
        document.getElementById('numberAwards2').style.width = '950px';

        //create and draw the table from DIV
        var tableChart = new google.visualization.Table(document.getElementById('numberAwards'));
        tableChart.draw(data, {showRowNumber: true, width: '100%', height: '100%' } );

        //create and draw the pie chart from DIV
        var pieChart = new google.visualization.PieChart(document.getElementById('numberAwards2'));
        pieChart.draw(data);
    }, 'json');
}