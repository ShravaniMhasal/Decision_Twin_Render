// ================================
// Latest Recommendation Management
// ================================
// ================================
// Latest Recommendation Management
// ================================

let recommendations = null;

if (!recommendations || recommendations.length === 0) {

    recommendations = [

        {
            id: 1,
            user: "Rahul Sharma",
            skills: "Python, ML",
            career: "AI Engineer",
            score: "98%",
            date: "21 Jul 2026",
            status: "Approved"
        },

        {
            id: 2,
            user: "Priya Patil",
            skills: "Java, SQL",
            career: "Backend Developer",
            score: "95%",
            date: "22 Jul 2026",
            status: "Approved"
        },

        {
            id: 3,
            user: "Aman Verma",
            skills: "UI/UX, Figma",
            career: "UI/UX Designer",
            score: "91%",
            date: "22 Jul 2026",
            status: "Pending"
        },
        {
            id: 4,
            user: "Rohit Singh",
            skills: "Python, Data Analysis",
            career: "Data Scientist",
            score: "93%",
            date: "23 Jul 2026",
            status: "Approved"
        },
        {
            id: 5,
            user: "Anjali Mehta",  
            skills: "JavaScript, React",
            career: "Frontend Developer",
            score: "90%",
            date: "24 Jul 2026",
            status: "Pending"
        }


    ];

    localStorage.setItem(
        "recommendations",
        JSON.stringify(recommendations)
    );

}

let editingRecommendationId = null;


// ================================
// DOM Elements
// ================================

const recommendationTableBody = document.getElementById("recommendationTableBody");
const searchInput = document.getElementById("searchRecommendation");
const recommendationModal = document.getElementById("recommendationModal");
const saveRecommendationBtn = document.getElementById("saveRecommendation");
// ================================
// Search
// ================================

if (searchInput) {

    searchInput.addEventListener("input", function () {

        const searchText = searchInput.value.toLowerCase();

        const filteredRecommendations = recommendations.filter(function (recommendation) {

            return (
                recommendation.user.toLowerCase().includes(searchText) ||
                recommendation.skills.toLowerCase().includes(searchText) ||
                recommendation.career.toLowerCase().includes(searchText) ||
                recommendation.status.toLowerCase().includes(searchText)
            );

        });

        displayRecommendations(filteredRecommendations);

    });

}

// ================================
// Display Recommendations
// ================================

function displayRecommendations(recommendationList = recommendations) {

    if (!recommendationTableBody) return;

    recommendationTableBody.innerHTML = "";


    recommendationList.forEach(function(recommendation){

        const row = document.createElement("tr");

        row.innerHTML = `

        <td>${recommendation.user}</td>

        <td>${recommendation.skills}</td>

        <td>${recommendation.career}</td>

        <td>${recommendation.score}</td>

        <td>${recommendation.date}</td>

        <td>
            <span class="status ${recommendation.status.toLowerCase()}">
                ${recommendation.status}
            </span>
        </td>

        <td>

            <button class="action-btn edit" data-id="${recommendation.id}">
                <i class="fas fa-pen"></i>
            </button>

            <button class="action-btn delete" data-id="${recommendation.id}">
                <i class="fas fa-trash"></i>
            </button>
        </td>

        `;

        recommendationTableBody.appendChild(row);

    });

}

// Initial Display
displayRecommendations();
// ================================
// Open Add Recommendation Modal
// ================================
// ================================
// Edit & Delete
// ================================

recommendationTableBody.addEventListener("click", function (event) {
    console.log(event.target);

    const editButton = event.target.closest(".edit");
    const deleteButton = event.target.closest(".delete");

    // ---------- EDIT ----------

    if (editButton) {

        const recommendationId = Number(editButton.dataset.id);

        editingRecommendationId = recommendationId;

        const recommendation = recommendations.find(function (item) {
            return item.id === recommendationId;
        });

        document.getElementById("recommendationUser").value = recommendation.user;
        document.getElementById("recommendationSkills").value = recommendation.skills;
        document.getElementById("recommendedCareer").value = recommendation.career;
        document.getElementById("matchScore").value = recommendation.score.replace("%", "");
        document.getElementById("recommendationStatus").value = recommendation.status;

        recommendationModal.style.display = "flex";

        return;
    }

    // ---------- DELETE ----------

    if (deleteButton) {

        const recommendationId = Number(deleteButton.dataset.id);

        if (confirm("Are you sure you want to delete this recommendation?")) {

            recommendations = recommendations.filter(function (item) {
                return item.id !== recommendationId;
            });

            localStorage.setItem(
                "recommendations",
                JSON.stringify(recommendations)
            );

            displayRecommendations();
        }
    }

});
// ================================
// Save Recommendation
// ================================

if (saveRecommendationBtn) {

    saveRecommendationBtn.addEventListener("click", function () {

        const user = document.getElementById("recommendationUser").value.trim();

        const skills = document.getElementById("recommendationSkills").value.trim();

        const career = document.getElementById("recommendedCareer").value.trim();

        const score = document.getElementById("matchScore").value.trim() + "%";

        const status = document.getElementById("recommendationStatus").value;

        const date = new Date().toLocaleDateString("en-GB");

        if (
            user === "" ||
            skills === "" ||
            career === "" ||
            score === "%"
        ) {

            alert("Please fill all fields.");

            return;

        }

        if (editingRecommendationId !== null) {

            recommendations = recommendations.map(function (recommendation) {

                if (recommendation.id === editingRecommendationId) {

                    recommendation.user = user;
                    recommendation.skills = skills;
                    recommendation.career = career;
                    recommendation.score = score;
                    recommendation.status = status;
                    recommendation.date = date;

                }

                return recommendation;

            });

        }

        localStorage.setItem(
            "recommendations",
            JSON.stringify(recommendations)
        );

        displayRecommendations();

        recommendationModal.style.display = "none";
        editingRecommendationId = null;

    });

}
// ================================
// Edit & Delete
// ================================

    // ---------------- Delete ----------------

// ================================
// Close Modal on Outside Click
// ================================

window.addEventListener("click", function (event) {

    if (event.target === recommendationModal) {

        recommendationModal.style.display = "none";

    }

});
const refreshBtn = document.getElementById("refreshBtn");

if (refreshBtn) {
    refreshBtn.addEventListener("click", function () {

        recommendations = JSON.parse(
            localStorage.getItem("recommendations")
        ) || [];

        searchInput.value = "";

        displayRecommendations();

    });
}