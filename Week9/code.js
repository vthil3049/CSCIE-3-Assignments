// Add your event handler here to listen for keyboard
//   activity and call the functions below as needed.



// initial location of the puck, and step size
var step = 4;
var pTop = 90;
var pLeft = 190;

// utility functions that will move the puck
var puck = document.getElementById("puck");
window.addEventListener("keydown", movePuck, false);
function movePuck(e)
{
	console.log("in movepuck");
	console.log(e.keyCode);
/*    switch(e.keyCode) {
        case 37:
            // left key pressed
            mvleft();
            break;
        case 38:
            // up key pressed
            mvup();
            break;
        case 39:
            // right key pressed
            mvright();
            break;
        case 40:
        		//down key
            mvdown();
            break;  
    } */

    switch(e.key) {
        case "ArrowLeft":
            // left key pressed
            mvleft();
            break;
        case "ArrowUp":
            // up key pressed
            mvup();
            break;
        case "ArrowRight":
            // right key pressed
            mvright();
            break;

        case "ArrowDown":
                //down key
            mvdown();
            break;  
    }     
}

function mvup(){
    pTop -= step;
    puck.style.top = pTop + "px";
}
function mvdown(){
    pTop += step;
    puck.style.top = pTop + "px";
}
function mvleft(){
    pLeft -= step;
    puck.style.left = pLeft + "px";
}
function mvright(){
    pLeft += step;
    puck.style.left = pLeft + "px";
}
