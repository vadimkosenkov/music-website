const nav = document.querySelector(".nav");
const playlist = document.querySelector(".playlist");
const contentWrap = document.querySelector(".content__wrap");
const playlistItems = document.querySelector(".playlist__items");
const playerPauseBtn = document.querySelector(".player__pause-btn");
const playerProgress = document.querySelector(".player__progress");
const audioPlayer = document.querySelector(".audioPlayer");
const currentDuration = document.querySelector(".player__current-duration");
const songDuration = document.querySelector(".player__song-duration");
const playerImg = document.querySelector(".player__img");
const playerSong = document.querySelector(".player__song");
const playerGroup = document.querySelector(".player__group");
const playerNextBtn = document.querySelector(".player__next-btn");
const playerPrevBtn = document.querySelector(".player__previous-btn");
const playerRepeatBtn = document.querySelector(".player__repeat");
const playerRandomBtn = document.querySelector(".player__random");
const footer = document.querySelector(".footer");

let data,
  songIndex,
  isPaused = false,
  isRepeat = false,
  isRandom = false;

const readableDuration = (seconds) => {
  sec = Math.floor(seconds);
  min = Math.floor(sec / 60);
  min = min >= 10 ? min : "0" + min;
  sec = Math.floor(sec % 60);
  sec = sec >= 10 ? sec : "0" + sec;
  return min + ":" + sec;
};

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

const playAudio = (song, group, img, uri, i) => {
  songIndex = i;
  audioPlayer.src = uri;
  audioPlayer.play();
  progressMove();
  audioPlayer.addEventListener("loadedmetadata", () =>
    audioLoadedData(song, group, img)
  );
};

const audioLoadedData = (song, group, img) => {
  songDuration.innerText = readableDuration(audioPlayer.duration);
  playerProgress.max = audioPlayer.duration;
  playerImg.src = img;
  playerSong.innerText = song;
  playerGroup.innerText = group;
};

const pauseAudio = () => {
  isPaused = !isPaused;
  if (isPaused) {
    audioPlayer.pause();
    playerPauseBtn.src = "./assets/main/content/play.png";
  } else {
    audioPlayer.play();
    playerPauseBtn.src = "./assets/footer/player/pause.png";
  }
};

const progressMove = () => {
  currentDuration.innerText = readableDuration(audioPlayer.currentTime);
  playerProgress.value = audioPlayer.currentTime;
  if (audioPlayer.ended) {
    playNextAudio();
  } else {
    requestAnimationFrame(progressMove);
  }
};

const createHoverOverlay = ({ title, subtitle, images, hub }, i) => {
  const hoverOverlay = document.createElement("div");
  const hoverInfo = document.createElement("div");
  const hoverTrack = document.createElement("div");
  const hoverRatingWrap = document.createElement("div");
  const hoverRating = document.createElement("div");
  const hoverRatingHearts = document.createElement("div");
  const hoverRatingHeartWhite = document.createElement("img");
  const hoverRatingHeartEmpty = document.createElement("img");
  const hoverRatingNumber = document.createElement("div");
  const hoverGroup = document.createElement("div");
  const hoverSong = document.createElement("div");
  const playBtn = document.createElement("img");

  hoverRatingHeartWhite.src = "./assets/main/content/rating-icon-white.png";
  hoverRatingHeartEmpty.src = "./assets/main/content/rating-icon-empty.png";
  playBtn.src = "./assets/main/content/play.png";

  hoverRating.classList.add("content__hover-rating");
  hoverRatingHearts.classList.add("content__hover-rating-hearts");
  hoverRatingHeartEmpty.classList.add("content__hover-rating-heart-empty");
  hoverRatingNumber.classList.add("content__hover-rating-number");

  playBtn.classList.add("content__hover-play");
  hoverTrack.classList.add("content__hover-track");
  hoverRatingWrap.classList.add("content__hover-rating-wrap");
  hoverOverlay.classList.add("content__hover-overlay");
  hoverInfo.classList.add("content__hover-info");

  hoverGroup.innerText = subtitle;
  hoverSong.innerText = title;
  hoverRatingNumber.innerText = i < 9 ? `#0${++i}` : `#${++i}`;

  hoverRatingHearts.append(hoverRatingHeartWhite);
  hoverRatingHearts.append(hoverRatingHeartEmpty);
  hoverRating.append(hoverRatingHearts);
  hoverRating.append(hoverRatingNumber);
  hoverTrack.append(hoverGroup);
  hoverTrack.append(hoverSong);
  hoverInfo.append(hoverTrack);
  hoverRatingWrap.append(hoverRating);
  hoverInfo.append(hoverRatingWrap);
  hoverOverlay.append(playBtn);
  hoverOverlay.append(hoverInfo);

  playBtn.addEventListener("click", () => {
    isPaused = false;
    playerPauseBtn.src = "./assets/footer/player/pause.png";
    playerTransition();
    playAudio(title, subtitle, images.coverart, hub.actions[1].uri, i);
  });

  return hoverOverlay;
};

const playerTransition = () => {
  const playlistFooter = document.querySelector(".playlist__footer");
  footer.style.transform = "translate(0,0)";
  playlistFooter.style.transform = "translate(0,-80px)";
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
    contentImageWrap.append(createHoverOverlay(tracks[i], i));
    contentWrap.append(contentImageWrap);
  }
};

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
    data = json.tracks;
    console.log(data);
    createContentCollection(json);
    createPlaylistCollection(json);
    createNavCollection();
  } catch (e) {
    console.log("Request error. Please try again.", e);
  }
};
getData();

playerPauseBtn.addEventListener("click", () => pauseAudio());

playerNextBtn.addEventListener("click", () => playNextAudio());

playerPrevBtn.addEventListener("click", () => playPrevAudio());

playerRepeatBtn.addEventListener("click", () => toggleRepeat());

playerRandomBtn.addEventListener("click", () => toggleRandom());

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const playRandomAudio = () => {
  songIndex = getRandomInt(data.length);
  playAudio(
    data[songIndex].title,
    data[songIndex].subtitle,
    data[songIndex].images.coverart,
    data[songIndex].hub.actions[1].uri,
    songIndex
  );
};

const playNextAudio = () => {
  audioPlayer.pause();
  isPaused = false;
  playerPauseBtn.src = "./assets/footer/player/pause.png";

  if (songIndex !== data.length - 1 && !isRandom) {
    playAudio(
      data[songIndex + 1].title,
      data[songIndex + 1].subtitle,
      data[songIndex + 1].images.coverart,
      data[songIndex + 1].hub.actions[1].uri,
      ++songIndex
    );
  } else if (isRandom) {
    playRandomAudio();
  } else {
    audioPlayer.pause();
    playerPauseBtn.src = "./assets/main/content/play.png";
    isPaused = true;
    alert("Playlist is empty");
  }
};

const playPrevAudio = () => {
  audioPlayer.pause();
  isPaused = false;
  playerPauseBtn.src = "./assets/footer/player/pause.png";
  if (songIndex !== 0 && !isRandom) {
    playAudio(
      data[songIndex - 1].title,
      data[songIndex - 1].subtitle,
      data[songIndex - 1].images.coverart,
      data[songIndex - 1].hub.actions[1].uri,
      --songIndex
    );
  } else if (isRandom) {
    playRandomAudio();
  } else {
    audioPlayer.pause();
    playerPauseBtn.src = "./assets/main/content/play.png";
    isPaused = true;
    alert("This is the start of the playlist");
  }
};

const toggleRepeat = () => {
  isRepeat = !isRepeat;
  audioPlayer.loop = isRepeat;
  if (isRepeat) {
    playerRepeatBtn.style.opacity = "1";
  } else {
    playerRepeatBtn.style.opacity = "0.3";
  }
};

const toggleRandom = () => {
  isRandom = !isRandom;
  if (isRandom) {
    playerRandomBtn.style.opacity = "1";
  } else {
    playerRandomBtn.style.opacity = "0.3";
  }
};
