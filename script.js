// Get Data
const form = document.querySelector('#form');
const usernameInput = document.querySelector('#username')
const emailInput = document.querySelector('#email')
const interestInput = document.querySelector('#interestInput')

const dataviewtable = document.getElementById("dataView");


form.addEventListener('submit', (event) => {
    validateForm();
    var isValid = isFormValid();
    if (isValid == true) {
        openPopup();
        //form.submit();	
        event.preventDefault();
    } else {
        event.preventDefault();
    }

});

function isFormValid() {
    const inputContainers = form.querySelectorAll('.input-group');
    let result = true;
    inputContainers.forEach((container) => {
        if (container.classList.contains('error')) {
            result = false;
        }
    });
    return result;
}

function validateForm() {
    //USERNAME
    if (usernameInput.value.trim() == '') {
        setError(usernameInput, 'Skriv ditt fullständiga namn');
    } else if (usernameInput.value.trim().length < 5 || usernameInput.value.trim().length > 15) {
        setError(usernameInput, 'Namnet måste vara min 5 tecken');
    } else {
        setSuccess(usernameInput);
    }
    //Email
    if (emailInput.value.trim() == '') {
        setError(emailInput, 'Skriva ditt email');
    } else if (isEmailValid(emailInput.value)) {
        setSuccess(emailInput);
    } else {
        setError(emailInput, 'Ej giltigt e-post')
    }
    // interest
    if (dataviewtable.rows.length == 0) {
        setError(interestInput, 'Ange minst 1 intresse')
    } else {
        setSuccess(interestInput);
    }
}


// Validation error 
function setError(element, errorMessage) {
    const parent = element.parentElement;
    if (parent.classList.contains('success')) {
        parent.classList.remove('success');
    }
    parent.classList.add('error');
    const paragraph = parent.querySelector('p');
    paragraph.textContent = errorMessage;
}

// Validation Success
function setSuccess(element) {
    const parent = element.parentElement;
    if (parent.classList.contains('error')) {
        parent.classList.remove('error');
    }
    parent.classList.add('success');
}

// email validation
function isEmailValid(email) {
    const reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return reg.test(email);
}

//  popup message
let popup = document.getElementById("popup")
function openPopup() {
    if (usernameInput.value.trim() == '' || emailInput.value.trim() == '') {
    } else {
        popup.classList.add("open-Popup")
    }
}
function closePopup() {
    popup.classList.remove("open-Popup");
    form.submit();
}

// get age list
var studentAge = ['', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
var option = "";
for (var i = 0; i < studentAge.length; i++) {
    option += '<option value="' + studentAge[i] + '">' + studentAge[i] + "</option>"
}
document.getElementById('age').innerHTML = option

// Hide show element
window.onload = document.getElementById("typeOfRum").style.display = "none";
window.onload = document.getElementById("listItem").style.display = "none";

function typRum(x) {
    if (x == 0) {
        document.getElementById("typeOfRum").style.display = 'block';
    } if (x == 1) {
        document.getElementById("typeOfRum").style.display = 'none';
    }
}

// add interest fuction 
function pushData() {

    var inputText = interestInput.value;
    //Validate input given by user
    if (interestInput.value.trim() == '') {
        setError(interestInput, 'Ange minst 1 intresse');
        return;
    }

    let totalRowCount = dataviewtable.rows.length;
    if (totalRowCount == 0) {
        //Add header of table
        dataviewtable.innerHTML += '<thead><tr><th>Intresserad</th><th></th></tr></thead>';
        dataviewtable.innerHTML += '<tbody id="dataviewtableBody"></tbody>';
    }
    else {
        totalRowCount = totalRowCount - 1;
    }
    let tableRow = '<tr class="grey-border" id="r' + (totalRowCount) + '"><td width="70%">' + inputText + '</td><td class="text-center" width="20%"><i onclick="deleteRow(this)" class="fas fa-trash" style="color:#6e6e6e;cursor:pointer"></i></td></tr>';
    document.getElementById("dataviewtableBody").innerHTML += tableRow;

    //Check if the row is there and the input is not red 
    if (interestInput.parentNode.classList.contains("error")) {
        setSuccess(interestInput);
    }

    document.getElementById("interestInput").value = "";

    document.getElementById("listItem").style.display = "block";
}

function deleteRow(deleteIcon) {
    let row = deleteIcon.parentNode.parentNode;

    //get the table from row.parentNode and delete the row
    row.parentNode.removeChild(row);

    //Check if there is only header row left by counting the table rows
    if (dataviewtable.rows.length == 1)
        dataviewtable.innerHTML = "";
}

function enterPress(event) {

    if (event.keyCode == 13 || event.which == 13) {
        pushData();
        event.preventDefault();
        return false;
    }
}

