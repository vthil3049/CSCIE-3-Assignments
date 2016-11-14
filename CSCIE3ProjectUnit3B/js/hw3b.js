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

  //Show the location of Harvard, when the user checks the box
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

  //Validate phone number on entry
  //Found this here - https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9781449327453/ch04s02.html
  var phone = document.getElementById("phone");
  var phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  phone.addEventListener('keyup', function(){
    var inStr = phone.value;


    if (phoneRegex.test(inStr)) {
        var outStr = inStr.replace(phoneRegex, "$1-$2-$3");
        console.log(inStr, outStr);
        phone.value = outStr;
        document.getElementById("phoneHint").style.display="none";
    } else {
        document.getElementById("phoneHint").style.display="inline";
    }

  });
  /*  This handler will run when you submit the form    */
  var f = document.forms[0];
  f.addEventListener("submit", function (e) {

      /// Here we can do whatever we want with the form
      //    and its elements.
      var phoneStr = document.getElementById("phone").value;
      var emailStr = document.getElementById("email").value;
      if (!phoneValid(phoneStr) &&  !emailValid(emailStr))
      {
        // if things aren't right, I can cancel the form
        //  submission right here:
        alert("Either a valid phone number or an email is required!");
        e.preventDefault();
      }
  });

  function phoneValid(pstr)
  {
    return ((pstr.length > 0) && (phoneRegex.test(pstr)));
  }

  function emailValid(estr)
  {
    var re = /\S+@\S+\.\S+/;
    return re.test(estr);
  }
}
