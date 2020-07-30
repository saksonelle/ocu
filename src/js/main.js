const body = document.getElementsByTagName("body")[0];
const ham = document.getElementById("ham");
const menu__wrap = document.getElementById("menu__wrap");
const menu__item = document.getElementsByClassName("menu__item");
const header = document.getElementById("scrollHeader");
const sticky = header.offsetTop;
const info__logo = document.querySelector(".info__logo");

window.onscroll = function () {
  scrollStickyMenu();
};

// toggle menu
ham.addEventListener("click", function () {
  body.classList.toggle("noscroll");
  ham.classList.toggle("clicked");
  menu__wrap.classList.toggle("clicked");
});

for (let item of menu__item) {
  item.addEventListener("click", function () {
    if (ham.classList.contains("clicked")) {
      body.classList.toggle("noscroll");
      ham.classList.toggle("clicked");
      menu__wrap.classList.toggle("clicked");
    }
  });
}

// Add active class to the current button (highlight it)
for (let i = 0; i < menu__item.length; i++) {
  menu__item[i].addEventListener("click", function () {
    const current = document.getElementsByClassName("menu__link--active");
    current[0].className = current[0].className.replace(
      " menu__link--active",
      ""
    );
    this.className += " menu__link--active";
  });
}

// sticky scroll menu
function scrollStickyMenu() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");

    if (info__logo) {
      info__logo.classList.add("info__logo--sticky");
    }
  } else {
    header.classList.remove("sticky");

    if (info__logo) {
      info__logo.classList.remove("info__logo--sticky");
    }
  }
}
