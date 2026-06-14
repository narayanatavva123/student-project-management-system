async function loadProjects() {
  const response = await fetch("/api/projects");
  const projects = await response.json();

  const table = document.getElementById("projectTable");
  table.innerHTML = "";

  projects.forEach(project => {
    table.innerHTML += `
      <tr>
        <td>${project.studentName}</td>
        <td>${project.title}</td>
        <td>${project.technology}</td>
        <td>${project.status}</td>
        <td>
          <button class="delete" onclick="deleteProject(${project.id})">Delete</button>
        </td>
      </tr>
    `;
  });
}

async function addProject() {
  const studentName = document.getElementById("studentName").value;
  const title = document.getElementById("title").value;
  const technology = document.getElementById("technology").value;
  const status = document.getElementById("status").value;

  if (studentName === "" || title === "" || technology === "") {
    alert("Please fill all fields");
    return;
  }

  await fetch("/api/projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      studentName,
      title,
      technology,
      status
    })
  });

  document.getElementById("studentName").value = "";
  document.getElementById("title").value = "";
  document.getElementById("technology").value = "";

  loadProjects();
}

async function deleteProject(id) {
  await fetch(`/api/projects/${id}`, {
    method: "DELETE"
  });

  loadProjects();
}

loadProjects();