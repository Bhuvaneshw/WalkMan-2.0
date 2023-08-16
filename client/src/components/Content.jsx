export default function Content({height, children}) {
    return <div className='content' style={{height: height}}>{children}</div>
}