
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

const textField = document.getElementById('username');

// Change the placeholder text
textField.placeholder = "Lol";

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyBEZUkQ7wgyaaBu0EEoBDY8CG0bMsuyOkc",
authDomain: "isko-info.firebaseapp.com",
databaseURL: "https://isko-info-default-rtdb.asia-southeast1.firebasedatabase.app",
projectId: "isko-info",
storageBucket: "isko-info.appspot.com",
messagingSenderId: "1034226646649",
appId: "1:1034226646649:web:927171023d6ae34698dea8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Reference to Database
const db = getDatabase(app);

document.getElementById('username').addEventListener('keydown', function(event) {
    moveFocus(event, '.email');
});

document.getElementById("submit").addEventListener('click', function(e){

    set(ref(db, 'user/' + document.getElementById("username").value),
    {
        username: document.getElementById("username").value,
        email: document.getElementById("email").value
    });


})

function moveFocus(event, selector) {
    if (event.key === 'Enter' && event.target.value !== '') {
        event.preventDefault(); // Prevents form submission
        document.querySelector(selector).focus();
    }
}

function submitForm(event, selector) {
    if (event.key === 'Enter' && event.target.value !== '') {
        document.querySelector(selector).submit();
    }
}


