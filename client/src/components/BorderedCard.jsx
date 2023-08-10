export default function BorderedCard({
                                         width,
                                         pad = "10px 20px",
                                         mar = "30px",
                                         bg = "bg-color-white",
                                         radius = "10px",
                                         shadow = "0 0 5px #00000028",
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