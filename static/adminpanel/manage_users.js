document.addEventListener("DOMContentLoaded", () => {

    const inviteBtn = document.querySelector(".invite-btn");
    const userModal = document.getElementById("userModal");
    const closeUserModal = document.getElementById("closeUserModal");
    const saveUser = document.getElementById("saveUser");

    const usersTableBody = document.getElementById("usersTableBody");
    const searchUser = document.getElementById("searchUser");

    let editingRow = null;

    // Open Modal
    inviteBtn.addEventListener("click", () => {
        editingRow = null;

        document.getElementById("userName").value = "";
        document.getElementById("userEmail").value = "";
        document.getElementById("userRole").value = "Student";
        document.getElementById("userStatus").value = "Active";

        userModal.style.display = "flex";
    });

    // Close Modal
    closeUserModal.addEventListener("click", () => {
        userModal.style.display = "none";
    });

    // Save / Update User
    saveUser.addEventListener("click", () => {

        const name = document.getElementById("userName").value.trim();
        const email = document.getElementById("userEmail").value.trim();
        const role = document.getElementById("userRole").value;
        const status = document.getElementById("userStatus").value;

        if (name === "" || email === "") {
            alert("Please fill all fields.");
            return;
        }

        if (editingRow) {

            editingRow.cells[0].innerHTML = `
                <div class="user-info">
                    <div class="table-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    ${name}
                </div>
            `;

            editingRow.cells[1].textContent = email;
            editingRow.cells[2].textContent = role;

            editingRow.cells[3].innerHTML = `
                <span class="status ${status.toLowerCase()}">
                    ${status}
                </span>
            `;

            editingRow = null;

        } else {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>
                    <div class="user-info">
                        <div class="table-avatar">
                            <i class="fas fa-user"></i>
                        </div>
                        ${name}
                    </div>
                </td>

                <td>${email}</td>

                <td>${role}</td>

                <td>
                    <span class="status ${status.toLowerCase()}">
                        ${status}
                    </span>
                </td>

                <td>Today</td>

                <td>
                    <button class="action-btn edit">
                        <i class="fas fa-pen"></i>
                    </button>

                    <button class="action-btn delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;

            usersTableBody.appendChild(row);
        }

        userModal.style.display = "none";

        document.getElementById("userName").value = "";
        document.getElementById("userEmail").value = "";
        document.getElementById("userRole").value = "Student";
        document.getElementById("userStatus").value = "Active";

    });

    // Edit & Delete
    usersTableBody.addEventListener("click", (event) => {

        const editBtn = event.target.closest(".edit");
        const deleteBtn = event.target.closest(".delete");

        if (editBtn) {

            editingRow = editBtn.closest("tr");

            document.getElementById("userName").value =
                editingRow.cells[0].innerText.trim();

            document.getElementById("userEmail").value =
                editingRow.cells[1].innerText.trim();

            document.getElementById("userRole").value =
                editingRow.cells[2].innerText.trim();

            document.getElementById("userStatus").value =
                editingRow.cells[3].innerText.trim();

            userModal.style.display = "flex";
        }

        if (deleteBtn) {

            if (confirm("Are you sure you want to delete this user?")) {
                deleteBtn.closest("tr").remove();
            }

        }

    });

    // Search
    searchUser.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        const rows = usersTableBody.querySelectorAll("tr");

        rows.forEach(row => {

            const name = row.cells[0].innerText.toLowerCase();
            const email = row.cells[1].innerText.toLowerCase();

            row.style.display =
                (name.includes(value) || email.includes(value))
                    ? ""
                    : "none";

        });

    });

});