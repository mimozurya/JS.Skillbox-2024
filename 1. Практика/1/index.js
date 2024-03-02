document.addEventListener("DOMContentLoaded", () => {
    const openButton = document.querySelector(".open-btn");
    const modal = document.querySelector(".modal");

    openButton.addEventListener("click", () => {
        modal.style.display = "block";
    });

    modal.querySelector(".modal-dialog").addEventListener("click", (event) => {
        event._isClickWithinModal = true;
        console.log(event, "клик в окно");
    });

    modal.addEventListener("click", (event) => {
        if (event._isClickWithinModal) return;
        modal.style.display = "none";
    });
});
