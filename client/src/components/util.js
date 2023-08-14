function toMinutesText(sec) {
    let m = Math.trunc(sec / 60);
    let s = sec - m * 60;
    if (s < 10) s = '0' + s;
    return `${m}:${s}`;
}

function getRouteName(location) {
    switch (location.pathname) {
        case Navigation.SEARCH.route:
            return Navigation.SEARCH.name

        default:
            return Navigation.HOME.name
    }
}

class Navigation {
    static HOME = {name: "Home", route: '/'}
    static SEARCH = {name: 'Search', route: '/search'}
}

function searchSong(e, searchQuery, setSearchRes) {
    if (e.code === "Enter") {
        fetch("http://localhost:3000/song/" + searchQuery)
            .then((res) => res.json())
            .then((res) => setSearchRes(res));
    }
}

export {toMinutesText, getRouteName, Navigation, searchSong};