/* hw3b.js */
function initMap() {
  var uluru = {lat: -25.363, lng: 131.044};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}

window.onload = function()
{
    var pwd1 = document.getElementById("pwd1");
    var pwd2 = document.getElementById("pwd2");
    pwd1.addEventListener('keyup', function(){
        if (pwd1.value.length < 8)
        {
            document.getElementById("pwd1Hint").style.display="inline";
        }
        else {
            document.getElementById("pwd1Hint").style.display="none";
            console.log(pwd1.value," ", pwd2.value);
            if (pwd2.value.localeCompare(pwd1.value) === 0)
            {
                document.getElementById("pwd2Hint").style.display="none";
            }
            else {
                document.getElementById("pwd2Hint").style.display="inline";
            }
        }
    });

    //
    pwd2.addEventListener('keyup', function(){
        pwd2Hint = document.getElementById("pwd2Hint");
        if (pwd2.value.length < 8)
        {
            pwd2Hint.innerHTML = "Password too short";
            pwd2Hint.style.display="inline";
        }
        else {
            //console.log(pwd1.value," ", pwd2.value);
            if (pwd2.value.localeCompare(pwd1.value) === 0)
            {
                pwd2Hint.style.display="none";
            }
            else {
                pwd2Hint.innerHTML = "Passwords do not match";
                pwd2Hint.style.display="inline";
            }
        }
    });

    var bio = document.getElementById("bio");
    // Count the chars left
    //  If it exceeds 140 then truncate and stop accepting any more chars
    bio.addEventListener("keyup", function () {
        var strText = this.value;
        var charsLeft = 140 - strText.length;
        document.getElementById("charsLeft").innerHTML = charsLeft;
        if (charsLeft <= 0)
        {
            this.value = strText.substring(0,139);
        }

    });

    //console.log(continents[0]);
    var firstSelect = document.getElementById("firstSelect");
    var secondSelect = document.getElementById("secondSelect");

    for (var continent in continents){
      var opt     = document.createElement('option');
      var txtNode = document.createTextNode(continent);
      opt.value   = continent;
      opt.appendChild(txtNode);
      firstSelect.appendChild(opt);
    }

    //when continent changes update the countries
    firstSelect.addEventListener('change', function() {
        var indx = this.value;  //index is the name of the continent

        clearSelectList(secondSelect);

        if (indx != '') {
                var len = continents[indx].length;
                for (var i = 0; i < len; i++) {
                    var opt     = document.createElement('option');
                    var txtNode = document.createTextNode(continents[indx][i]);
                    opt.appendChild(txtNode);
                    secondSelect.appendChild(opt);
                }
            }

    });
    // function to clear Options from a Select Element
    function clearSelectList(el) {
        var MAX = el.length;
        for (var i = MAX; i >= 0; i--) {
            el.remove(i);
        }
    }

    var showMap = document.getElementById("showMap");
    showMap.addEventListener("change", function(){
      if (showMap.checked)
      {
        var parent = showMap.parentElement;
        var mapDiv = document.createElement('div');
        mapDiv.setAttribute('id', 'map');
        parent.appendChild(mapDiv);
        // var txtNode = document.createTextNode("Map goes here");
        // mapDiv.appendChild(txtNode);
        var uluru = {lat: 42.3745, lng: -71.1215};
        var map = new google.maps.Map(mapDiv, {
          zoom: 16,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });

      }
      else
      { //Remove the map
        var mapDiv = document.getElementById("map");
        if (mapDiv != null)
        {
          var parent = mapDiv.parentElement;
          parent.removeChild(mapDiv);
        }
      }
    });


}
