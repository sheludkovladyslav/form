import latinLetters from "../data/latinLetters.json";
import symbols from "../data/symbols.json";

const form = document.querySelector("#registerForm");

const formSendHandler = (event) => {
  event.preventDefault();
  const userName = form.querySelector("#username");
  const userPassword = form.querySelector("#password");
  const userConfirm = form.querySelector("#confirmPassword");
  const userEmail = form.querySelector("#email");

  const userNameValue = userName.value.trim();
  const userPasswordValue = userPassword.value;
  const userConfirmValue = userConfirm.value;
  const userEmailValue = userEmail.value.trim();

  if (!userEmailValue.includes("@")) {
    const message = "Емейл повинен містити @";
    alert(message);
    userEmail.style.border = "1px solid red";
  } else {
    userEmail.style.border = "1px solid green";
  }

  if (![...userNameValue].every((letter) => latinLetters.includes(letter))) {
    const message = "Логін повинен складатись лише з латинських літер!";
    alert(message);
    userName.style.border = "1px solid red";
  } else {
    userName.style.border = "1px solid green";
  }

  if (![...userPasswordValue].some((letter) => symbols.includes(letter))) {
    const message = "Пароль повинен включати в собі спеціальний символ!";
    alert(message);
    userPassword.style.border = "1px solid red";
  } else {
    userPassword.style.border = "1px solid green";
  }

  if (userPasswordValue.toLowerCase() === userPasswordValue) {
    const message = "Пароль повинен включати в собі хоча б одну велику букву!";
    alert(message);
    userPassword.style.border = "1px solid red";
  } else {
    userPassword.style.border = "1px solid green";
  }

  if (![...userPasswordValue].some((number) => "0123456789".includes(number))) {
    const message = "Пароль повинен містити цифру!";
    alert(message);
    userPassword.style.border = "1px solid red";
  } else {
    userPassword.style.border = "1px solid green";
  }

  if (userPasswordValue.length >= 8) {
    userPassword.style.border = "1px solid green";
  } else {
    const message = "Пароль повинен містити більше ніж 8 символів";
    alert(message);
    userPassword.style.border = "1px solid red";
  }

  if (userPasswordValue === userConfirmValue) {
    userConfirm.style.border = "1px solid green";
  } else {
    const message = "Паролі повинні сходитись!";
    alert(message);
    userConfirm.style.border = "1px solid red";
  }
};

form.addEventListener("submit", formSendHandler);
