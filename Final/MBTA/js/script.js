/*
The app demonstrates the use of a publicly available API .
We request data using the XMLHttpRequest object from Weather Underground.
We get a JSON response that is used to display the weather in a table.
*/

function getRoutes()
{
    var routes = [];
    var jqxhr = $.get( "http://realtime.mbta.com/developer/api/v2/routes?api_key=Im5gTSzt1UyS3hWBjgb-XQ&format=json")
    .done(function(result) {
        //alert( "second success" );
        console.log(result);
        $.each(result.mode,function(i, mode){
            console.log(i, mode);
            if (mode.mode_name == "Subway" )
            {
                //routes.push(v.route);
                $.each(mode.route,function(j, route_info)
                {
                    console.log(j);
                    console.log(route_info);
                    routes.push(route_info);
                });
            }
        });
        console.log(routes);
        var tb = $('#route_data');
        $.each(routes, function(i,v)
        {
            console.log(v);
            var row_data = "<tr><td>"+(i+1).toString()+"</td><td>"+v.route_id+"</td><td>"+v.route_name+"</td></tr>";
            $("#route_data").append(row_data);
            // var tr = tb.add('tr');
            // var td = tr.add('td')
            // var tc = td.text(v.route_id);
            // $('#route_data').append(tr);
        });
        $('table').css("background-color", "oldlace");
        $("#route_data tr:contains('Green')").css("background-color", "limegreen");
        $("#route_data tr:contains('Red')").css("background-color", "red");
        $("#route_data tr:contains('Blue')").css("background-color", "dodgerblue");
        $("#route_data tr:contains('Orange')").css("background-color", "orange");
        //$( "div:contains('John')" ).css( "text-decoration", "underline" );
        return routes;

    })
    .fail(function() {
        alert( "error" );
    });

    /*var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    // Action to be performed when the document is read;
    //console.log(xhttp.responseText);
    var responseVal = JSON.parse(xhttp.responseText);
    console.log(responseVal);
    //ar forecast = responseVal.forecast;//
    //console.log(forecast);/an outlook for the next 3-4 days
    //Each day's weather is displayed in a row by itself

}
};
xhttp.open("GET",
"http://realtime.mbta.com/developer/api/v2/routes?api_key=Im5gTSzt1UyS3hWBjgb-XQ&format=json", true);
xhttp.send(); */
}

function getWeather()
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Action to be performed when the document is read;
            //console.log(xhttp.responseText);
            var responseVal = JSON.parse(xhttp.responseText);
            var forecast = responseVal.forecast;
            //console.log(forecast);
            //The simple forecast is sufficient to get an outlook for the next 3-4 days
            //Each day's weather is displayed in a row by itself
            forecast.simpleforecast.forecastday.forEach(addWeatherInfo);
        }
    };
    xhttp.open("GET", "http://api.wunderground.com/api/057c1c21c6eb8fb4/forecast/q/MA/Boston.json", true);
    xhttp.send();

}

//Add a row of data in the weather table corresponding to a single data
function addWeatherInfo(item, index)
{
    var row = document.createElement('tr');
    var dataStr = item.date.weekday_short+','+item.date.monthname_short+' '+item.date.day.toString();
    createTableData(row, dataStr);
    var td = createTableData(row, item.conditions);
    //Append the image to the conditions
    var imgData = document.createElement('img');
    imgData.setAttribute("src", item.icon_url);
    imgData.setAttribute("alt", item.icon);
    td.appendChild(imgData);

    createTableData(row, item.high.fahrenheit+'\u00B0'+'F');
    createTableData(row, item.low.fahrenheit+'\u00B0'+'F');
    //
    var tbody = document.getElementById("wdata")
    tbody.appendChild(row);
}

//Create a single td element and append it to the row. Return this td element
function createTableData(row, dataStr)
{
    var td = document.createElement('td')
    var tdata = document.createTextNode(dataStr);
    td.appendChild(tdata);
    row.appendChild(td);
    return td;
}

//}
