/* hw3b.js */
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

    
}
