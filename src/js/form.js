window.onload = function () {
  const form = document.getElementById("form");

  const pristine = new Pristine(form);

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var valid = pristine.validate();

    if (valid) {
      submitform(e);
    }
  });
};

function submitform(e) {
  const contactForm = document.getElementById("form");
  const button = document.querySelector(".contact-form__btn");
  const buttonSign = document.querySelector(".form-btn__sign").innerText;

  buttonSign.innerText = "Sending...";
  button.style.cursor = "progress";
  button.setAttribute("disabled", true);

  const [name, email, website, subject, comments] = e.target;

  const requestMessage = {
    text: `Message sent by ${name.value}\nEmail: ${email.value}\nWebsite: ${website.value}\nSubject: ${subject.value}\nComments: ${comments.value}`,
  };

  fetch(
    "https://hooks.slack.com/services/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",
    {
      method: "POST",
      body: JSON.stringify(requestMessage),
    }
  ).then(
    () => {
      contactForm.reset();
      button.style.cursor = "default";
      button.removeAttribute("disabled");
      buttonSign.innerText = "Successfully sent";

      setTimeout(() => {
        buttonSign.value = "Send";
      }, 2500);
    },
    (err) => {
      button.style.cursor = "default";
      button.removeAttribute("disabled");
      buttonSign.innerText = `Can't send right now`;

      setTimeout(() => {
        buttonSign.innerText = "Send";
      }, 2500);
    }
  );
}
