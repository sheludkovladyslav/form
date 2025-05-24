import { getUsers } from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#loginForm");

  const loginHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector("#loginUsername").value.trim();
    const pass = document.querySelector("#loginPassword").value.trim();

    const users = await getUsers();

    const user = users.find(
      (user) => user.username === username && user.password === pass
    );

    if (user) {
      localStorage.setItem("username", username);
      alert(`Вхід успішний! Дякую, ${username}`);

      window.location.href = "./partials/profile.html";
    } else {
      alert("Вхід неуспішний! Перевірте логін та пароль!");
    }
  };

  form.addEventListener("submit", loginHandler);
});
