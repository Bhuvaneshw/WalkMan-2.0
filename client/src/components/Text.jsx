export default function Text({variant = 'black70', children}) {
    return <h3 className={"color-" + variant}>{children}</h3>;
}