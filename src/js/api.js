export const getUsers = async () => {
  try {
    const url = "http://localhost:3000/users";

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Помилка при отримуванні юзерів");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Помилка при отриманні юзерів.");
  }
};
