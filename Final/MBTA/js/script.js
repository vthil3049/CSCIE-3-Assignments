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

    getRoutes();  //First get the basic subway route information.

    function getRoutes()
    {
        var routes = [];
        var jqxhr = $.get( "http://realtime.mbta.com/developer/api/v2/routes?api_key=Im5gTSzt1UyS3hWBjgb-XQ&format=json")
        .done(function(result) {

            $.each(result.mode,function(i, mode){

                if (mode.mode_name == "Subway" )
                {
                    $.each(mode.route,function(j, route_info)
                    {
                        routes.push(route_info);
                    });
                }
            });

            //collect the information about all subway routes
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

            function getRouteInfo(evt) {
                console.log('Clicked on '+evt.target.id)    ;
                $("#selected_route").text($(evt.target).text());
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
                            var tr = $("<tr><td>"+(j+1).toString()+"</td><td>"+stop.stop_name+"</td></tr>");
                            $(tb).append(tr);
                        });

                    });

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


    //}
})
