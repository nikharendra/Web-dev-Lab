const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

const employeeName = document.getElementById("employeeName");
const adminDetails = document.getElementById("adminDetails");
const logoutBtn = document.getElementById("logoutBtn");


// Check whether user is logged in

if (!token || !user) {

    window.location.href = "login.html";

} else if (user.role !== "employee") {

    window.location.href = "admin.html";

}


// Show employee name

employeeName.textContent = user.name;


// Fetch admin details

async function getAdminDetails() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/details/admin",
            {
                method: "GET",

                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        const data = await response.json();


        if (!response.ok) {

            adminDetails.textContent = data.message;
            return;

        }


        // Display admin details

        // Display admin details

adminDetails.innerHTML = "";

if (data.admins.length === 0) {

    adminDetails.textContent =
        "No administrator details are available.";

    return;
}


data.admins.forEach((admin) => {

            const card = document.createElement("div");

            card.className = "detail-card";

            card.innerHTML = `
                <h3>${admin.name}</h3>

                <p>
                    <strong>Email:</strong>
                    ${admin.email}
                </p>

                <p>
                    <strong>Department:</strong>
                    ${admin.department}
                </p>

                <p>
                    <strong>Role:</strong>
                    ${admin.role}
                </p>
            `;

            adminDetails.appendChild(card);

        });

    } catch (error) {

        console.error(error);

        adminDetails.textContent =
            "Unable to connect to the server.";

    }

}


// Logout

logoutBtn.addEventListener("click", () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "login.html";

});


getAdminDetails();