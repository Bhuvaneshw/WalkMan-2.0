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

const Navigation = {
    HOME: {
        name: "Home", route: '/', icon: '/home.svg', iconPrimary: '/home-primary.svg'
    },
    SEARCH: {
        name: 'Search', route: '/search', icon: '/search.svg', iconPrimary: '/search-primary.svg'
    }
}

function searchSong(e, searchQuery, setSearchRes) {
    if (e.code === "Enter") {
        fetch("http://localhost:3000/song/" + searchQuery)
            .then((res) => res.json())
            .then((res) => setSearchRes(res));
    }
}

class Music extends Audio {

    constructor(src) {
        super(src);
        this.addEventListener('durationchange', () => {
            this.onLoad(Math.round(this.currentTime), Math.round(this.duration))
        })

        this.addEventListener('timeupdate', () => {
            this.onUpdateTime(Math.round(this.currentTime))
        })

        this.addEventListener('ended', () => {
            this.onEnd()
        })

        this.addEventListener('play', () => {
            this.onPlay()
        })

        this.addEventListener('pause', () => {
            this.onPause()
        })
    }

    setSrc(src) {
        let isPlaying = !this.paused;
        this.pause();
        this.src = src;
        this.load();
        if (isPlaying)
            this.intimatePlay();
        return this
    }

    onPlay = () => {
    }
    onPause = () => {
    }
    onEnd = () => {
    }
    onUpdateTime = () => {
    }
    onLoad = () => {
    }
    intimatePlay = () => {
    }
}

let music;

function getMusic() {
    if (music == null)
        music = new Music('temp1.mp3')
    return music;
}

function getRandomArbitrary(min, max) {
    return Math.trunc(Math.random() * (max - min) + min);
}

function getRandMusic() {
    let src = `temp${getRandomArbitrary(1, 4)}.mp3`;
    console.log(`Playing ${src}`)
    return src
}

export {toMinutesText, getRouteName, Navigation, searchSong, getMusic, getRandMusic};