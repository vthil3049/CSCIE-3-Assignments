/* hw2b.js */
"use strict";

// First we do a self-invoking function that contains everything - there will be nothing
//  exposed to the global scope.
(function(){

   var personRecords;  //Global for all to access

   //Helper functions for all event methods
   function getPersonRecords()
   {
      var personRecordsStr = window.localStorage.getItem("personRecords");

      if (personRecordsStr == null)
      {
          console.log("person records don't exist");
          personRecords = [];
          window.localStorage.setItem("personRecords", JSON.stringify(personRecords));
      }
      else {
          personRecords = JSON.parse(personRecordsStr);
          console.log(personRecords);
      }
    }

    //Write out the person records to the proper output area
    function outputPersonRecords()
    {
      console.log(personRecords);
      var elem = document.getElementById("output");
      for(var rindex in personRecords)
      {
          writeRowToPage(personRecords[rindex], elem);
      }
    }

    var button = document.getElementById("doit");
    button.onclick = function(){
        /*  This function will run when the user clicks on the
         *  Save button.  We're going to do several things when this function
         *  runs:
         *  1) Get the values from the form. We have done this part for you
         *  2) Create a new data object that contains the information from the form. This could be
         *     a constructor funtion that takes each of the values as its arguments, or a simple
         *     JSON object (an object literal, more or less).
         *  3) Write this data object to the page. You'll do this by calling writeRowToPage() and
         *     passing your data object as a parameter.  We have provided a sample of this
         *     function for you, though you may have to modify/complete it so that it works
         *     with your data structure.
         *  4) Store your data to localStorage.  Remember that localStorage stores only
         *     strings, so you'll need to stringify your object. Remember, too, that when you
         *     write to localStorage, you can't add to or modify what's already there - you can only
         *     replace it completely, so you'll need a strategy to manage your accumulating data. See the
         *     Project 2B document for more information.
         *
         *     */

        //Step #1 - we get values from the form
        var name = document.getElementById("name").value;
        var address = document.getElementById("address").value;
        var email = document.getElementById("email").value;
        var age = Number(document.getElementById("age").value);
        var date = Date().toString();   //Save the current date when this entry was logged

        // Step #2 - you will create a new data object
        var PersonRecord= function PersonRecord(name, addr, email, age, date)
        {
            this.name = name;
            this.addr = addr;
            this.email = email;
            this.age = age;
            this.date = date;
            //"name": name, "addr" :address, "email" : email
        }
        var personRecord = new PersonRecord(name, address, email, age, date);

        console.log(personRecord);
        // Step #3 - call on writeRowtoPage() to write your new data object to the page
        writeRowToPage(personRecord, document.getElementById("output"));
        personRecords.push(personRecord);

        // Step#4 - Store your object in localStorage (preserving data
        //          that's already in there from prior submissions!)
        window.localStorage.setItem("personRecords", JSON.stringify(personRecords));

    };

    button = document.getElementById("clearit");
    button.onclick = function()
    {
        //This function clears all the data in the localStorage, the output area and the elements
        window.localStorage.clear();
        var elem = document.getElementById("output");
        var heading= elem.getElementsByClassName("info infoHead")[0];
        heading = elem.removeChild(heading);

        while (elem.hasChildNodes())
          elem.removeChild(elem.lastChild);

        elem.appendChild(heading);

        //remove any data in the fields
        document.getElementById("name").value="";
        document.getElementById("address").value="";
        document.getElementById("email").value="";
        document.getElementById("age").value="";

        //Delete all the data nodes
          // console.log(childList);
        // var numChildren = childList.length;
        // for(var i=0; i < numChildren; i++)
        // {
        //   console.log(childList[i]);
        //   var parentElement = childList[i].parentElement;
        //   parentElement.removeChild(childList[i]);
        // }

        // var childList = elem.getElementsByClassName("info data");
        // var numChildren=childList.length;
        // console.log(numChildren);
        // for(var i=0; i < numChildren; i++)
        // {
        //   console.log(childList[i]);
        //   var parentElement = childList[i].parentElement;
        //   parentElement.removeChild(childList[i]);
        // }

    };

    /* This function accepts two arguments -
     *    @dataObject: your data object representing a single
     *                 submission of the data form, which corresponds
     *                 to one row in the table
     *    @element:   the element on the page to which to write the output
     *
     *    The function assembles a string of HTML, using the data from
     *    dataObject.  Once the string is complete, it is appended to the
     *    page using innerHTML.
     *
     *    This has been coded to work with a sample data object that contains
     *    properties for name, addr, and email. Your data object may be different,
     *    in which case you will need to change this function accordingly.
     *
     * */
    function writeRowToPage(dataObject, element) {
        var s = "<div class=\"info data\">";

        s+='<div class="nameDiv">';
        if (dataObject.name !== 'undefined') {
            s+=dataObject.name;
        }
        s+= '</div><div class="addrDiv">';
        if (dataObject.addr !== 'undefined') {
            s+=dataObject.addr;
        }
        s+= '</div><div class="emailDiv">';
        if (dataObject.email !== 'undefined') {
            s+=dataObject.email;
        }
        s+= '</div><div class="ageDiv">';
        if (dataObject.age !== 'undefined') {
            s+=dataObject.age;
        }
        s+= '</div><div class="dateDiv">';
        if (dataObject.date !== 'undefined') {
            s+=dataObject.date;
        }
        s+= '</div></div>';
        element.innerHTML += s;
    }


    /* Step #5, Finally, write a function or other code that will, upon page load,
     * look in localStorage for any existing data, create data objects from it, and
     * write those data objects to the page using writeRowToPage().  This way
     * any time the user revisits this page, they'll see what was previously entered (provided
     * that they use the same browser on the same computer!)
     * */
    window.onload = function()
    {

        getPersonRecords();
        outputPersonRecords();
        // if (personRecordsStr == null)
        // {
        //     console.log("person records don't exist");
        // }
        // else {
        //     personRecords = JSON.parse(personRecordsStr);
        //     console.log(personRecords);
        //     for(var rindex in personRecords)
        //     {
        //         writeRowToPage(personRecords[rindex], document.getElementById("output"));
        //     }
        // }
    };

})();
