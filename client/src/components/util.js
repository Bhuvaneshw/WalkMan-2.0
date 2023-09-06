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
        case Navigation.PROFILE.route:
            return Navigation.PROFILE.name;
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
    PROFILE: {
        name: "Profile",
        route: "/profile",
        icon: Icons.USER_CIRCLE,
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
        window.music = music
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

function lyrics() {
    return `[00:07.60]First things first
[00:09.20]I'm gonna say all the words inside my head
[00:11.77]I'm fired up and tired of the way that things have been, oh ooh
[00:17.83]The way that things have been, oh ooh
[00:22.70]Second things second
[00:24.33]Don't you tell me what you think that I could be
[00:27.30]I'm the one at the sail, I'm the master of my sea, oh ooh
[00:33.30]The master of my sea, oh ooh
[00:37.87]I was broken from a young age
[00:39.77]Taken my sulking to the masses
[00:41.63]Writing my poems for the few
[00:43.53]That look to me, took to me, shook to me, feeling me
[00:45.37]Singing from heartache from the pain
[00:47.43]Taking my message from the veins
[00:49.33]Speaking my lesson from the brain
[00:51.27]Seeing the beauty through the
[00:54.57]Pain
[00:55.83]You made me a, you made me a believer, believer
[01:02.30]Pain
[01:03.77]You break me down, you build me up believer, believer
[01:08.97]Pain
[01:10.80]Let the bullets fly oh let them rain
[01:14.57]My life, my love, my drive, it came from
[01:17.60]Pain
[01:18.87]You made me a, you made me a believer, believer
[01:24.40]Third things third
[01:25.67]Send a prayer to the ones up above
[01:28.63]All the hate that you've heard has turned your spirit to a dove
[01:32.50]Oh ooo
[01:34.60]Your spirit up above
[01:36.37]Oh ooo
[01:39.37]I was choking in the crowd
[01:40.97]Building my rain up in the cloud
[01:42.97]Falling like ashes to the ground
[01:44.87]Hoping my feelings, they would drown
[01:46.83]But they never did, ever lived, ebbing and flowing
[01:48.97]Inhibited, limited, till it broke open
[01:50.97]And rained down, you rained down like
[01:55.83]Pain
[01:57.30]You made me a, you made me a believer, believer
[02:03.67]Pain
[02:05.30]You break me down you build me up believer, believer
[02:10.33]Pain
[02:12.27]Let the bullets fly, oh let them rain
[02:15.83]My life, my love, my drive, it came from
[02:18.97]Pain
[02:20.43]You made me a, you made me a believer, believer
[02:25.57]Last things last
[02:26.97]By the grace of the fire and the flame
[02:29.90]You're the face of the future
[02:33.30]The blood in my veins
[02:35.97]The blood in my veins
[02:40.63]But they never did, ever lived, ebbing and flowing
[02:42.77]Inhibited, limited, till it broke open
[02:44.63]And rained down, you rained down like
[02:49.70]Pain
[02:50.70]You made me a, you made me a believer, believer
[02:57.40]Pain
[02:59.63]You break me down you build me up believer, believer
[03:03.90]Pain
[03:07.40]Let the bullets fly oh let them rain
[03:08.80]My life my love my drive it came from
[03:14.27]Pain
[03:15.00]You made me a, you made me a believer, believer
[03:20.00]`;
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
    isNotMobileDevice,
    parseLyrics,
};