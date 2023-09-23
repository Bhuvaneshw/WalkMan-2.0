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
        case '/home/groupRoom/search':
        case '/home/groupRoom/player':
        case Navigation.GROUP_ROOM.route:
            return Navigation.GROUP_ROOM.name;
        case Navigation.TOP_SONGS.route:
            return Navigation.TOP_SONGS.name;
        case Navigation.ARTISTS.route:
            return Navigation.ARTISTS.name;
        case Navigation.GENRE.route:
            return Navigation.GENRE.name;
        case Navigation.PROFILE.route:
            return Navigation.PROFILE.name;
        case Navigation.PLAYLIST.route:
            return Navigation.PLAYLIST.name;
        default:
            return Navigation.HOME.name;
    }
}

const Navigation = {
    HOME: {
        name: "Home",
        route: "/home/",
        icon: Icons.HOME,
    },
    SEARCH: {
        name: "Search",
        route: "/home/search",
        icon: Icons.SEARCH,
    },
    PLAYER: {
        name: "Player",
        route: "/home/player",
        icon: Icons.PLAY_SQUARE,
    },
    GROUP_ROOM: {
        name: "Group Room",
        route: "/home/groupRoom",
        icon: Icons.LIST_MUSIC,
    },
    TOP_SONGS: {
        name: "Top Songs",
        route: "/home/topsongs",
        icon: Icons.MUSIC_2,
    },
    ARTISTS: {
        name: "Artists",
        route: "/home/artists",
        icon: Icons.USER_CHECK,
    },
    GENRE: {
        name: "Genre",
        route: "/home/genre",
        icon: Icons.SPEAKER,
    },
    PLAYLIST: {
        name: "Playlist",
        route: "/home/playlist",
        icon: Icons.PLAY_LIST,
    },
    PROFILE: {
        name: "Profile",
        route: "/home/profile",
        icon: Icons.USER_CIRCLE,
    },
};

function searchSong(e, searchQuery, setSearchRes) {
    if (e.code === "Enter" || e.keyCode === 13) {
        // console.log("search? " + searchQuery)
        setSearchRes([])
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

        document.addEventListener("keypress", event => {
            if (!this.isChatBoxOpened() && event.code === 'Space') {
                this.onKeyboardSpacePressed();
                event.preventDefault();
            }
        });

        // this.addEventListener("loadeddata", () => console.log("loadeddata"))
    }

    setSrc(src, data) {
        this.data = data;
        let isPlaying = !this.paused;
        this.pause();
        this.src = import.meta.env.VITE_URL + src + "?token="+sessionStorage.token;
        this.load();
        if (isPlaying) this.intimatePlay();
        this.onSetSrc();
        return this;
    }

    isChatBoxOpened = () => {
        return false;
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
    onKeyboardSpacePressed = () => {
    }
    onUpdateForce=()=>{}
}

let music;

function getMusic() {
    if (music == null) {
        music = new Music();
        window.music = music
    }
    return music;
}

let socket;

function createSocket() {
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
        socket.onHandleMsg = () => {
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
            navigate("/home/groupRoom/search");
        };

        socket.notifySongSelection = function (music, setCurrentSong, navigate) {
            this.emit("songSelected", {music});
            getMusic().setSrc(music.url, music);
            setCurrentSong(music);
            navigate("/home/groupRoom/player");
        };

        socket.on("handleMsg", data => {
            socket.onHandleMsg(data);
        })
    }
    return socket;
}

function getSocket() {
    return socket;
}

function destroySocket() {
    socket = null;
}

function isNotMobileDevice() {
    return window.outerWidth > 600;
}

function parseSeconds(t) {
    let out = -1;
    try {
        const sp = t.split(':');
        let min = parseInt(sp[0]);
        let sec = Math.round(parseFloat(sp[1]));
        out = min * 60 + sec;
    } catch (e) {
    }

    return out;
}

function parseLyrics(url) {
    return fetch(url, {
        headers: {token: window.sessionStorage.getItem("token")},
    })
        .then(data => data.text())
        .then(raw => {
            return new Promise((resolve, reject) => {
                try {
                    const data = [];
                    for (const line of raw.split('\n')) {
                        const split = line.split(']');
                        const rawTime = split[0].substring(1);
                        const time = parseSeconds(rawTime);
                        const lyric = split[1];
                        data.push({
                            time: time,
                            lyric: lyric
                        });
                    }
                    resolve(data)
                } catch (e) {
                    reject(e)
                }
            });
        });
}

function getGenreColors() {
    return [
        "#0476a7, #f40084",
        "#04A793, #A009C5",
        "#42A704, #7E09C5",
        "#E70303, #6709C5",
    ];
}

async function fetchPost(url, body) {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "Application/json",
            token: window.sessionStorage.getItem("token"),
        },
        body: JSON.stringify(body),
    });
    console.log(await res.text());
}

async function fetchGet(url) {
    const res = await fetch(url, {
        method: "GET",
        headers: { token: window.sessionStorage.getItem("token") },
    });
    return await res.json();
}

export {
    toMinutesText,
    getRouteName,
    Navigation,
    getGenreColors,
    searchSong,
    searchAutoComplete,
    getMusic,
    downloadSong,
    getSocket,
    createSocket,
    destroySocket,
    isNotMobileDevice,
    parseLyrics,
    fetchPost,
    fetchGet,
};