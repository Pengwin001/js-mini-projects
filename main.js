const insertButton = document.getElementById("btn");
const Name = document.getElementById("name");
const mobNum = document.getElementById("mobNo");
const Email = document.getElementById("email");
const inputField = document.getElementsByClassName("input-fields");
const List = document.getElementById("table-list");


let usersData = JSON.parse(localStorage.getItem("users-data")) || [];
let currentUserId = null;


function renderTable(){
List.innerHTML = usersData.map(user => `
    <tr>
    <td>${user.id}</td>
    <td>${user.name}</td>
    <td>${user.mob}</td>
    <td>${user.email}</td>
    <td>
      <button class="edit-btn" onclick="updateUser(${user.id})">Edit</button>
      <button class="delete-btn" onclick="deleteUser(${user.id})">Delete</button>
    </td>
    </tr>
    `).join('');
}

function addUser(){
    const name = Name.value.trim();
    const mob = mobNum.value.trim();
    const email = Email.value.trim();
    if (name && mob && email.value != ""){
    const id = usersData.length ? Math.max(...usersData.map(user => user.id)) + 1 : 1;
    usersData.push({ id, name, mob, email });
    localStorage.setItem("users-data", JSON.stringify(usersData));
    Name.value = mobNum.value = Email.value = "";
    renderTable();
    } else {
        alert("All fields are required");
    }
}

// function editUser(userId){
//     const name = Name.value;
//     const mob = mobNum.value;
//     const email = Email.value;
//     if (email && name && mob != "") {
//         const user = users.find(user => user.id === userId);
//         if (user) {
//             user.name = name;
//             user.mob = mob;
//             user.email = email;
//             localStorage.setItem("usersData", JSON.stringify(usersData));
//             hideUpdateForm();
//             renderTable();
//         }
//     }
// }

function deleteUser(userId){
 usersData = usersData.filter(user => user.id !== userId);
 localStorage.setItem("users-data", JSON.stringify(usersData));
 renderTable();
}

insertButton.addEventListener("click", addUser);
renderTable();