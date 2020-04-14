// FAQ Scrolling Progress Bar
window.onscroll = function() {
    scrollFunction()
};

function scrollFunction() {
    var windowScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (windowScroll/height) * 100;
    document.getElementById("progressBar").style.width = scrolled + '%';
}


//Suggestions Page Help Modal
var modal = document.getElementById("helpModal");
var modalButton = document.getElementById("helpButton");
var span = document.getElementsByClassName("close")[0];
modalButton.onclick = function(){
    modal.style.display = "block";
}

span.onclick = function(){
    modal.style.display = "none";
}

window.onclick = function(event){
    if(event.target == modal) {
        modal.style.display = "none";
    }
}

// Review Submission Snackbar notification
function triggerSnackbar() {
    var snackbar = document.getElementById("snackbar");

    snackbar.className = "show";

    setTimeout(function() {
        snackbar.className = snackbar.className.replace("show", "");
    }, 3500);
}

