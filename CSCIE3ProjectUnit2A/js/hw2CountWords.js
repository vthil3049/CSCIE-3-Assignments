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
	    var wordArray = myTextareaElement.value.trim().split(/\s+/);
	    console.log(wordArray);
	    var wordCount = wordArray.length;

		document.getElementById("wordcount").innerHTML = wordCount;
	}