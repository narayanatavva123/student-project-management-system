import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

/* 🔥 Firebase Config (PASTE YOUR VALUES HERE) */
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

/* 🌐 User state */
let currentUser = null;

/* 🔐 Google Login */
window.googleLogin = function () {
  signInWithPopup(auth, provider)
    .then((result) => {
      currentUser = result.user;

      document.getElementById("userInfo").innerHTML =
        "Welcome: " + currentUser.displayName;

      console.log("Logged in user:", currentUser);
    })
    .catch((error) => {
      console.log(error);
    });
};

/* 👀 Keep user logged in */
onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;

    document.getElementById("userInfo").innerHTML =
      "Welcome: " + user.displayName;
  }
});

/* 📌 Projects storage */
let projects = JSON.parse(localStorage.getItem("projects")) || [];

/* ➕ Add Project */
window.addProject = function () {
  if (!currentUser) {
    alert("Please login first!");
    return;
  }

  let studentName = document.getElementById("studentName").value;
  let title = document.getElementById("title").value;
  let technology = document.getElementById("technology").value;
  let status = document.getElementById("status").value;

  let project = {
    studentName,
    title,
    technology,
    status
  };

  projects.push(project);
  localStorage.setItem("projects", JSON.stringify(projects));

  renderTable();
};

/* 📋 Render Table */
function renderTable() {
  let table = document.getElementById("projectTable");
  table.innerHTML = "";

  projects.forEach((p, index) => {
    table.innerHTML += `
      <tr>
        <td>${p.studentName}</td>
        <td>${p.title}</td>
        <td>${p.technology}</td>
        <td>${p.status}</td>
        <td><button onclick="deleteProject(${index})">Delete</button></td>
      </tr>
    `;
  });
}

/* ❌ Delete */
window.deleteProject = function (index) {
  projects.splice(index, 1);
  localStorage.setItem("projects", JSON.stringify(projects));
  renderTable();
};

renderTable();