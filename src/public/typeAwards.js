// Client side .js for viewing data
google.charts.load("current", { packages: ["table"] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    $.get('/data/howmany', (response) => {
        console.log(response);

        // Create the data table
        var data = new google.visualization.DataTable();
        console.log(response);
        data.addColumn('string', 'Type');
        data.addColumn('number', 'Count');
        data.addRows(response);

        // Style the chart div
        document.getElementById('typeAwards').style.height = '350px';
        document.getElementById('typeAwards').style.width = '700px';

        //create and draw the chart from DIV
        var chart = new google.visualization.Table(document.getElementById('typeAwards'));
        chart.draw(data, {showRowNumber: true, width: '100%', height: '100%' });
    }, 'json');
}