// ===== LOGIN/REGISTER =====
const loginSection = document.getElementById("loginSection");
const registerSection = document.getElementById("registerSection");
const mainSystem = document.getElementById("mainSystem");

const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");

const loginMessage = document.getElementById("loginMessage");
const registerMessage = document.getElementById("registerMessage");

// Password toggle
const toggleLogin = document.getElementById("toggleLogin");
const loginPassword = document.getElementById("loginPassword");
toggleLogin.addEventListener("click", () => {
    loginPassword.type = loginPassword.type === "password" ? "text" : "password";
});

const toggleRegister = document.getElementById("toggleRegister");
const regPassword = document.getElementById("regPassword");
toggleRegister.addEventListener("click", () => {
    regPassword.type = regPassword.type === "password" ? "text" : "password";
});

// Switch to register
showRegister.onclick = () => {
    loginSection.classList.add("hidden");
    registerSection.classList.remove("hidden");
    loginMessage.textContent = "";
};

// Switch to login
showLogin.onclick = () => {
    registerSection.classList.add("hidden");
    loginSection.classList.remove("hidden");
    registerMessage.textContent = "";
};

// REGISTER
registerBtn.onclick = () => {
    const username = document.getElementById("regUsername").value.trim();
    const password = document.getElementById("regPassword").value.trim();

    if(!username || !password){
        registerMessage.textContent = "Please fill all fields!";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    if(users.some(u => u.username === username)){
        registerMessage.textContent = "Username already exists!";
        return;
    }

    users.push({username, password});
    localStorage.setItem("users", JSON.stringify(users));
    registerMessage.style.color = "green";
    registerMessage.textContent = "Account created! You can login now.";
};

// LOGIN
loginBtn.onclick = () => {
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const validUser = users.find(u => u.username === username && u.password === password);

    if(validUser){
        loginSection.classList.add("hidden");
        registerSection.classList.add("hidden");
        mainSystem.classList.remove("hidden");
        loginMessage.textContent = "";
        refreshTable(); // show students if any
    } else {
        loginMessage.textContent = "Invalid username or password!";
    }
};

// LOGOUT
document.getElementById("btnExit").addEventListener("click", () => {
    mainSystem.classList.add("hidden");
    loginSection.classList.remove("hidden");
});

// ===== STUDENT MANAGEMENT =====
let students = [];

document.getElementById("saveStudent").addEventListener("click", function() {
    const id = document.getElementById("id").value.trim();
    const name = document.getElementById("name").value.trim();
    const course = document.getElementById("course").value.trim();
    const year = document.getElementById("year").value.trim();
    const age = document.getElementById("age").value.trim();

    if(!id || !name || !course || !year || !age) {
        alert("Please fill all fields");
        return;
    }

    students.push({id, name, course, year, age});
    alert("Student saved!");
    clearAddForm();
    refreshTable();
});

function clearAddForm() {
    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
    document.getElementById("course").value = "";
    document.getElementById("year").value = "";
    document.getElementById("age").value = "";
}

// SHOW/HIDE SECTIONS
const sections = ["addSection","viewSection","searchSection","updateSection","deleteSection"];
function showSection(id){
    sections.forEach(sec => {
        document.getElementById(sec).classList.add("hidden");
    });
    document.getElementById(id).classList.remove("hidden");
}

document.getElementById("btnAdd").addEventListener("click", ()=>showSection("addSection"));
document.getElementById("btnView").addEventListener("click", ()=>{ 
    showSection("viewSection");
    refreshTable();
});
document.getElementById("btnSearch").addEventListener("click", ()=>showSection("searchSection"));
document.getElementById("btnUpdate").addEventListener("click", ()=>showSection("updateSection"));
document.getElementById("btnDelete").addEventListener("click", ()=>showSection("deleteSection"));

// REFRESH VIEW TABLE
function refreshTable(){
    const tbody = document.getElementById("tableBody");
    tbody.innerHTML = "";
    students.forEach(s => {
        tbody.innerHTML += `<tr>
            <td>${s.id}</td>
            <td>${s.name}</td>
            <td>${s.course}</td>
            <td>${s.year}</td>
            <td>${s.age}</td>
        </tr>`;
    });
}

// SEARCH STUDENT
document.getElementById("searchStudentBtn").addEventListener("click", function(){
    const query = document.getElementById("searchInput").value.toLowerCase();
    const tbody = document.getElementById("searchBody");
    tbody.innerHTML = "";
    students.filter(s => s.id.toLowerCase()===query || s.name.toLowerCase().includes(query))
        .forEach(s=>{
            tbody.innerHTML += `<tr>
                <td>${s.id}</td>
                <td>${s.name}</td>
                <td>${s.course}</td>
                <td>${s.year}</td>
                <td>${s.age}</td>
            </tr>`;
        });
});

// UPDATE STUDENT
document.getElementById("updateStudentBtn").addEventListener("click", function(){
    const id = document.getElementById("updateId").value.trim();
    const course = document.getElementById("updateCourse").value.trim();
    const year = document.getElementById("updateYear").value.trim();
    const age = document.getElementById("updateAge").value.trim();

    const student = students.find(s => s.id === id);
    if(!student){
        alert("Student ID not found!");
        return;
    }

    if(course) student.course = course;
    if(year) student.year = year;
    if(age) student.age = age;

    alert("Student updated!");
    clearUpdateForm();
    refreshTable(); // 👈 show updated info in View Students
});

function clearUpdateForm(){
    document.getElementById("updateId").value = "";
    document.getElementById("updateCourse").value = "";
    document.getElementById("updateYear").value = "";
    document.getElementById("updateAge").value = "";
}

// DELETE STUDENT
document.getElementById("deleteStudentBtn").addEventListener("click", function(){
    const id = document.getElementById("deleteId").value.trim();
    const index = students.findIndex(s => s.id === id);
    if(index === -1){
        alert("Student ID not found!");
        return;
    }
    students.splice(index,1);
    alert("Student deleted!");
    document.getElementById("deleteId").value = "";
    refreshTable();
});