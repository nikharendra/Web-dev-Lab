const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

const adminName = document.getElementById("adminName");
const employeeDetails = document.getElementById("employeeDetails");
const logoutBtn = document.getElementById("logoutBtn");


// Check whether user is logged in

if (!token || !user) {

    window.location.href = "login.html";

} else if (user.role !== "admin") {

    window.location.href = "employee.html";

}

// Show admin name

adminName.textContent = user.name;


// Fetch employee details

async function getEmployeeDetails() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/details/employees",
            {
                method: "GET",

                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );


        const data = await response.json();


        if (!response.ok) {

            employeeDetails.textContent = data.message;

            return;

        }


        // Clear loading message

        // Clear loading message

employeeDetails.innerHTML = "";


if (data.employees.length === 0) {

    employeeDetails.textContent =
        "No employees are registered yet.";

    return;
}


// Display employees

data.employees.forEach((employee) => {

            const card = document.createElement("div");

            card.className = "detail-card";

            card.innerHTML = `
                <h3>${employee.name}</h3>

                <p>
                    <strong>Email:</strong>
                    ${employee.email}
                </p>

                <p>
                    <strong>Department:</strong>
                    ${employee.department}
                </p>

                <p>
                    <strong>Role:</strong>
                    ${employee.role}
                </p>
            `;


            employeeDetails.appendChild(card);

        });

    } catch (error) {

        console.error(error);

        employeeDetails.textContent =
            "Unable to connect to the server.";

    }

}


// Logout

logoutBtn.addEventListener("click", () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.href = "login.html";

});


// Start fetching data

getEmployeeDetails();