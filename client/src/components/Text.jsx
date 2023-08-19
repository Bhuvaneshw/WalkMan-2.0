export default function Text({variant = 'black70', pad, className, width, style, children}) {
    return <h3 className={"color-" + variant + ' ' + className}
               style={{padding: pad, width: width, ...style}}>{children}</h3>;
}