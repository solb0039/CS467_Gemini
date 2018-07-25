// Client side .js for viewing data
google.charts.load("current", { packages: ["table"] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    $.get('/data/type', (response) => {
        console.log(response);

        // Create the data table
        var data = new google.visualization.DataTable();
        console.log(response);
        data.addColumn('string', 'Name');
        data.addColumn('string', 'Type');
        data.addRows(response);

        // Style the chart div
        document.getElementById('receivedType').style.height = '500px';
        document.getElementById('receivedType').style.width = '700px';

        // Style the chart div
        document.getElementById('receivedType2').style.height = '500px';
        document.getElementById('receivedType2').style.width = '700px';

        //create and draw the table from DIV
        var tableChart = new google.visualization.Table(document.getElementById('receivedType'));
        tableChart.draw(data, {showRowNumber: true, width: '100%', height: '100%' });

        //create and draw the pie chart from DIV
        var pieChart = new google.visualization.PieChart(document.getElementById('receivedType2'));
        pieChart.draw(data);
    }, 'json');
}