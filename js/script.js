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

//disblae color options not available for design selected
design.addEventListener("change", e => {
    color.disabled = false;
    for (let i = 0; i < colorOptions.length; i++) {
        const currentOption = colorOptions[i];
        const dataTheme = currentOption.getAttribute("data-theme");
        if (e.target.value == dataTheme) {
            currentOption.disabled = false;
        } else {
            currentOption.disabled = true;
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

//hide/display selected payment methods
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

let formValid = true;

//form validation section 
form.addEventListener("submit", e => {
    nameValidation();
    emailValidation();
    registerValidation();

    if(payWith.value == "credit-card") {
    cardNumValidation();
    zipValidation();
    cvvValidation();
    }

    if (!formValid) {
    e.preventDefault();  
    }
});

function nameValidation() {
    const nameValue = nameInput.value;
    if (isNameValid(nameValue)) {
        nameInput.parentElement.className += "valid";
        nameInput.classList.remove("not-valid");
        nameInput.parentElement.lastElementChild.display = "none";
    } else {
        nameInput.parentElement.className += "not-valid";
        nameInput.classList.remove("valid");
        nameInput.parentElement.lastElementChild.display = "inherit";
        console.log('test');
        formValid = false;
    }
}

function isNameValid(name) {
    return /^[A-Za-z]+$/.test(name);
}

function emailValidation() {
    const emailValue = emailInput.value;
    if (isEmailValid(emailValue)) {
        emailInput.parentElement.className += "valid";
        emailInput.classList.remove("not-valid");
        emailInput.parentElement.lastElementChild.display = "none";
    } else {
        emailInput.parentElement.className += "not-valid";
        emailInput.classList.remove("valid");
        emailInput.parentElement.lastElementChild.display = "inherit";
        formValid = false;
    }
}

function isEmailValid(email) {
    return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
}

function cardNumValidation() {
    const cardValue = cardNumber.value;
    if (isCardNumValid(cardValue)) {
        cardNumber.parentElement.className += "valid";
        cardNumber.classList.remove("not-valid");
        cardNumber.parentElement.lastElementChild.display = "none";
    } else {
        cardNumber.parentElement.className += "not-valid";
        cardNumber.classList.remove("valid");
        cardNumber.parentElement.lastElementChild.display = "inherit";
        formValid = false;
    }
}

function isCardNumValid(cardnumber) {
    return /^\d{13,16}$/.test(cardnumber);
}

function zipValidation() {
    const zipValue = zipCode.value;
    if (isZipValid(zipValue)) {
        zipCode.parentElement.className += "valid";
        zipCode.classList.remove("not-valid");
        zipCode.parentElement.lastElementChild.display = "none";
    } else {
        zipCode.parentElement.className += "not-valid";
        zipCode.classList.remove("valid");
        zipCode.parentElement.lastElementChild.display = "inherit";
        formValid = false;
    }
}

function isZipValid(zipcode) {
    return /^\d{5}$/.test(zipcode);
}

function cvvValidation() {
    const cvvValue = cvv.value;
    if (isCvvValid(cvvValue)) {
        cvv.parentElement.className += "valid";
        cvv.classList.remove("not-valid");
        cvv.parentElement.lastElementChild.display = "none";
    } else {
        cvv.parentElement.className += "not-valid";
        cvv.classList.remove("valid");
        cvv.parentElement.lastElementChild.display = "inherit";
        formValid = false;
    }
}

function isCvvValid(cvv) {
    return /^\d{3}$/.test(cvv);
}

function registerValidation() {
    if (isRegisterValid()) {
        activitiesBox.className += "valid";
        activitiesBox.lastElementChild.display = "none";
    } else {
        activitiesBox.className += "not-valid";
        activitiesBox.lastElementChild.display = "inherit";
        formValid = false;
    }
}

function isRegisterValid() {
    for (let i = 0; i < activitiesBox.children.length; i++) {
        if (activitiesBox.children[i].children[0].checked) {
            activitiesBox.children[i].classList.remove("not-valid");
            return true;
        } else {
            activitiesBox.children[i].classList.remove("valid");
        }
    }
    return false;
}

//Accessibility section 
let activitiesCheckBoxes = activitiesBox.querySelectorAll('[type="checkbox"]');

for (let i = 0; i < activitiesCheckBoxes.length; i++) {
        activitiesCheckBoxes[i].addEventListener("focus", e =>  {
        activitiesCheckBoxes[i].className += "focus";
    });
        activitiesCheckBoxes[i].addEventListener("blur", e =>  {
        activitiesCheckBoxes[i].classList.remove("focus");
    });
}




