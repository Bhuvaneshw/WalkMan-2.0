import Icons from "./Icons.js";
import {io} from "socket.io-client";

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
        case Navigation.GROUP_ROOM.route:
            return Navigation.GROUP_ROOM.name;
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
    GROUP_ROOM: {
        name: "Group Room",
        route: "/groupRoom",
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
        fetch(import.meta.env.VITE_URL + "/songs/search?q=" + searchQuery, {
            headers: {token: window.sessionStorage.getItem("token")},
        })
            .then((res) => res.json())
            .then((res) => setSearchRes(res));
    }
}

function searchAutoComplete(searchQuery, setAutoCompleteRes) {
    // console.log("search? " + searchQuery)
    fetch(
        import.meta.env.VITE_URL + "/songs/search-autocomplete?q=" + searchQuery,
        {
            headers: {token: window.sessionStorage.getItem("token")},
        }
    )
        .then((res) => res.json())
        .then((res) => setAutoCompleteRes(res));
}

function downloadSong(url) {
    const link = document.createElement("a");
    link.href = url;
    let fileName = "";
    try {
        fileName = new URL(url).pathname.split("/").pop();
    } catch (e) {
        console.error(e);
    }
    link.setAttribute("download", fileName);
    link.setAttribute("_target", "blank");
    document.getElementsByTagName("body")[0].appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
}

// class Socket {
//   constructor() {}
// }

class Music extends Audio {
    constructor(src = "", data = "") {
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
        });

        // this.addEventListener("loadeddata", () => console.log("loadeddata"))
    }

    setSrc(src, data) {
        this.data = data;
        let isPlaying = !this.paused;
        this.pause();
        this.src = import.meta.env.VITE_URL + src;
        this.load();
        if (isPlaying) this.intimatePlay();
        this.onSetSrc();
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
    };
}

let music;

function getMusic() {
    if (music == null) {
        music = new Music();
        window.music=music
    }
    return music;
}

let socket;

function getSocket() {
    if (!socket) {
        socket = io(import.meta.env.VITE_URL);

        socket.onRoomCreated = () => {
        };
        socket.acceptConnection = () => {
        };
        socket.incrementUserCount = () => {
        };
        socket.onSongSelected = () => {
        };

        socket.on("roomCreated", ({roomId}) => socket.onRoomCreated(roomId));

        socket.on("userConnected", ({userId}) => socket.acceptConnection(userId));
        socket.on("connectionAccepted", ({roomDetail}) =>
            socket.incrementUserCount(roomDetail)
        );
        socket.on("songSelected", ({music}) => socket.onSongSelected(music));

        socket.on("updateTime", (currentTime) => {
            music.onUpdateTime(currentTime);
        });

        socket.on("play", ({reqTime}) => {
            music.intimatePlay();
            console.log(reqTime);
            music.currentTime = new Date() - reqTime;
        });

        socket.on("pause", () => {
            music.pause();
        });

        socket.on("audioSeeked", ({curTime}) => {
            music.currentTime = curTime;
        });

        socket.acceptConnection = function (userId, userCount) {
            this.emit("connectionAccepted", {
                userId: userId,
                roomDetail: {userCount: userCount},
            });
        };

        socket.createRoom = function () {
            this.emit("createRoom");
        };

        socket.joinRoom = function (navigate) {
            this.emit("joinRoom");
            navigate("/groupRoom/search");
        };

        socket.notifySongSelection = function (music, setCurrentSong, navigate) {
            this.emit("songSelected", {music});
            getMusic().setSrc(music.url, music);
            setCurrentSong(music);
            navigate("/groupRoom/player");
        };
    }
    return socket;
}

function destroySocket() {
    socket = null;
}

function isNotMobileDevice() {
    return window.outerWidth > 600;
}

export {
    toMinutesText,
    getRouteName,
    Navigation,
    searchSong,
    searchAutoComplete,
    getMusic,
    downloadSong,
    getSocket,
    destroySocket,
    isNotMobileDevice
};
