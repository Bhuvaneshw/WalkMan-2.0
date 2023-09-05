export default function Text({variant = 'black70', pad, className, width, style, id, children, onClick}) {
    return <h3 id={id} className={"color-" + variant + ' ' + className}
               style={{padding: pad, width: width, cursor: onClick ? 'pointer' : null, ...style}}
               onClick={onClick}>{children}</h3>;
}