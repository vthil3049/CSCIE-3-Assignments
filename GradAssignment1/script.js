
/*
Depending on how challenging you want the practice set to be you can comment out various parts of this solution file.
The item for each day is contained in an array of JSON objects with the item name and the days cost
I originally saw this problem in a Visual Basic Book by David Schneider.
So, this is not an original problem that I created, but I thought this was appropriate to use in any programming language
and its open to many possibilites
This problem illustrates the use of objects, arrays and loops

We're all probably familiar with the "12 Days of Christmas" carol.
A company called PNC in Philadelphia comes up with a Christmas Price Index
which tracks the yearly increase in price of the gifts from the 12 Days of Christmas.

Here is a link to the Christmas Price Index of 2015 -
http://www.businessinsider.com/pnc-christmas-index-12-days-of-christmas-2015-2015-12


For this problem, the user enters a number between 1-12(both numbers inclusive) and the program calculates
 the cost of the gift for that day, as well as the cumulative total spent by the poor sap until that specific day.

*/
var itemCosts = [

  {"name": "Partridge in a pear tree", "cost":214.99 },
  {"name": "Turtle Doves", "cost":290.00 },
  {"name": "French Hens", "cost":181.50 },
  {"name": "Calling Birds", "cost":599.96 },
  {"name": "Gold Rings", "cost": 750.00},
  {"name": "Geese-a-laying", "cost": 360.00},
  {"name": "Swans a swimming", "cost": 13125.00},
  {"name": "Maids a milking", "cost": 58.00},
  {"name": "Ladies Dancing", "cost": 7552.84},
  {"name": "Lords a leaping", "cost": 5508.70},
  {"name": "Pipers piping", "cost":2635.20 },
  {"name": "Drummers drumming", "cost":2854.80 }

];

function calculateCost()
{
  var dayNumber = Number(document.getElementById("dayNumber").value);
  //Declare your variables hw2ArrayImageProcessingSetup
  //make sure the day number is in the required range
  if (dayNumber > 0 && dayNumber < 13)
  {
    //Fill in your code here to calculate the day's cost and the cumulative totals

    document.getElementById("costBox").innerHTML = "";  //Enter your code to display the days cost and the cumulative total
  }
  else {
    document.getElementById("costBox").innerHTML = "Please enter a number in the range 1-12";
  }
}

//This is my solution for the practice set
function calculateCostSolution()
{
  var dayNumber = Number(document.getElementById("dayNumber").value);
  var daysCost = 0, cumTotal=0;
  var dailyTotals=[];
  var outputString="";
  //make sure the day number is in the required range
  if (dayNumber > 0 && dayNumber < 13)
  {
    var currDay = dayNumber;

    for (var i=0; i < dayNumber; i ++)
    {
      var currGiftCost = itemCosts[i].cost;
      daysCost += currGiftCost;
      //save this information for later to figure out the cumulative
      dailyTotals.push(daysCost);
      outputString += "Day "+(i+1)+" cost is $"+daysCost.toFixed(2)+"\n";
    }
    console.log("Days cost is "+daysCost);
    //To get the cumulative, total the amount spent on previous days
    for (var i=0; i < dayNumber; i ++)
    {
      cumTotal += dailyTotals[i];
    }
    console.log("Cumulative cost is "+cumTotal);
    document.getElementById("costBox").innerHTML = "Days cost is $"+daysCost.toFixed(2)+", cumulative is $"+cumTotal.toFixed(2)+"\n"+outputString;
  }
  else {
    document.getElementById("costBox").innerHTML = "Please enter a number in the range 1-12";
  }
}

