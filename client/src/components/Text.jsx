export default function Text({variant = 'black70', pad, className, width, children}) {
    return <h3 className={"color-" + variant + ' ' + className} style={{padding: pad, width: width}}>{children}</h3>;
}