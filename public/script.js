import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

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
const db = getFirestore(app);

async function loadProjects() {
  const querySnapshot = await getDocs(collection(db, "projects"));

  const table = document.getElementById("projectTable");
  table.innerHTML = "";

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

window.addProject = async function () {
  const studentName = document.getElementById("studentName").value;
  const title = document.getElementById("title").value;
  const technology = document.getElementById("technology").value;
  const status = document.getElementById("status").value;

  if (!studentName || !title || !technology) {
    alert("Please fill all fields");
    return;
  }

  await addDoc(collection(db, "projects"), {
    studentName,
    title,
    technology,
    status
  });

  document.getElementById("studentName").value = "";
  document.getElementById("title").value = "";
  document.getElementById("technology").value = "";

  loadProjects();
};

window.deleteProject = async function (id) {
  await deleteDoc(doc(db, "projects", id));
  loadProjects();
};

loadProjects();
