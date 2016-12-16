/*
The app demonstrates the use of a publicly available API .
We request data using the XMLHttpRequest object from Weather Underground.
We get a JSON response that is used to display the weather in a table.
*/
$("document").ready(function() {

    var color_redline = "red";
    var color_blueline = "dodgerblue";
    var color_orangeline = 'orange';
    var color_greenline = "limegreen";
    var color_default = "oldlace";
    var gmaps_api_key = "AIzaSyBl1Ll6WF6C5CtT3X7iOq5IihRR9PueVNw";

    //Get the basic subway route information. The rest is upto the user to control
    getRoutes();

    function getRoutes()
    {
        var routes = [];
        var jqxhr = $.get( "http://realtime.mbta.com/developer/api/v2/routes?api_key=Im5gTSzt1UyS3hWBjgb-XQ&format=json")
        .done(function(result) {
            //collect the information about all subway routes
            $.each(result.mode,function(i, mode){

                if (mode.mode_name == "Subway" )
                {
                    $.each(mode.route,function(j, route_info)
                    {
                        routes.push(route_info);
                    });
                }
            });

            //Add each of the routes information to the table
            $.each(routes, function(i,v)
            {
                var td = $("<td></td>");
                var routeTag = $("<a>"+v.route_name+"</a>");
                $(routeTag).attr("id", v.route_id);
                $(routeTag).attr("href", "#");
                $(routeTag).addClass("sroute");  //Add subway route class
                $(td).append(routeTag);
                var tr = $("<tr></tr>");
                $(tr).append($("<td>"+(i+1).toString()+"</td>")).append(td);
                $('#route_data').append(tr);
            });

            $("#route_data tr:contains('Green')").css("background-color", color_greenline);
            $("#route_data tr:contains('Red')").css("background-color", color_redline);
            $("#route_data tr:contains('Blue')").css("background-color", color_blueline);
            $("#route_data tr:contains('Orange')").css("background-color", color_orangeline);

            //If a route is clicked then display its corresponding information
            $('.sroute').on('click', getRouteInfo);

            //Get all the info about the stops for this route in both directions
            function getRouteInfo(evt) {
                //make sure the tables are visible
                $("#stops_forward").show();
                    $("#stops_reverse").show();
                console.log('Clicked on '+evt.target.id)    ;
                var selRoute = $(evt.target).text();
                $("#selected_route").text(selRoute);
                var httpStr = "http://realtime.mbta.com/developer/api/v2/stopsbyroute?api_key=Im5gTSzt1UyS3hWBjgb-XQ&route=";
                httpStr += evt.target.id;
                httpStr += "&format=json";
                jqxhr = $.get(httpStr)
                .done(function(result) {
                    console.log(result.direction);
                    $.each(result.direction, function(i, d)
                    {
                        $("#direction"+d.direction_id).text(d.direction_name);
                        var tb = $("#route"+d.direction_id+"_data");
                        $(tb).empty();

                        $.each(d.stop, function(j, stop){
                            console.log(stop);
                            var tr = $("<tr><td>"+(j+1).toString()+"</td><td>"+stop.stop_name+"</td></tr>");
                            $(tr).data("lat", stop.stop_lat);
                            $(tr).data("lon", stop.stop_lon);
                            $(tb).append(tr);
                        });
                    });
                    //Color code according to the selected route
                    var routeColor = color_default;
                    if (selRoute.indexOf("Red") != -1)
                    {
                        routeColor = color_redline;
                    }
                    else if (selRoute.indexOf("Green") != -1)
                    {
                        routeColor = color_greenline;
                    }
                    else if (selRoute.indexOf("Blue") != -1)
                    {
                        routeColor = color_blueline;
                    }
                    else if (selRoute.indexOf("Orange") != -1){
                        routeColor = color_orangeline;
                    }
                    // $("#stops_forward").css("background-color", routeColor);
                     $("#stops_forward").addClass("table-striped");
                    // $("#stops_reverse").css("background-color", routeColor);
                     $("#stops_reverse").addClass("table-striped");
                    $("#selected_route").css("background-color", routeColor);

                    //add the dblClick handler
                    $("#route0_data tr").dblclick(showInMap);
                    $("#route1_data tr").dblclick(showInMap);

                    function showInMap(){
                        var lat = $(this).data("lat");
                        var lon = $(this).data("lon");
                        console.log(lat, lon);
                        var murl = "https://www.google.com/maps?q="+lat+","+lon+"&z=17";
                        window.open(murl);
                    }

                })
                .fail(function(){
                    alert("http error on route information");
                }) ;
            }

            return routes;

        })
        .fail(function() {
            alert( "error. Check if your internet and wifi are on" );
        });
    }

    function getStopsByLocation(latitude, longitude)
    {
        var stops = [];
        var httpStr = "http://realtime.mbta.com/developer/api/v2/stopsbylocation?api_key=Im5gTSzt1UyS3hWBjgb-XQ&lat=";
        httpStr += latitude.toString();
        httpStr += "&lon=";
        httpStr += longitude.toString();
        httpStr += "&format=json";
        console.log(httpStr);
        var jqxhr = $.get(httpStr).done(function(result) {
                        console.log("result=",result);
                        var distance ="";
                        $.each(result.stop, function(i, s){
                            if (i==0)
                            {
                                //add the first closest stop
                                distance = s.distance;
                                addStop(s);
                            }
                            else if (distance != s.distance)
                            {
                                //If distance from the previous stop changes then add this stop, otherwise
                                //ignore if its in the same distance/location
                                distance = s.distance;
                                addStop(s);
                            }
                            //Add the stop to the array
                            function addStop(stop)
                            {
                                //console.log(stop);
                                var newStop = {
                                    name: stop.stop_name,
                                    distance: stop.distance,
                                    lat:stop.stop_lat,
                                    lon:stop.stop_lon};

                                stops.push(newStop);

                            }
                        });
                        console.log(stops);
                        if (stops.length > 0)
                        {
                            //Show the table and populate with the stops
                            $("#nearest_stops").show();
                            var tb = $("#nearest_stops tbody");
                            $(tb).empty();

                            $.each(stops, function(i, s){
                                    var tr = $("<tr><td>"+s.name+"</td><td>"+s.distance.substring(0,6)+"</td></tr>");
                                    $(tr).data("stop", s);
                                    $(tb).append(tr);
                            });
                            $("#nearest_stops tr").dblclick(function(){
                                var stopData = $(this).data();
                                console.log(stopData.stop.lat, stopData.stop.lon);
                                var murl = "https://www.google.com/maps?q="+stopData.stop.lat+","+stopData.stop.lon+"&z=17";
                                window.open(murl);
                            });

                        }
                        else {
                            $("#nearest_stops").hide();
                            alert("There were no T-stops close to this location");
                        }

                    })
                    .fail(function(){
                        alert("http error on stops by location information");
                    }) ;

    }

    $("#latitude").keyup( function(){
        if ($.isNumeric($(this).val()) )
        {
            var latitude = parseFloat($(this).val());
            if ((latitude >= -90.0) && (latitude <= 90.0))
            {
                $("#laterror").text("");
            }
            else {
                $("#laterror").text("Latitude has to be in the range -90.0 through 90.0");
            }
        }
        else {
            $("#laterror").text("Latitude has to be a number in the range -90.0 through 90.0");
        }
    });

    $("#longitude").keyup(  function(){
        if ($.isNumeric($(this).val()) )
        {
            var longitude = parseFloat($("#longitude").val());
            if ((longitude >= -180.0) && (longitude <= 180.0))
            {
                $("#longerror").text("");
            }
            else {
                $("#longerror").text("Longitude has to be in the range -180.0 through 180.0");
            }
        }
        else {
            $("#longerror").text("Longitude has to be a number in the range -180.0 through 180.0");
        }
    });

    //Bind the submit function event handler for find by location
    $( "#find_stops" ).click(function( event ) {
        //Find the stops based on the latitude and longitude values
        var latitude = parseFloat($("#latitude").val());
        if (isNaN(latitude))
        {
            $("#laterror").text("Not a valid number");
        }
        else {
            $("#laterror").text("");
        }

        var longitude = parseFloat($("#longitude").val());
        if (isNaN(longitude))
        {
            $("#longerror").text("Not a valid number");
        }
        else {
            $("#longerror").text("");
        }
        console.log(latitude, longitude);
        getStopsByLocation(latitude, longitude);

        event.preventDefault();
    });

    $( "#find_me" ).click(function() {
        //This code was obtained from the Google maps API documentation
        // Note: This example requires that you consent to location sharing when
    // prompted by your browser. If you see the error "The Geolocation service
    // failed.", it means you probably did not give permission for the browser to
    // locate you.
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
              var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };

              $("#latitude").val(position.coords.latitude);
              $("#longitude").val(position.coords.longitude);
              $("#nearest_stops").hide();
          },
          function() {
            alert("Geolocation did not work");
          });
      }
    });

})
