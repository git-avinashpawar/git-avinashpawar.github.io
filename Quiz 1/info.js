const name = document.getElementById("fullname");
const org = document.getElementById("org");
const cat = document.getElementById("cat");
const email = document.getElementById("email");

const saveBtn = document.getElementById("saveBtn");

name.addEventListener("keyup", () => {
  saveBtn.disabled = !name.value;
});

save = (e) => {
  if (typeof Storage !== "undefined") {
    localStorage.setItem("name", name.value);
    localStorage.setItem("org", org.value);
    localStorage.setItem("cat", cat.value);
    localStorage.setItem("email", email.value);
    window.location.href = "game.html";
  }
};
