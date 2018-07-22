// Client side .js for viewing data

google.charts.load("current", { packages: ["corechart", "pie"] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    $.get('/data/received', (response) => {
        console.log(response);

        // Create the data table
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Name');
        data.addColumn('number', 'Has Received');
        data.addRows(response);

        // Style the chart div
        document.getElementById('receivedAwards').style.height = '950px';
        document.getElementById('receivedAwards').style.width = '950px';

        //create and draw the chart from DIV
        var chart = new google.visualization.PieChart(document.getElementById('receivedAwards'));
        chart.draw(data);
    }, 'json');
}