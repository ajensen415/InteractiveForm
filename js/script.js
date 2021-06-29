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
    } else {
        otherJobRole.style.display = 'none';
    }
});

//variable declarations 
const design = document.getElementById("design");
const color = document.getElementById("color");
const colorOptions = color.children;

//disable color dropdown until user selects shirt design
color.disabled = true;

//t-shirt colors available by theme 
design.addEventListener("change", e => {
    color.disabled = false;
    for (let i = 0; i < colorOptions.length; i++) {
        const currentOption = colorOptions[i];
        const dataTheme = currentOption.getAttribute("data-theme");
        if (dataTheme == design.value) {
            currentOption.hidden = false;
            currentOption.selected = true;
        } else {
            currentOption.hidden = true;
            currentOption.selected = false;
        }
    }
});

//variable declarations 
const registerActivties = document.getElementById("activities");
const totalElement = document.getElementById("activities-cost");
let totalPrice = 0;

//register for activties & determine cost
registerActivties.addEventListener("change", e => {
    let dataCost = e.target.getAttribute("data-cost");
    if (e.target.checked) {
        totalPrice += parseInt(dataCost);
    } else {
        totalPrice -= parseInt(dataCost);
    }
    totalElement.innerHTML = "Total: $" + totalPrice;
});

//variable declarations 
let payWith = document.getElementById("payment");
let paymentMethods = document.getElementsByClassName("payment-methods")[0];
const creditCard = document.getElementById("credit-card");
const paypal = document.getElementById("paypal");
const bitcoin = document.getElementById("bitcoin");

//hide or display selected payment methods
paypal.style.display = 'none';
bitcoin.style.display = 'none';

payWith.children[1].setAttribute("selected", true);

payWith.addEventListener("change", e => {
    if (e.target.value == "credit-card") {
        creditCard.style.display = 'inherit';
        paypal.style.display = 'none';
        bitcoin.style.display = 'none';
    } else if (e.target.value == "paypal") {
        creditCard.style.display = 'none';
        paypal.style.display = 'inherit';
        bitcoin.style.display = 'none';
    } else if (e.target.value == "bitcoin") {
        creditCard.style.display = 'none';
        paypal.style.display = 'none';
        bitcoin.style.display = 'inherit';
    }
});

//variable declarations 
const cardNumber = document.getElementById("cc-num");
const zipCode = document.getElementById("zip");
const cvv = document.getElementById("cvv");
let form = document.querySelector("form");
const activitiesBox = document.getElementById("activities-box");
let activitiesCheckBoxes = registerActivties.querySelectorAll('[type="checkbox"]');
let formValid = true;

//form validation section 

form.addEventListener( "submit", e => {
    if (isNameValid() && isEmailValid() && isRegisterValid() && isPaymentValid()) {
        return true;
    } else {
        e.preventDefault();
        errorMessage(isNameValid(), nameInput.parentElement);
        errorMessage(isEmailValid(), emailInput.parentElement);
        errorMessage(isRegisterValid(), registerActivties);
    }
    if (payWith.value = 'credit-card') {
        errorMessage(isCardNumValid(), cardNumber.parentElement);
        errorMessage(isZipValid(), zipCode.parentElement);
        errorMessage(isCvvValid(), cvv.parentElement);
        }

});

//required fields validation functions

function isNameValid() {
    return /^[A-Za-z]+$/.test(nameInput.value);
}

function isEmailValid() {
    return /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailInput.value);
}

function isCardNumValid() {
    return /^\d{13,16}$/.test(cardNumber.value);
}

function isZipValid() {
    return /^\d{5}$/.test(zipCode.value);
}

function isCvvValid() {
    return /^\d{3}$/.test(cvv.value);
}

function isRegisterValid() {
    let registerSelect = false;
    for (let i = 0; i < activitiesCheckBoxes.length; i++) {
        if (activitiesCheckBoxes[i].checked) {
            registerSelect = true;
        }
    }
    return registerSelect;
}

function isPaymentValid() {
    if (payWith.value == 'credit-card')
    isCardNumValid();
    isZipValid();
    isCvvValid();
}

//Accessibility section - focus on checkboxes & error messaging function. 
for (let i = 0; i < activitiesCheckBoxes.length; i++) {
        activitiesCheckBoxes[i].addEventListener("focus", e =>  {
        activitiesCheckBoxes[i].parentElement.className += "focus";
    });
        activitiesCheckBoxes[i].addEventListener("blur", e =>  {
        activitiesCheckBoxes[i].parentElement.removeAttribute("class", "focus");
    });
}

function errorMessage (validationFunction, element) {
    if (!validationFunction) {
        element.classList.add("not-valid");
        element.classList.remove("valid")
        element.lastElementChild.style.display = "inherit";
    } else {
        element.classList.remove("not-valid");
        element.classList.add("valid");
        element.lastElementChild.style.display = "none";
    }

}
