import Icons from "./Icons.js";

function toMinutesText(sec) {
    let m = Math.trunc(sec / 60);
    let s = sec - m * 60;
    if (s < 10) s = "0" + s;
    return `${m}:${s}`;
}

function getRouteName(location) {
    switch (location.pathname) {
        case Navigation.SEARCH.route:
            return Navigation.SEARCH.name;
        case Navigation.PLAYER.route:
            return Navigation.PLAYER.name;
        case Navigation.PLAYLIST.route:
            return Navigation.PLAYLIST.name;
        case Navigation.TOP_SONGS.route:
            return Navigation.TOP_SONGS.name;
        case Navigation.ARTISTS.route:
            return Navigation.ARTISTS.name;
        case Navigation.GENRE.route:
            return Navigation.GENRE.name;
        default:
            return Navigation.HOME.name;
    }
}

const Navigation = {
    HOME: {
        name: "Home",
        route: "/",
        icon: Icons.HOME,
    },
    SEARCH: {
        name: "Search",
        route: "/search",
        icon: Icons.SEARCH,
    },
    PLAYER: {
        name: "Player",
        route: "/player",
        icon: Icons.PLAY_SQUARE,
    },
    PLAYLIST: {
        name: "Playlist",
        route: "/playlist",
        icon: Icons.LIST_MUSIC,
    },
    TOP_SONGS: {
        name: "Top Songs",
        route: "/topsongs",
        icon: Icons.MUSIC_2,
    },
    ARTISTS: {
        name: "Artists",
        route: "/artists",
        icon: Icons.USER_CHECK,
    },
    GENRE: {
        name: "Genre",
        route: "/genre",
        icon: Icons.SPEAKER,
    },
};

function searchSong(e, searchQuery, setSearchRes) {
    if (e.code === "Enter") {
        // console.log("search? " + searchQuery)
        fetch("http://localhost:3000/song?q=" + searchQuery)
            .then((res) => res.json())
            .then((res) => setSearchRes(res));
    }
}

function downloadSong(url) {
    const link = document.createElement('a');
    link.href = url;
    let fileName = '';
    try {
        fileName = new URL(url).pathname.split('/').pop();
    } catch (e) {
        console.error(e);
    }
    link.setAttribute('download', fileName);
    link.setAttribute('_target', 'blank');
    document.getElementsByTagName("body")[0].appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
}

// class Socket {
//   constructor() {}
// }

class Music extends Audio {
    constructor(src = '', data = '') {
        super(src);
        this.data = data;
        this.addEventListener("durationchange", () => {
            this.onLoad(Math.round(this.currentTime), Math.round(this.duration));
        });

        this.addEventListener("timeupdate", () => {
            this.onUpdateTime(Math.round(this.currentTime));
        });

        this.addEventListener("ended", () => {
            this.onEnd();
        });

        this.addEventListener("play", () => {
            this.onPlay();
        });

        this.addEventListener("pause", () => {
            this.onPause();
        });

        this.addEventListener("canplay", () => {
            this.canPlay();
        })

        // this.addEventListener("loadeddata", () => console.log("loadeddata"))
    }

    setSrc(src, data) {
        this.data = data;
        let isPlaying = !this.paused;
        this.pause();
        this.src = src;
        this.load();
        if (isPlaying) this.intimatePlay();
        this.onSetSrc()
        return this;
    }

    onPlay = () => {
    };
    onPause = () => {
    };
    onEnd = () => {
    };
    onUpdateTime = () => {
    };
    onLoad = () => {
    };
    intimatePlay = () => {
    };
    onSetSrc = () => {
    };
    canPlay = () => {
    }
}

let music;

function getMusic() {
    if (music == null) {
        music = new Music();
    }
    return music;
}

export {
    toMinutesText,
    getRouteName,
    Navigation,
    searchSong,
    getMusic,
    downloadSong,
};
