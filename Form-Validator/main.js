const username = document.getElementById("username");
const email = document.getElementById("email");
const id = document.getElementById("id");
const password = document.getElementById("password");
const number = document.getElementById("number");
const submitbtn = document.getElementById("submit");


submitbtn.addEventListener("click", function(event) {
    event.preventDefault();

    // Validate phone number
    if (number.value.length < 11) {
        number.setCustomValidity("Phone number must be of 11 digits");
        number.reportValidity();
        return; // Stop further validation after first error
    } else {
        number.setCustomValidity("");
    }
    
    // Validate password
    if (password.value.length < 10) {
        password.setCustomValidity("Password must be at least 10 characters long.");
        password.reportValidity();
        return; // Stop further validation after first error
    } else {
        password.setCustomValidity("");
    }
    
    window.alert("All validations passed!");
});