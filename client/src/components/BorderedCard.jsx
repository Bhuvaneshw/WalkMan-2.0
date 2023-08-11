export default function BorderedCard({
                                         width = 'min-content',
                                         height = 'min-content',
                                         pad = "15px",
                                         mar = "15px",
                                         bg = "bg-color-white",
                                         radius = "10px",
                                         shadow = "0 0 5px #00000028",
                                         className,
                                         children
                                     }) {
    return <div className={"card " + bg + " " + className} style={{
        width: width,
        height: height,
        padding: pad,
        margin: mar,
        borderRadius: radius,
        boxShadow: shadow
    }}>{children}</div>;
}