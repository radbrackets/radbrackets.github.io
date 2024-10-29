let contactForm = document.getElementById("contact-us");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let submitButton = document.getElementById("submit-button");
  let labelReason = document.getElementById("reason-label");
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
  } else {
    labelReason.style.color = "red";
    labelReason.innerText = "Message is too short!";
    submitButton.innerText = "Failed!";
    submitButton.style.backgroundColor = "red";
    submitButton.style.border = "red";
    setTimeout(() => {
      labelReason.innerText =
        "We are here to solve problems, write about yours";
      labelReason.style.color = "#fff";
      submitButton.innerText = "Let's talk";
      submitButton.style.backgroundColor = "#000";
      submitButton.style.border = "#000";
    }, 3000);
  }
});
