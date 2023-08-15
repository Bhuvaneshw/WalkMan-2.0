function toMinutesText(sec) {
  let m = Math.trunc(sec / 60);
  let s = sec - m * 60;
  if (s < 10) s = "0" + s;
  return `${m}:${s}`;
}

function getRouteName(location) {
  switch (location.pathname) {
    case "/search":
      return "Search";

    default:
      return "Home";
  }
}

function searchSong(e, searchQuery, setSearchRes) {
  if (e.code === "Enter") {
    fetch("http://localhost:3000/song?q=" + searchQuery)
      .then((res) => res.json())
      .then((res) => setSearchRes(res));
  }
}

export { toMinutesText, getRouteName, searchSong };
