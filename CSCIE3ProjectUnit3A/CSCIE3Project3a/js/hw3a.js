/* hw3a.js  */

// your solution here
document.addEventListener("click", function(evt){
 //the target is the actual child element that was clicked. Check to make sure its only the buttons and not any area in the container
	if (evt.target.id == 'divideTranscript'){
    var elem =  document.getElementById("transcriptText");
    var inputString =elem.innerHTML.trim();
    //console.log(inputString);
    var outputArray = inputString.split(/\s+/);
    //console.log(outputArray);
    if (outputArray.length > 0 )
    {
      //clear the current inner HTML
      elem.innerHTML = "";
      outputArray.forEach(function(arrElem, index){
        var parentE =  document.getElementById("transcriptText");
        var spanEl = document.createElement('span');
        spanEl.setAttribute('class','word' );
        spanEl.setAttribute('id', 'word'+index.toString(10));
        spanEl.innerHTML=arrElem+" ";
        parentE.appendChild(spanEl);
      });
      console.log(elem.innerHTML);
      elem.addEventListener("mouseover", function(e){
        if (e.target.getAttribute('class')=='word'){
          e.target.style.backgroundColor = 'yellow';
        }
      });
      elem.addEventListener("mouseout", function(e){
        if (e.target.getAttribute('class')=='word'){
          e.target.style.backgroundColor = 'white';
        }
      });
    }

  }

});
