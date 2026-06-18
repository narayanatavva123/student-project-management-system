import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

/* Firebase Config */
const firebaseConfig = {
  apiKey: "AIzaSyD3unsHh302u3B2ih7v4MKdXoW3HhzKxuU",
  authDomain: "student-project-narayana.firebaseapp.com",
  projectId: "student-project-narayana",
  storageBucket: "student-project-narayana.firebasestorage.app",
  messagingSenderId: "204073185501",
  appId: "1:204073185501:web:2f41a92293b6af2a192b34",
  measurementId: "G-BR9H1KGZQQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

let currentUser = null;

/* Google Login */
window.googleLogin = async function () {
  try {
    const result = await signInWithPopup(auth, provider);

    currentUser = result.user;

    document.getElementById("userInfo").innerHTML =
      "Welcome, " + currentUser.displayName;

    loadProjects();
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

/* Logout */
window.logout = async function () {
  await signOut(auth);

  document.getElementById("userInfo").innerHTML =
    "Not Logged In";

  currentUser = null;
};

/* User State */
onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;

    document.getElementById("userInfo").innerHTML =
      "Welcome, " + user.displayName;

    loadProjects();
  }
});

/* Load Projects */
async function loadProjects() {
  const table = document.getElementById("projectTable");

  if (!table) return;

  table.innerHTML = "";

  const querySnapshot = await getDocs(
    collection(db, "projects")
  );

  querySnapshot.forEach((docItem) => {
    const project = docItem.data();

    table.innerHTML += `
      <tr>
        <td>${project.studentName}</td>
        <td>${project.title}</td>
        <td>${project.technology}</td>
        <td>${project.status}</td>
        <td>
          <button onclick="deleteProject('${docItem.id}')">
            Delete
          </button>
        </td>
      </tr>
    `;
  });
}

/* Add Project */
window.addProject = async function () {

  if (!currentUser) {
    alert("Please Login With Google First");
    return;
  }

  const studentName =
    document.getElementById("studentName").value;

  const title =
    document.getElementById("title").value;

  const technology =
    document.getElementById("technology").value;

  const status =
    document.getElementById("status").value;

  if (
    studentName === "" ||
    title === "" ||
    technology === ""
  ) {
    alert("Please Fill All Fields");
    return;
  }

  await addDoc(
    collection(db, "projects"),
    {
      studentName,
      title,
      technology,
      status,
      createdBy: currentUser.email
    }
  );

  document.getElementById("studentName").value = "";
  document.getElementById("title").value = "";
  document.getElementById("technology").value = "";

  loadProjects();
};

/* Delete Project */
window.deleteProject = async function (id) {
  await deleteDoc(
    doc(db, "projects", id)
  );

  loadProjects();
};

loadProjects();