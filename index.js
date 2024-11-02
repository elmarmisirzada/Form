// Selecting elements
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// Utility function to show error
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = "form-control error";
    const small = formControl.querySelector("small");
    small.innerText = message;
}

// Utility function to show success
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}

// Check if email is valid
function checkEmail(input) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, "Email is not valid");
    }
}

// Check if password meets requirements
function checkPassword(input) {
    const re = /^(?=.*\d)(?=.*[A-Z]).+$/; // At least one digit and first letter uppercase
    if (!re.test(input.value.trim())) {
        showError(input, "Password must contain at least one digit and start with an uppercase letter");
    } else {
        showSuccess(input);
    }
}

// Check if username has at least 5 characters
function checkUsername(input) {
    if (input.value.trim().length < 5) {
        showError(input, "Username must be at least 5 characters");
    } else {
        showSuccess(input);
    }
}

// Check if passwords match
function checkPasswordsMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, "Passwords do not match");
    } else {
        showSuccess(input2);
    }
}

// Add blur event listeners for immediate validation
username.addEventListener("blur", () => {
    if (username.value.trim() === "") {
        showError(username, "Username is required");
    } else {
        checkUsername(username);
    }
});

email.addEventListener("blur", () => {
    if (email.value.trim() === "") {
        showError(email, "Email is required");
    } else {
        checkEmail(email);
    }
});

password.addEventListener("blur", () => {
    if (password.value.trim() === "") {
        showError(password, "Password is required");
    } else {
        checkPassword(password);
    }
});

password2.addEventListener("blur", () => {
    if (password2.value.trim() === "") {
        showError(password2, "Confirm Password is required");
    } else {
        checkPasswordsMatch(password, password2);
    }
});

// Event listener for form submission
form.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;

    // Run all checks again on submit to ensure all fields are validated
    if (username.value.trim() === "") {
        showError(username, "Username is required");
        isValid = false;
    } else {
        checkUsername(username);
    }

    if (email.value.trim() === "") {
        showError(email, "Email is required");
        isValid = false;
    } else {
        checkEmail(email);
    }

    if (password.value.trim() === "") {
        showError(password, "Password is required");
        isValid = false;
    } else {
        checkPassword(password);
    }

    if (password2.value.trim() === "") {
        showError(password2, "Confirm Password is required");
        isValid = false;
    } else {
        checkPasswordsMatch(password, password2);
    }

    // Display appropriate SweetAlert message based on validation
    if (isValid) {
        Swal.fire({
            title: "Good job!",
            text: "You successfully submitted the form!",
            icon: "success"
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="#">Why do I have this issue?</a>'
        });
    }
});

