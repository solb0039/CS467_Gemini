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
        document.getElementById('receivedType').style.height = '350px';
        document.getElementById('receivedType').style.width = '700px';

        //create and draw the chart from DIV
        var chart = new google.visualization.Table(document.getElementById('receivedType'));
        chart.draw(data, {showRowNumber: true, width: '100%', height: '100%' });
    }, 'json');
}