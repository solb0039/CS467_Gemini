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

        // Create CSV
        var csvTable = [];
        csvTable.push(["Name", "Number of Awards"]);
        csvTable = csvTable.concat(response);
        var dataToTable = google.visualization.arrayToDataTable(csvTable, true);
        console.log(dataToTable);
        var csv = google.visualization.dataTableToCsv(dataToTable);

        // Add ability to download CSV
        document.getElementById("export").addEventListener("click", function(e) {
            e.stopPropagation();
            e.preventDefault();
            e.stopImmediatePropagation();
            console.log("in download");
            // Source: https://stackoverflow.com/questions/17564103/using-javascript-to-download-file-as-a-csv-file
            var downloadLink = document.createElement("a");
            var blob = new Blob(["\ufeff", csv]);
            var url = URL.createObjectURL(blob);
            downloadLink.href = url;
            downloadLink.download = "data.csv";  //Name the file here
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        });
    }, 'json');
}