export default function Content({height, children, style}) {
    return <div className='content' style={{height: height, ...style,}}>{children}</div>
}