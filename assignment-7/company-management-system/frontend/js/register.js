const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const department = document.getElementById("department").value;

    const message = document.getElementById("message");

    try {

        const response = await fetch(
            "http://localhost:5000/api/auth/register",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name,
                    email,
                    password,
                    department
                })
            }
        );

        const data = await response.json();

        if (response.ok) {

            message.textContent = data.message;

            registerForm.reset();

        } else {

            message.textContent = data.message;

        }

    } catch (error) {

        console.error(error);

        message.textContent =
            "Unable to connect to the server.";

    }

});