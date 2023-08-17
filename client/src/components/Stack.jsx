export default function Stack({
                                  scrollable,
                                  width,
                                  mWidth,
                                  height,
                                  className,
                                  justifyContent,
                                  alignItems,
                                  mar, pad,
                                  onClick,
                                  children
                              }) {
    let overFlow = scrollable ? 'auto' : 'none';
    return <div className={className} style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: justifyContent,
        alignItems: alignItems,
        height: height,
        width: width,
        minWidth: mWidth,
        margin: mar,
        padding: pad,
        overflowY: overFlow,
    }} onClick={onClick}>{children}</div>
}