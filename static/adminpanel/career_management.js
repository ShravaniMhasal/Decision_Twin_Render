let careers = [];
let editingCareerId = null;
const savedCareers = localStorage.getItem("careers");

if (savedCareers) {
    careers = JSON.parse(savedCareers);
}
const modal = document.getElementById("careerModal");
const tableBody = document.getElementById("careerTableBody");
function displayCareers(careerList = careers) {

    tableBody.innerHTML = "";

    careerList.forEach((career) => {

        const row = `
            <tr>
                <td>${career.name}</td>
                <td>${career.category}</td>
                <td>${career.demand}</td>
                <td><span class="status active">${career.status}</span></td>
                <td>${career.date}</td>
                <td>

                    <button class="action-btn edit" data-id="${career.id}">
                        <i class="fas fa-pen"></i>
                    </button>

                    <button class="action-btn delete" data-id="${career.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;

        tableBody.innerHTML += row;

    });

}

// Open Modal
document.getElementById("addCareerBtn").addEventListener("click", () => {
    modal.style.display = "flex";
});

// Close Modal
document.getElementById("closeModal").addEventListener("click", () => {
    modal.style.display = "none";
});

// Save Career
document.getElementById("saveCareer").addEventListener("click", () => {

    const name = document.getElementById("careerName").value;
    const category = document.getElementById("careerCategory").value;
    const demand = document.getElementById("careerDemand").value;
    const status = document.getElementById("careerStatus").value;

    if (name === "" || category === "") {
        alert("Please fill all fields.");
        return;
    }

    const today = new Date().toLocaleDateString("en-GB");

    if (editingCareerId === null) {

    const career = {
        id: Date.now(),
        name: name,
        category: category,
        demand: demand,
        status: status,
        date: today
    };

    careers.push(career);

} else {

    const career = careers.find(career => career.id === editingCareerId);

    career.name = name;
    career.category = category;
    career.demand = demand;
    career.status = status;

    editingCareerId = null;
}

localStorage.setItem("careers", JSON.stringify(careers));

displayCareers();
    // Clear fields
    document.getElementById("careerName").value = "";
    document.getElementById("careerCategory").value = "";

    modal.style.display = "none";
});
displayCareers();
tableBody.addEventListener("click", function (event) {
    const deleteButton = event.target.closest(".delete");
    const editButton = event.target.closest(".edit");
if (editButton) {

    const careerId = Number(editButton.dataset.id);

    editingCareerId = careerId;

const career = careers.find(career => career.id === careerId);

document.getElementById("careerName").value = career.name;
document.getElementById("careerCategory").value = career.category;
document.getElementById("careerDemand").value = career.demand;
document.getElementById("careerStatus").value = career.status;

modal.style.display = "flex";

    return;
}

    if (!deleteButton) return;

    const careerId = Number(deleteButton.dataset.id);

    if (confirm("Are you sure you want to delete this career?")) {

        careers = careers.filter(career => career.id !== careerId);

        localStorage.setItem("careers", JSON.stringify(careers));

        displayCareers();

    }

});
const searchInput = document.getElementById("searchCareer");

searchInput.addEventListener("input", function () {
    const searchText = searchInput.value.toLowerCase();

const filteredCareers = careers.filter(function (career) {
    return (
        career.name.toLowerCase().includes(searchText) ||
        career.category.toLowerCase().includes(searchText) ||
        career.demand.toLowerCase().includes(searchText) ||
        career.status.toLowerCase().includes(searchText)
    );
});

displayCareers(filteredCareers);
});

window.onload = function () {

};
window.onclick = function(event) {

    if (event.target === viewModal) {
        viewModal.style.display = "none";
    }
};