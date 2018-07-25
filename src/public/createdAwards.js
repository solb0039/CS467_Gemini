// Client side .js for viewing data

google.charts.load("current", { packages: ["corechart", "pie", "table"] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    $.get('/data/created', (response) => {
        console.log(response);

        // Create the data table
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Name');
        data.addColumn('number', 'Has Created');
        data.addRows(response);

        // Style the chart div
        document.getElementById('createdAwards').style.height = '500px';
        document.getElementById('createdAwards').style.width = '700px';

        // Style the chart div
        document.getElementById('createdAwards2').style.height = '950px';
        document.getElementById('createdAwards2').style.width = '950px';
      
        //create and draw the table from DIV
        var tableChart = new google.visualization.DataView(data);
        tableChart.setColumns([0]);
        var tableView = new google.visualization.Table(document.getElementById('createdAwards'));
        var options = {
            'height': '400',
            'width': '500'
          };

        tableView.draw(tableChart, options);

        //create and draw the pie chart from DIV
        var pieChart = new google.visualization.PieChart(document.getElementById('createdAwards2'));
        pieChart.draw(data);
    }, 'json');
}