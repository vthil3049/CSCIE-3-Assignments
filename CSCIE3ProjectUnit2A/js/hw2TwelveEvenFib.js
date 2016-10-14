/* CSCI E-3 Introduction to Web Programming Using Javascript
 * Spring 2014
 *
 * Homework Unit #2
 *
 *
 */



 /********************************************************************
  *
  * Fourth problem: Sum of first 12 even Fibonacci numbers
  *
  ********************************************************************/
// first we get the HTML for the button
var getFibSum = document.getElementById("sumFib");

//then we set the event handler for when the button is clicked
getFibSum.onclick = function(){
               document.getElementById("sumFibResult").innerHTML = twelveEvenFibonacciSum();
 }

 /*
  *  twelveEvenFibonacciSum - calulates the sum of the first 12 even fibonacci numbers, with 0, 1 being the first two numbers of the sequence
  *
  *            @returns {integer} The sum of the first 12 even Fibonacci numbers
  */

 function twelveEvenFibonacciSum(){
 /// WRITE YOUR CODE HERE
 	var fNum=0, sNum=1;

 	var fTotal=0, numEvens = 0;
 	while(numEvens < 12)
 	{
 		var tNum = fNum+sNum;  
 		fNum = sNum;
 		sNum = tNum;
 		if (tNum%2 == 0)
 		{
 			numEvens++;
 			fTotal  += tNum;
 		}
 	}
 	return fTotal;
    
 } 
