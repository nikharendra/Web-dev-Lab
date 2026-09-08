const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const message = document.getElementById("message");

    try {

        const response = await fetch(
            "http://localhost:5000/api/auth/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            message.textContent = data.message;
            return;
        }

        // Store JWT token
        localStorage.setItem("token", data.token);

        // Store user information
        localStorage.setItem("user", JSON.stringify(data.user));

        message.textContent = "Login successful!";

        // Redirect according to role
        if (data.user.role === "admin") {

            window.location.href = "admin.html";

        } else if (data.user.role === "employee") {

            window.location.href = "employee.html";

        }

    } catch (error) {

        console.error(error);

        message.textContent =
            "Unable to connect to the server.";

    }

});