import {useEffect, useState} from "react";
import {ChevronLeft, ChevronRight} from "lucide-react";
import {useNavigate} from "react-router-dom";

function Item({src, handlePrev, handleNext, fixed, active, anim, query}) {
    let navigate = useNavigate();
    return <div
        className={fixed ? 'fixed ' : (active ? 'item ' + anim : 'hidden')}
        style={{
            width: "calc(100% - 40px)",
            margin: '20px'
        }}>
        <div
            style={{
                position: "relative",
                width: "100%",
                aspectRatio: "7/2",
                cursor: 'pointer',
                margin: 'auto'
            }}>
            <img
                src={src}
                alt="/"
                onClick={() => {
                    navigate('/home/search?q=' + query);
                }}
            />
            <ChevronLeft
                onClick={handlePrev}
                style={{
                    position: "absolute",
                    top: "calc(50% - 25px)",
                    left: '0',
                    background: "rgba(255, 255, 255, 0.5)",
                    width: "50px",
                    height: "50px",
                    padding: "10px",
                    cursor: "pointer",
                    borderTopRightRadius: "50%",
                    borderBottomRightRadius: "50%",
                }}
            />
            <ChevronRight
                onClick={handleNext}
                style={{
                    position: "absolute",
                    top: "calc(50% - 25px)",
                    right: "0",
                    background: "rgba(255, 255, 255, 0.5)",
                    width: "50px",
                    height: "50px",
                    cursor: "pointer",
                    padding: "10px",
                    borderBottomLeftRadius: "50%",
                    borderTopLeftRadius: "50%",
                }}
            />
        </div>
    </div>;
}

export default function Carousel() {
    const artists = [
        {src: "/c1.png", query: 'Anirudh'},
        {src: "/c2.png", query: 'Hiphop Tamizha'},
        {src: "/c3.png", query: 'A R.Rahman'},
        {src: "/c4.png", query: 'Devi Sri Prasad'},
        {src: "/c5.png", query: 'Yuvan Shankar Raja'},
    ];
    const [config, setConfig] = useState({index: 0, anim: ''})
    useEffect(() => {
        let id = setInterval(() => {
            handleNext();
        }, 5000);
        console.log('interval set ' + id);
    }, []);

    const handlePrev = () => {
        setConfig((prev) => {
            return {index: prev.index - 1 < 0 ? artists.length - 1 : prev.index - 1, anim: 'left'};
        });
    };

    const handleNext = () => {
        setConfig((prev) => {
            return {index: prev.index + 1 === artists.length ? 0 : prev.index + 1, anim: 'right'};
        });
    };
    return (
        <div className={'carousel nonSelectable'} style={{
            width: '100%', /*padding: '0 30px',*/ overflow: "hidden"
        }}>
            <Item src={artists[0]} handleNext={() => {
            }} handlePrev={() => {
            }} fixed/>
            {artists.map((data, i) => {
                return <Item key={data.src} src={data.src} handlePrev={handlePrev} handleNext={handleNext}
                             active={i === config.index} anim={config.anim} query={data.query}/>;
            })}
        </div>
    );
};