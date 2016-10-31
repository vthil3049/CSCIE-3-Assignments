"use strict";

// Library application
//Displays a catalog of books initially. By clicking on the image, the user can see the detail of the book
(function(){

   var libraryBooks = [
   		{
   			"id":"1",
   			"name":"The Trespasser",
        "author":"Tana French",
        "pubType":"A Novel Hardcover – October 4, 2016",
        "image":"Book1.jpg",
        "reference":"https://bpl.bibliocommons.com/item/show/5960346075_the_trespasser",
        "description": "In bestselling Tana French’s newest “tour de force,”* being on the Murder squad is nothing like Detective Antoinette Conway dreamed it would be. Her partner, Stephen Moran, is the only person who seems glad she’s there. The rest of her working life is a stream of thankless cases, vicious pranks, and harassment. Antoinette is savagely tough, but she’s getting close to the breaking point."
   		},
      {
        "id":"2",
        "name":"The Wangs vs. the World",
        "author":"Jade Chang",
        "pubType":"Hardcover – October 4, 2016",
        "image":"Book2.jpg",
        "reference":"https://bpl.bibliocommons.com/item/show/5975123075_the_wangs_vs_the_world",
        "description": "THE WANGS VS. THE WORLD is an outrageously funny tale about a wealthy Chinese-American family that “loses it all, then takes a healing, uproarious road trip across the United States” (Entertainment Weekly). Their spectacular fall from riches to rags brings the Wangs together in a way money never could. It’s an epic family saga and an entirely fresh look at what it means to belong in America."
      },
      {
        "id":"3",
        "name":"Truevine: Two Brothers, a Kidnapping, and a Mother's Quest: A True Story of the Jim Crow South",
        "author":"Beth Macy",
        "pubType":"Hardcover – October 18, 2016",
        "image":"Book3.jpg",
        "reference":"https://bpl.bibliocommons.com/item/show/5955232075_truevine",
        "description": "The true story of two African-American brothers who were kidnapped and displayed as circus freaks, and whose mother endured a 28-year struggle to get them back."
      },
      {
        "id":"4",
        "name":"Today Will Be Different",
        "author":"Maria Semple",
        "pubType":"Hardcover – October 4, 2016",
        "image":"Book4.jpg",
        "reference":"https://bpl.bibliocommons.com/item/show/5960344075_today_will_be_different",
        "description": "A brilliant novel from the author of Where'd You Go, Bernadette, about a day in the life of Eleanor Flood, forced to abandon her small ambitions and awake to a strange, new future."
      }
	];

  function outputLibraryBooks()
  {
    var libElem = document.getElementById("library");
    var numBooks = libraryBooks.length;
    //Create a div for each book with its own id
    for (var i=0; i < numBooks; i++)
    {
      var book = libraryBooks[i];
      var bElem = document.createElement('div');
      bElem.setAttribute("id", "Book"+ book.id);
      bElem.setAttribute("class", "book");

      //image
      var imgElem = document.createElement('img');
      imgElem.setAttribute("src", "img/"+book.image);
      imgElem.setAttribute("alt", book.name);

      //Hyperlink the image to the actual detail page in the catalog
      var anchor = document.createElement('a');
      anchor.appendChild(imgElem);
      anchor.title = "Read more";
      anchor.href = book.reference;
      anchor.setAttribute("target", "_blank");

      //title
      var titleElem = document.createElement('h2');
      titleElem.innerHTML = book.name;
      titleElem.setAttribute("class", "title");

      //author
      var authorElem = document.createElement('h3');
      authorElem.setAttribute("class", "author");
      authorElem.innerHTML = book.author;

      //publication type
      var pubElem = document.createElement('h4');
      pubElem.setAttribute("class","pubType");
      pubElem.innerHTML = book.pubType;

      //div for details
      var detailElem = document.createElement('div');
      detailElem.setAttribute("class", "details");
      detailElem.setAttribute("id", "Book"+ book.id+"_details");
      var pElem = document.createElement('p');
      pElem.innerHTML = book.description;
      detailElem.appendChild(pElem);


      //Add all the elements to the div for this book
      bElem.appendChild(anchor);
      bElem.appendChild(titleElem);
      bElem.appendChild(authorElem);
      bElem.appendChild(pubElem);
      bElem.appendChild(detailElem);

      //Add the book to the catalog
      libElem.appendChild(bElem);

    }
  }

    window.onload = function()
    {
      //Populate the library catalog on load
        outputLibraryBooks();
    };

})();