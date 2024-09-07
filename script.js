function validateForm() {
    // Get form elements
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const gender = document.querySelector('input[name="gender"]:checked');
    const dobElement = document.getElementById("dob");
    const email = document.getElementById("email");
    const address = document.getElementById("address");
    const username = document.getElementById("user");
    const password = document.getElementById("password");

    // Validate required fields
    if (firstName.value === "" || lastName.value === "" || !gender || !dobElement || email.value === "" || address.value === "" || username.value === "" || password.value === "") {
        alert("Please fill in all required fields.");
        return false;
    }

    // Validate email format
    if (!isValidEmail(email.value)) {
        alert("Invalid email address.");
        return false;
    }

    // Validate age
    const dobValue = dobElement.value;
    if (!isAbove18(dobValue)) {
        alert("You must be at least 18 years old to register.");
        return false;
    }

    // Store credentials if validation passes
    storeCredentials(username.value, password.value);

    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isAbove18(dobValue) {
    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dobValue)) {
        console.error("Invalid date format: " + dobValue);
        return false;
    }

    // Create birthDate object
    const birthDate = new Date(dobValue);

    // Check for invalid date
    if (isNaN(birthDate.getTime())) {
        console.error("Invalid date: " + dobValue);
        return false;
    }

    // Calculate age
    const currentDate = new Date();
    const ageInMillis = currentDate - birthDate;
    const ageInYears = ageInMillis / (365 * 24 * 60 * 60 * 1000);

    return ageInYears >= 18;
}

function storeCredentials(username, password) {
    const credentials = {
        username: username,
        password: password
    };

    localStorage.setItem('userCredentials', JSON.stringify(credentials));
}

function loadCredentials() {
    const storedCredentials = localStorage.getItem('userCredentials');
    if (storedCredentials) {
        return JSON.parse(storedCredentials);
    } else {
        return null;
    }
}

document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();
    if (validateForm()) {
      window.location.href = "index1.html";
    } else {
        alert("Please check your data and try again.");
    }
});