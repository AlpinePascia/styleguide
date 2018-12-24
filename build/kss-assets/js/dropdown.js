/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function openDropdown() {
    document.getElementById("dropdown-items").classList.toggle("showDropdown");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.btn-dropdown')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('showDropdown')) {
        openDropdown.classList.remove('showDropdown');
      }
    }
  }
}