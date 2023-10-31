document.addEventListener("DOMContentLoaded", function () {
    const showPopupButton = document.getElementById("showPopup");
    const closePopupButton = document.getElementById("closePopup");
    const popup = document.getElementById("popup");
    const addCardButton = document.getElementById("addCard");

    showPopupButton.addEventListener("click", function () {
        popup.style.display = "block";
    });

    closePopupButton.addEventListener("click", function () {
        popup.style.display = "none";
    });

    addCardButton.addEventListener("click", function () {
        popup.style.display = "none";
    });
});
