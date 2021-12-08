const nav = document.querySelector(".nav");
const playlist = document.querySelector(".playlist");
const contentWrap = document.querySelector(".content__wrap");

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
const playlistCollection = [
  {
    src: "./assets/main/playlist/shakira.png",
    group: "shakira",
    song: "dare la la ",
  },
  {
    src: "./assets/main/playlist/pharrell-williams.png",
    group: "pharrell-williams",
    song: "happy",
  },
  {
    src: "./assets/main/playlist/john-legend.png",
    group: "john legend",
    song: "all of me",
  },
  {
    src: "./assets/main/playlist/katy-perry.png",
    group: "katy-perry",
    song: "dark horse",
  },
  {
    src: "./assets/main/playlist/bastille.png",
    group: "bastille",
    song: "pompeii",
  },
  {
    src: "./assets/main/playlist/aloe-blacc.png",
    group: "aloe alacc",
    song: "the man",
  },
];

const contentCollection = [
  { src: "./assets/main/content/1.png" },
  { src: "./assets/main/content/2.png" },
  { src: "./assets/main/content/3.png" },
  { src: "./assets/main/content/4.png" },
  { src: "./assets/main/content/5.png" },
  { src: "./assets/main/content/6.png" },
  { src: "./assets/main/content/7.png" },
  { src: "./assets/main/content/8.png" },
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
  if (
    navCollection[i].text === "surprise me" ||
    navCollection[i].text === "akon"
  ) {
    navItem.classList.add("nav__item-endSection");
  }

  navText.innerText = navCollection[i].text;
  navImg.setAttribute("src", navCollection[i].src);

  navImgWrap.append(navImg);
  navItem.append(navImgWrap);
  navItem.append(navText);
  nav.append(navItem);
  nav.append(navItem);

  navItem.addEventListener("click", (e) => activeNav(e));
  const activeNav = (elem) => {
    clearActiveList();
    elem.currentTarget.setAttribute("active", "true");
  };

  const clearActiveList = () => {
    const navList = document.querySelectorAll(".nav__item");
    navList.forEach((elem) => {
      elem.setAttribute("active", false);
    });
  };
}

for (let i = 0; i < playlistCollection.length; i++) {
  const playlistItem = document.createElement("div");
  const playlistImg = document.createElement("img");
  const playlistInfo = document.createElement("div");
  const playlistGroup = document.createElement("div");
  const playlistSong = document.createElement("div");

  playlistItem.classList.add("playlist__item");
  playlistImg.classList.add("playlist__img");
  playlistInfo.classList.add("playlist__info");
  playlistGroup.classList.add("playlist__group");
  playlistSong.classList.add("playlist__song");

  playlistInfo.append(playlistSong);
  playlistInfo.append(playlistGroup);
  playlistItem.append(playlistImg);
  playlistItem.append(playlistInfo);
  playlist.append(playlistItem);

  playlistGroup.innerText = playlistCollection[i].group;
  playlistSong.innerText = playlistCollection[i].song;
  playlistImg.setAttribute("src", playlistCollection[i].src);
}

for (let i = 0; i < contentCollection.length; i++) {
  const contentImage = document.createElement("img");
  contentImage.classList.add("content__image");
  contentImage.setAttribute("src", contentCollection[i].src);
  contentImage.setAttribute("alt", "image: artist");
  contentWrap.append(contentImage);
}
