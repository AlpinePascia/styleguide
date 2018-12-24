/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function openDropup() {
    document.getElementById("dropup-items").classList.toggle("showDropup");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.btn-dropup')) {

    var dropup = document.getElementsByClassName("dropup-content");
    var i;
    for (i = 0; i < dropup.length; i++) {
      var openDropup = dropup[i];
      if (openDropup.classList.contains('showDropup')) {
        openDropup.classList.remove('showDropup');
      }
    }
  }
}