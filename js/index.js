const navbar = document.getElementById("navbar");
const form = document.querySelector(".contact-main");
let userName = document.getElementById("name");
let email = document.getElementById("email");
let message = document.getElementById("message");
let number = document.getElementById("number");
const submit = document.getElementById("submit");
const messageDiv = document.querySelector(".message-div");
const closeMessageDiv = document.querySelector(".close-img");
const messageImg = document.querySelector(".message-img");
const mainMessageContainer = document.querySelector(".message-main");
const imageDiv = document.querySelector(".message-img-div");
const messageInfo = document.querySelector(".message-info");
const menu = document.querySelector(".menu");
const smallNav = document.querySelector(".small-nav");
const closeSmallNav = document.querySelector(".close-small-nav");

const SERVER_URI = "";

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.style.backgroundColor = "#272727";
  } else {
    navbar.style.backgroundColor = "transperent";
  }
});

// validation of form data
const validateData = (userName, email, message, number) => {
  if (!userName || !email || !message) {
    return {
      status: false,
      message: "Please fill the information !",
    };
  } else if (number) {
    if (number.length == 10) {
      return {
        status: true,
        message: "Correct number",
      };
    } else {
      return {
        status: false,
        message: "Incorrect Number !",
      };
    }
  } else {
    return {
      status: true,
      message: "Validate",
    };
  }
};

submit.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    validateData(userName.value, email.value, message.value, number.value)
      .status
  ) {
    const data = {
      name: userName.value,
      message: message.value,
      number: number.value,
      email: email.value,
      timestamp: Date.now(),
    };

    fetch(`${SERVER_URI}/api/new/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => showMessage("Thank you for reaching me !", false))
      .catch((err) => showMessage("Something went wrong !", true));
  } else {
    showMessage(
      validateData(userName.value, email.value, message.value, number.value)
        .message,
      true
    );
  }
});

const clearForm = () => {
  userName.value = "";
  email.value = "";
  message.value = "";
  number.value = "";
};

const showMessage = (message, error) => {
  if (!error) {
    imageDiv.innerHTML = `<img src="/images/success.png"/>`;
    messageInfo.innerText = message;
    messageDiv.classList.add("open-message");

    setTimeout(() => {
      messageDiv.classList.remove("open-message");
      clearForm();
    }, 2500);
  } else {
    imageDiv.innerHTML = `<img src="/images/wrong.png"/>`;
    messageInfo.innerText = message;
    messageDiv.classList.add("open-message");

    setTimeout(() => {
      messageDiv.classList.remove("open-message");
    }, 2000);
  }
};

closeMessageDiv.addEventListener("click", () => {
  messageDiv.classList.remove("open-message");
});

messageDiv.addEventListener("click", () => {
  if (mainMessageContainer.classList.contains("animate-div")) {
    mainMessageContainer.classList.remove("animate-div");
  } else {
    mainMessageContainer.classList.add("animate-div");
  }
});

menu.addEventListener("click", () => {
  if (smallNav.classList.contains("close-small-nav")) {
    smallNav.classList.remove("close-small-nav");
  } else {
    smallNav.classList.add("open-small-nav");
  }
});

closeSmallNav.addEventListener("click", () => {
  smallNav.classList.remove("open-small-nav");
});

const hideSmallNav = () => {
  smallNav.classList.remove("open-small-nav");
};
