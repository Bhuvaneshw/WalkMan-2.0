export default function Stack({scrollable, width, height, className, justifyContent, alignItems, children}) {
    let overFlow = scrollable ? 'auto' : 'none';
    return <div className={className} style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: justifyContent,
        alignItems: alignItems,
        height: height,
        width: width,
        overflowY: overFlow,
    }}>{children}</div>
}