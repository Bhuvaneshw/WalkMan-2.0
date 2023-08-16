export default function HStack({
                                   width,
                                   height,
                                   justifyContent,
                                   alignItems,
                                   pad,
                                   wrap,
                                   scrollable,
                                   className,
                                   flex,
                                   children
                               }) {
    let overFlow = scrollable ? 'auto' : 'none';
    return <div className={className} style={{
        width: width,
        height: height,
        display: 'flex',
        flexWrap: wrap,
        justifyContent: justifyContent,
        alignItems: alignItems,
        padding: pad,
        overflowX: overFlow,
        flex: flex,
    }}>{children}</div>
}