import latinLetters from "../data/latinLetters.json";
import symbols from "../data/symbols.json";

const form = document.querySelector("#registerForm");

const formSendHandler = (event) => {
  event.preventDefault();

  let hasError = false;

  const userName = form.querySelector("#username");
  const userPassword = form.querySelector("#password");
  const userConfirm = form.querySelector("#confirmPassword");
  const userEmail = form.querySelector("#email");

  const userNameValue = userName.value.trim();
  const userPasswordValue = userPassword.value;
  const userConfirmValue = userConfirm.value;
  const userEmailValue = userEmail.value.trim();

  if (!userEmailValue.includes("@")) {
    alert("Емейл повинен містити @");
    userEmail.style.border = "1px solid red";
    hasError = true;
  } else {
    userEmail.style.border = "1px solid green";
  }

  if (![...userNameValue].every((letter) => latinLetters.includes(letter))) {
    alert("Логін повинен складатись лише з латинських літер!");
    userName.style.border = "1px solid red";
    hasError = true;
  } else {
    userName.style.border = "1px solid green";
  }

  if (![...userPasswordValue].some((letter) => symbols.includes(letter))) {
    alert("Пароль повинен включати спеціальний символ!");
    userPassword.style.border = "1px solid red";
    hasError = true;
  } else {
    userPassword.style.border = "1px solid green";
  }

  if (userPasswordValue.toLowerCase() === userPasswordValue) {
    alert("Пароль повинен включати хоча б одну велику букву!");
    userPassword.style.border = "1px solid red";
    hasError = true;
  } else {
    userPassword.style.border = "1px solid green";
  }

  if (![...userPasswordValue].some((number) => "0123456789".includes(number))) {
    alert("Пароль повинен містити цифру!");
    userPassword.style.border = "1px solid red";
    hasError = true;
  } else {
    userPassword.style.border = "1px solid green";
  }

  if (userPasswordValue.length < 8) {
    alert("Пароль повинен містити більше ніж 8 символів");
    userPassword.style.border = "1px solid red";
    hasError = true;
  } else {
    userPassword.style.border = "1px solid green";
  }

  if (userPasswordValue !== userConfirmValue) {
    alert("Паролі повинні співпадати!");
    userConfirm.style.border = "1px solid red";
    hasError = true;
  } else {
    userConfirm.style.border = "1px solid green";
  }

  if (!hasError) {
    const newUser = {
      username: userNameValue,
      email: userEmailValue,
      password: userPasswordValue,
    };

    createAccount(newUser);
    form.reset();
    alert("Реєстрація успішна, дякую!");
    window.location.href = "/index.html";
  }
};

form.addEventListener("submit", formSendHandler);

const createAccount = async (newUser) => {
  const url = "http://localhost:3000/users";

  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Помилка при створенні юзера.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Помилка при додаванні юзера.", error);
  }
};
