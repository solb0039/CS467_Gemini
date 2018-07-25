// Client side .js for viewing data

google.charts.load("current", { packages: ["corechart", "pie", "table"] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    $.get('/data/received', (response) => {
        console.log(response);

        // Create the data table
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Name');
        data.addColumn('number', 'Number of Awards');
        data.addRows(response);

        // Style the chart div
        document.getElementById('receivedAwards').style.height = '500px';
        document.getElementById('receivedAwards').style.width = '700px';

        // Style the chart div
        document.getElementById('receivedAwards2').style.height = '950px';
        document.getElementById('receivedAwards2').style.width = '950px';

        //create and draw the table from DIV
        var tableChart = new google.visualization.Table(document.getElementById('receivedAwards'));
        tableChart.draw(data, {showRowNumber: true, width: '100%', height: '100%' } );

        //create and draw the pie chart from DIV
        var pieChart = new google.visualization.PieChart(document.getElementById('receivedAwards2'));
        pieChart.draw(data);
    }, 'json');
}