const token =
    localStorage.getItem("token");


const departmentsContainer =
    document.getElementById(
        "departmentsContainer"
    );

const formContainer =
    document.getElementById(
        "departmentFormContainer"
    );

const departmentForm =
    document.getElementById(
        "departmentForm"
    );

const addDepartmentBtn =
    document.getElementById(
        "addDepartmentBtn"
    );

const cancelBtn =
    document.getElementById(
        "cancelBtn"
    );

const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );

const message =
    document.getElementById(
        "message"
    );


// =================================
// CHECK LOGIN
// =================================

if (!token) {

    window.location.href =
        "login.html";

}


// =================================
// FETCH DEPARTMENTS
// =================================

async function loadDepartments() {

    try {

        const response =
            await fetch(
                "http://localhost:5000/api/departments",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );


        if (response.status === 401) {

            localStorage.removeItem("token");

            window.location.href =
                "login.html";

            return;

        }


        const departments =
            await response.json();


        displayDepartments(
            departments
        );


    } catch (error) {

        console.error(error);

        message.textContent =
            "Failed to load departments.";

    }

}


// =================================
// DISPLAY DEPARTMENTS
// =================================

function displayDepartments(
    departments
) {

    departmentsContainer.innerHTML = "";


    if (departments.length === 0) {

        departmentsContainer.innerHTML = `
            <p>
                No departments found.
            </p>
        `;

        return;

    }


    departments.forEach(
        (department) => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "department-card";


            card.innerHTML = `

                <h3>
                    ${department.name}
                </h3>

                <p>
                    ${department.description || "No description"}
                </p>

                <p>
                    <strong>Head:</strong>
                    ${department.head || "Not assigned"}
                </p>

                <div class="department-actions">

                    <button
                        class="edit-btn"
                        onclick="editDepartment(
                            ${department.id},
                            '${escapeQuotes(department.name)}',
                            '${escapeQuotes(department.description || "")}',
                            '${escapeQuotes(department.head || "")}'
                        )"
                    >
                        Edit
                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteDepartment(
                            ${department.id}
                        )"
                    >
                        Delete
                    </button>

                </div>
            `;


            departmentsContainer.appendChild(
                card
            );

        }
    );

}


// =================================
// ESCAPE QUOTES
// =================================

function escapeQuotes(value) {

    return value
        .replace(/'/g, "\\'");
}


// =================================
// SHOW ADD FORM
// =================================

addDepartmentBtn.addEventListener(
    "click",
    () => {

        formContainer.classList.remove(
            "hidden"
        );

        departmentForm.reset();

        document.getElementById(
            "departmentId"
        ).value = "";

    }
);


// =================================
// CANCEL FORM
// =================================

cancelBtn.addEventListener(
    "click",
    () => {

        formContainer.classList.add(
            "hidden"
        );

        departmentForm.reset();

    }
);


// =================================
// ADD / UPDATE
// =================================

departmentForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        const id =
            document.getElementById(
                "departmentId"
            ).value;


        const name =
            document.getElementById(
                "departmentName"
            ).value;


        const description =
            document.getElementById(
                "departmentDescription"
            ).value;


        const head =
            document.getElementById(
                "departmentHead"
            ).value;


        const method =
            id ? "PUT" : "POST";


        const url =
            id
                ? `http://localhost:5000/api/departments/${id}`
                : "http://localhost:5000/api/departments";


        try {

            const response =
                await fetch(
                    url,
                    {
                        method,

                        headers: {

                            "Content-Type":
                                "application/json",

                            Authorization:
                                `Bearer ${token}`

                        },

                        body: JSON.stringify({

                            name,
                            description,
                            head

                        })

                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                message.textContent =
                    data.message;

                return;

            }


            message.textContent =
                data.message;


            departmentForm.reset();


            formContainer.classList.add(
                "hidden"
            );


            loadDepartments();


        } catch (error) {

            console.error(error);

            message.textContent =
                "Something went wrong.";

        }

    }
);


// =================================
// EDIT
// =================================

function editDepartment(
    id,
    name,
    description,
    head
) {

    formContainer.classList.remove(
        "hidden"
    );


    document.getElementById(
        "departmentId"
    ).value = id;


    document.getElementById(
        "departmentName"
    ).value = name;


    document.getElementById(
        "departmentDescription"
    ).value = description;


    document.getElementById(
        "departmentHead"
    ).value = head;

}


// =================================
// DELETE
// =================================

async function deleteDepartment(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this department?"
        );


    if (!confirmed) {

        return;

    }


    try {

        const response =
            await fetch(
                `http://localhost:5000/api/departments/${id}`,
                {
                    method: "DELETE",

                    headers: {

                        Authorization:
                            `Bearer ${token}`

                    }
                }
            );


        const data =
            await response.json();


        message.textContent =
            data.message;


        loadDepartments();


    } catch (error) {

        console.error(error);

        message.textContent =
            "Failed to delete department.";

    }

}


// =================================
// LOGOUT
// =================================

logoutBtn.addEventListener(
    "click",
    (event) => {

        event.preventDefault();


        localStorage.removeItem(
            "token"
        );


        localStorage.removeItem(
            "user"
        );


        window.location.href =
            "login.html";

    }
);


// =================================
// INITIAL LOAD
// =================================

loadDepartments();