/* Homepage Popup Section */
window.addEventListener("load", function () {
  const popup = document.getElementById("popupOverlay");
  if (popup) {
    popup.style.display = "flex";
  }
  if (typeof AOS !== "undefined") {
    AOS.refresh();
  }
});

function closePopup() {
  const popup = document.getElementById("popupOverlay");
  if (popup) {
    popup.style.display = "none";
  }
}