/* hw3a.js  */

//Transform the text to insert span tags to the words
function transform() {
    var pDivElem = document.getElementById("transcriptText");
    //Remove the empty word elements
    var inputString = pDivElem.innerHTML.trim();
    //console.log(inputString);
    var outputArray = inputString.split(/\s+/);
    var count = outputArray.length;
    //console.log(outputArray);
    if (count > 0) {
        //clear the current inner HTML
        pDivElem.innerHTML = "";
        for (var i = 0; i < count; i++) {
            var spanEl = document.createElement('span');
            spanEl.setAttribute('class', 'word');
            spanEl.setAttribute('id', 'word' + i.toString(10));
            spanEl.innerHTML = outputArray[i];
            pDivElem.appendChild(spanEl);
            //add the hover state style change on mouseover and mouseout for the word
            spanEl.addEventListener("mouseover", function(e) {
                e.target.style.backgroundColor = 'yellow';
            });
            spanEl.addEventListener("mouseout", function(e) {
                e.target.style.backgroundColor = 'white';
            });
            //Add a space element with its own span
            spanEl = document.createElement('span');
            spanEl.innerHTML = " ";
            pDivElem.appendChild(spanEl);
        }  //for every word from the original text
    }//If number words > 0

	//Disable future transformations for this text
	var divideBtn = document.getElementById('divideTranscript');
	divideBtn.innerHTML = "Transform complete";
	divideBtn.disabled = true;
} //end of transform()

window.onload = function() {
    var divideBtn = document.getElementById('divideTranscript');
    divideBtn.addEventListener('click', transform, false);
}
