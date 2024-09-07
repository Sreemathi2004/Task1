function validateLoginForm() {
    // Get form elements
    const usernameOrEmail = document.getElementById("userName1");
    const password = document.getElementById("Password");

    // Validate required fields
    if (usernameOrEmail.value === "" || password.value === "") {
        alert("Please enter your username/email and password.");
        return false;
    }

    // Check if credentials match stored credentials
    const storedCredentials = loadCredentials();
    if (storedCredentials && storedCredentials.username === usernameOrEmail.value && storedCredentials.password === password.value) {
        window.location.href = "success.html"; // Replace with your dashboard URL
        return true;
    } else {
        alert("Invalid username or password.");
        return false;
    }
}

function loadCredentials() {
    const storedCredentials = localStorage.getItem('userCredentials');
    if (storedCredentials) {
        return JSON.parse(storedCredentials);
    } else {
        return null;
    }
}

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        if (validateLoginForm()) {
            // Handle successful login
        }
    });
} else {
    console.error("Login form element not found.");
}