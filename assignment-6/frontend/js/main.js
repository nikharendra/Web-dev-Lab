console.log("Department Management System loaded");


// Check whether user is already logged in

const token = localStorage.getItem("token");

if (token) {
    console.log("User is logged in");
}