const API_URL = "http://localhost:5000/api/contacts";

const contactForm = document.getElementById("contactForm");
const contactList = document.getElementById("contactList");

let editingContactId = null;


// Get and display contacts
async function loadContacts() {
    try {
        const response = await fetch(API_URL);
        const contacts = await response.json();

        contactList.innerHTML = "";

contacts.forEach(contact => {
    const card = document.createElement("div");

    card.className = "contact-card";

    card.innerHTML = `
        <h3>${contact.name}</h3>
        <p><strong>Email:</strong> ${contact.email}</p>
        <p><strong>Phone:</strong> ${contact.phone}</p>

        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
    `;

    const deleteButton = card.querySelector(".delete-btn");

    deleteButton.addEventListener("click", async () => {
        try {
            await fetch(`${API_URL}/${contact.id}`, {
                method: "DELETE"
            });

            loadContacts();

        } catch (error) {
            console.error("Failed to delete contact:", error);
        }
    });

    const editButton = card.querySelector(".edit-btn");

    editButton.addEventListener("click", () => {
    document.getElementById("name").value = contact.name;
    document.getElementById("email").value = contact.email;
    document.getElementById("phone").value = contact.phone;

    editingContactId = contact.id;
});

    contactList.appendChild(card);
});

    } catch (error) {
        console.error("Failed to load contacts:", error);
    }
}


// Add contact
contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    try {
        if (editingContactId === null) {

            // Add contact
            await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    phone
                })
            });

        } else {

            // Update contact
            await fetch(`${API_URL}/${editingContactId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    phone
                })
            });

            editingContactId = null;
        }

        contactForm.reset();
        loadContacts();

    } catch (error) {
        console.error("Failed to save contact:", error);
    }
});

// Load contacts when page opens
loadContacts();