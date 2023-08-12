export default function HStack({width, height, justifyContent, alignItems, pad, scrollable, children}) {
    let overFlow = scrollable ? 'auto' : 'none';
    return <div style={{
        width: width,
        height: height,
        display: 'flex',
        justifyContent: justifyContent,
        alignItems: alignItems,
        padding: pad,
        overflowX: overFlow,
    }}>{children}</div>
}