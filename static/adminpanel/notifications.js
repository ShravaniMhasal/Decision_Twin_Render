document.addEventListener("DOMContentLoaded", () => {

    const tableBody = document.querySelector("tbody");

    tableBody.addEventListener("click", function (event) {

        const deleteBtn = event.target.closest(".delete");

        if (!deleteBtn) return;

        if (confirm("Are you sure you want to delete this notification?")) {
            deleteBtn.closest("tr").remove();
        }

    });

});