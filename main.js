const nav = document.querySelector(".nav");
const playlist = document.querySelector(".playlist");
const contentWrap = document.querySelector(".content__wrap");
const playlistItems = document.querySelector(".playlist__items");
const pauseBtn = document.querySelector(".player__pause-btn");
const playerProgress = document.querySelector(".player__progress");
const audioPlayer = document.querySelector(".audioPlayer");
const pause = document.querySelector(".player__pause-btn");
let isPaused = false;

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

const playAudio = (uri) => {
  audioPlayer.src = uri;
  audioPlayer.addEventListener(
    "loadedmetadata",
    () => (playerProgress.max = audioPlayer.duration)
  );
  audioPlayer.play();
  progressMove();
};
const pauseSong = () => {
  isPaused = !isPaused;
  if (isPaused) {
    audioPlayer.pause();
    pause.src = "./assets/main/content/play.png";
  } else {
    audioPlayer.play();
    pause.src = "./assets/footer/player/pause.png";
  }
};

const progressMove = () => {
  playerProgress.value = audioPlayer.currentTime;
  requestAnimationFrame(progressMove);
};

const createHoverOverlay = ({ title, subtitle, hub }) => {
  const hoverOverlay = document.createElement("div");
  const hoverInfo = document.createElement("div");
  const hoverTrack = document.createElement("div");
  const hoverRatingWrap = document.createElement("div");
  const hoverRating = document.createElement("img");
  const hoverGroup = document.createElement("div");
  const hoverSong = document.createElement("div");
  const playBtn = document.createElement("img");

  playBtn.setAttribute("src", "./assets/main/content/play.png");
  hoverRating.setAttribute("src", "./assets/main/content/rating.png");

  playBtn.classList.add("content__hover-play");
  hoverTrack.classList.add("content__hover-track");
  hoverRatingWrap.classList.add("content__hover-rating-wrap");
  hoverOverlay.classList.add("content__hover-overlay");
  hoverInfo.classList.add("content__hover-info");

  hoverGroup.innerText = subtitle;
  hoverSong.innerText = title;

  hoverTrack.append(hoverGroup);
  hoverTrack.append(hoverSong);
  hoverInfo.append(hoverTrack);
  hoverRatingWrap.append(hoverRating);
  hoverInfo.append(hoverRatingWrap);
  hoverOverlay.append(playBtn);
  hoverOverlay.append(hoverInfo);

  playBtn.addEventListener("click", () => playAudio(hub.actions[1].uri));

  return hoverOverlay;
};

const createPlaylistFooter = () => {
  const playlistFooter = document.createElement("div");
  const playlistFooterImg = document.createElement("img");
  const playlistFooterLink = document.createElement("a");

  playlistFooter.classList.add("playlist__footer");
  playlistFooterImg.setAttribute(
    "src",
    "./assets/main/playlist/take-music-everywhere.png"
  );
  playlistFooterImg.setAttribute("alt", "text: Take music everywhere");
  playlistFooterLink.setAttribute(
    "href",
    "https://play.google.com/store?hl=ru&gl=US"
  );
  playlistFooterLink.innerText = "Download app";
  playlistFooter.append(playlistFooterImg);
  playlistFooter.append(playlistFooterLink);
  playlist.append(playlistFooter);
};

const createNavCollection = () => {
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
};

const createPlaylistCollection = ({ tracks }) => {
  for (let i = 0; i < tracks.length; i++) {
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
    playlistGroup.innerText = tracks[i].subtitle;
    playlistSong.innerText = tracks[i].title;
    playlistImg.setAttribute("src", tracks[i].images.coverart);

    playlistInfo.append(playlistSong);
    playlistInfo.append(playlistGroup);
    playlistItem.append(playlistImg);
    playlistItem.append(playlistInfo);
    playlistItems.append(playlistItem);
    playlist.append(playlistItems);

    if (i === tracks.length - 1) {
      createPlaylistFooter();
    }
  }
};

const createContentCollection = ({ tracks }) => {
  for (let i = 0; i < tracks.length; i++) {
    const contentImageWrap = document.createElement("div");
    const contentImage = document.createElement("img");

    contentImage.classList.add("content__image");
    contentImageWrap.classList.add("content__image-wrap");

    contentImage.setAttribute("src", tracks[i].images.coverart);
    contentImage.setAttribute("alt", "image: artist");

    contentImageWrap.append(contentImage);
    contentImageWrap.append(createHoverOverlay(tracks[i]));
    contentWrap.append(contentImageWrap);
  }
};

pauseBtn.addEventListener("click", pauseSong);

const getData = async () => {
  try {
    const response = await fetch(
      "https://shazam.p.rapidapi.com/songs/list-recommendations?key=484129036&locale=en-US",
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "shazam.p.rapidapi.com",
          "x-rapidapi-key":
            "43b2c8f046msh3a53ffb37201f01p1fbaa3jsn75c7345f22e4",
        },
      }
    );
    const json = await response.json();
    console.log(json);
    createContentCollection(json);
    createPlaylistCollection(json);
    createNavCollection();
  } catch (e) {
    console.log("Request error. Please try again.", e);
  }
};
getData();
