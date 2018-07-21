// Client side .js for viewing which users created awards
// The initial view will be a pie chart

google.charts.load("current", { packages: ["corechart", "pie"] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

    console.log("in draw chart");
    $.get('/data/created', (response) =>{
        console.log(response);
        var myData = [];
        for(var i = 0; i < response.length; i++) {
            var item = response[i];
            myData.push([item.name]);
        }

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Name');
        data.addRows(myChart);

        //create and draw the chart from DIV
        var chart = new google.visualization.PieChart(document.getElementById('createdAwards'));
        chart.draw(data);
    });
}/*
    var test = [['Task', 'Hours per Day'],
    ['Work', 11],
    ['Eat', 2]];

    var data = google.visualization.arrayToDataTable(test);

    // Style the chart div
    document.getElementById('createdAwards').style.height = '950px';
    document.getElementById('createdAwards').style.width = '950px';

    // Draw the chart
    var chart = new google.visualization.BarChart(document.getElementById('createdAwards'));
    chart.draw(data);
    
}*/