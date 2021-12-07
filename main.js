const nav = document.querySelector(".nav");

const navCollection = [
  { src: "./assets/main/nav/top-songs.png", text: "top songs" },
  { src: "./assets/main/nav/most-heard.png", text: "most head" },
  { src: "./assets/main/nav/song-of-the-day.png", text: "song of the day" },
  { src: "./assets/main/nav/surprise-me.png", text: "surprise me" },
  { src: "./assets/main/nav/top-singer.png", text: "taylor swift" },
  { src: "./assets/main/nav/top-singer.png", text: "akon" },
  { src: "./assets/main/nav/radio.png", text: "radio" },
  { src: "./assets/main/nav/friends.png", text: "friends" },
];

for (let i = 0; i < navCollection.length; i++) {
  const navItem = document.createElement("div");
  const navImgWrap = document.createElement("div");
  const navImg = document.createElement("img");
  const navText = document.createElement("div");

  navItem.classList.add("nav__item");
  navImgWrap.classList.add("nav__img-wrap");
  navImg.classList.add("nav__img");
  navText.classList.add("nav__text");
  navText.innerText = navCollection[i].text;
  navImg.setAttribute("src", navCollection[i].src);
  if (
    navCollection[i].text === "surprise me" ||
    navCollection[i].text === "akon"
  ) {
    navItem.classList.add("nav__item-endSection");
  }

  navItem.addEventListener("click", (e) => activeNav(e));
  const activeNav = (elem) => {
    clearActiveList();
    elem.currentTarget.setAttribute("active", "true");
  };

  navImgWrap.append(navImg);
  navItem.append(navImgWrap);
  navItem.append(navText);
  nav.append(navItem);
  nav.append(navItem);

  const clearActiveList = () => {
    const navList = document.querySelectorAll(".nav__item");
    navList.forEach((elem) => {
      elem.setAttribute("active", false);
    });
  };
}
