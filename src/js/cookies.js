const cookies = document.querySelector(".cookies");

if (!Cookies.get("popup")) {
  setTimeout(function () {
    cookies.removeAttribute("hidden");
    cookies.classList.toggle("fadeInDown");
  }, 100);
}

cookies.addEventListener(
  "click",
  function () {
    cookies.classList.toggle("fadeInDown");
    cookies.classList.toggle("slideOutUp");

    Cookies.set("popup", "true", { expires: 7, path: "/" });

    setTimeout(function () {
      cookies.setAttribute("hidden", "true");
      cookies.classList.toggle("slideOutUp");
    }, 50);
  },
  false
);
