// handel employee form data 

const form = document.querySelector("#employeeForm");

form.addEventListener("submit", function(event){
  event.preventDefault();

  const name = document.querySelector("#name").value;
const employeeId = document.querySelector("#employeeId").value;
const email = document.querySelector("#email").value;
const phone = document.querySelector("#phone").value;
const department = document.querySelector("#department").value;
const designation = document.querySelector("#designation").value;
const salary = Number(document.querySelector("#salary").value);
const joiningDate = document.querySelector("#joiningDate").value;

const employee = {
   name,
   employeeId,
   email,
   phone,
   department,
   designation,
   salary,
   joiningDate,

};

// console.log(employee);

//  now fetch data 

fetch("http://localhost:3000/api/employees", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(employee)
})
.then(response => response.json())
.then(data => {
    console.log("Server response", data);
})
.catch(error => {
    console.error("error", error);
    
});
 // Clear all form fields
    form.reset();

});

