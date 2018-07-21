// Client side .js for viewing which users created awards
// The initial view will be a pie chart
console.log("in public view");
/*
function createAwards() {
    $.get('/', function(response) {
        console.log("in public created awards");
        console.log(response);
        // Get the data
        var myData = [];
        for(var i = 0; i < response.length; i++) {
            var nextData = response[i];
            myData.push([nextData.last_name]);
        }
        console.log(myData);

        // Make the data table
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'User');
        data.addRows(myData);

        var options = {
            title: 'Which Users Created Awards'
        };

        // Style the chart div
        document.getElementById('createdAwards').style.height = '500px';
        document.getElementById('createdAwards').style.width = '500px';

        //Create and display the chart
        var chart = new google.visualization.PieChart(document.getElementById('createdAwards'));
        chart.draw(data, options);
    }, 'json');
}
*/