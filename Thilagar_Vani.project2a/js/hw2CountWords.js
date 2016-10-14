/* CSCI E-3 Introduction to Web Programming Using Javascript
 * Fall 2016
 *
 * Homework Unit #2
 *
 *
 */

 /********************************************************************
  *
  * Problem 5: Count the words
  *
  * Counts the words inside of a text area element.
  *
  ********************************************************************/
	var myTextareaElement = document.getElementById('myWordsToCount');
	myTextareaElement.onkeyup = function(){
	    // your code goes here
	    //Use a regular expression to split at 1 or more spaces. 
	    //trim() gets rid of the case when a trailing space is counted as a new word
	    //Hoping I'll get my extra credit!!!
	    var wordCount=0;
	    var textStr = myTextareaElement.value.trim();
	    if (textStr.length > 0)
	    {
		    var wordArray = textStr.split(/\s+/);
		    //console.log(wordArray);
		    wordCount = wordArray.length;
	    }
		document.getElementById("wordcount").innerHTML = wordCount;
	};
