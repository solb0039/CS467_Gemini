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

        // Create CSV
        var csvTable = [];
        csvTable.push(["Type", "Count"]);
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