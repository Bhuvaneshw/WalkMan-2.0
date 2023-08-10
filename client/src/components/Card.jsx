export default function Card({
                                 width,
                                 pad = "10px 20px",
                                 mar = "30px",
                                 bg = "bg-color-white",
                                 radius = "25px",
                                 shadow = "0 0 30px #00000010",
                                 children
                             }) {
    return <div className={"card " + bg} style={{
        width: width,
        padding: pad,
        margin: mar,
        borderRadius: radius,
        boxShadow: shadow
    }}>{children}</div>;
}