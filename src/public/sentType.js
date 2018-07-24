//sentType Award History PUBLIC

google.charts.load("current", { packages: ["table"] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    $.get('/data/type', (response) => {
        console.log(response);

        var data = new google.visualization.DataTable();
        console.log(response);
        data.addColumn('string', 'Name');
        data.addColumn('string', 'Type');
        data.addRows(response);

        document.getElementById('sentType').style.height = '350px';
        document.getElementById('sentType').style.width = '700px';

        var chart = new google.visualization.Table(document.getElementById('sentType'));
        chart.draw(data, {showRowNumber: true, width: '100%', height: '100%' });
    }, 'json');
}