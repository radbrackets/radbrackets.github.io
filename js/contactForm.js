let contactForm = document.getElementById("contact-us");
let textareaInput = document.querySelector("#reason");
const submitButton = document.getElementById("submit-button");
textareaInput.addEventListener("input", () => {
  if (String(textareaInput.value).trim().length > 9) {
    submitButton.removeAttribute("disabled");
  } else if (
    String(textareaInput.value).trim().length <= 9 &&
    submitButton.getAttribute("disabled") === null
  ) {
    submitButton.setAttribute("disabled", "");
  }
});
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let formData = new FormData(contactForm);
  let textareaInput = document.getElementById("reason").value;
  if (String(textareaInput).trim().length > 9) {
    fetch(contactForm.action, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          submitButton.innerText = "Success!";
          submitButton.style.backgroundColor = "green";
          submitButton.style.border = "green";
          return response.json();
        }
        throw new Error("Wystąpił błąd podczas wysyłki danych");
      })
      .then((data) => {
        setTimeout(() => {
          submitButton.innerText = "Let's talk";
          submitButton.style.backgroundColor = "#000";
          submitButton.style.border = "#000";
          contactForm.reset(); // Wyczyść formularz po wysyłce
        }, 3000);
      })
      .catch((error) => {
        submitButton.innerText = "Failed!";
        submitButton.style.backgroundColor = "red";
        submitButton.style.border = "red";
        setTimeout(() => {
          submitButton.innerText = "Let's talk";
          submitButton.style.backgroundColor = "#000";
          submitButton.style.border = "#000";
        }, 3000);
      });
  }
});
