//variable declarations 
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const jobRole = document.getElementById("title");
const otherJobRole = document.getElementById("other-job-role");

//Focus on name field 
nameInput.focus();

//hide other text field
otherJobRole.style.display = 'none';

//show other text field if other is selected 
jobRole.addEventListener("change", e => {
    if (e.target.value == "other") {
        otherJobRole.style.display = 'inherit';
    } 
});