export default function Text({variant = 'black70', pad, children}) {
    return <h3 className={"color-" + variant} style={{padding: pad}}>{children}</h3>;
}