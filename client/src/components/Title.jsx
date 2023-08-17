export default function Title({variant = 'black70', mar, size, minW, className, children}) {
    return <h3 className={"title color-" + variant + ' ' + className} style={{
        margin: mar,
        fontSize: size,
        minWidth: minW
    }}>{children}</h3>;
}