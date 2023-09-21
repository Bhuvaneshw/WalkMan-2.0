export default function Title({variant = 'black70', mar, size, minW, className, children, style}) {
    return <h3 className={"title color-" + variant + ' ' + className} style={{
        ...style,
        margin: mar,
        fontSize: size,
        minWidth: minW
    }}>{children}</h3>;
}