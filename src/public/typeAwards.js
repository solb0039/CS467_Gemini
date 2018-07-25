// Client side .js for viewing data
google.charts.load("current", { packages: ["corechart", "pie", "table"] });
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
        document.getElementById('typeAwards').style.height = '500px';
        document.getElementById('typeAwards').style.width = '700px';

        // Style the chart div
        document.getElementById('typeAwards2').style.height = '950px';
        document.getElementById('typeAwards2').style.width = '950px';

        //create and draw the table from DIV
        var tableChart = new google.visualization.Table(document.getElementById('typeAwards'));
        tableChart.draw(data, {showRowNumber: true, width: '100%', height: '100%' });

        // create and draw the pie chart from DIV
        var pieChart = new google.visualization.PieChart(document.getElementById('typeAwards2'));
        pieChart.draw(data);
    }, 'json');
}