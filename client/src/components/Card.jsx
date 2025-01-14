export default function Card({
  width,
  height,
  minWidth,
  maxWidth,
  pad = "10px 20px",
  mar = "20px",
  bg = "bg-color-white",
  radius = "25px",
  shadow = "0 0 30px #00000010",
  flex,
  overflow,
  className,
  children,
  onClick,
  style,
}) {
  return (
    <div
      onClick={onClick}
      className={"Card " + bg + (className ? " " + className : "")}
      style={{
        width: width,
        height: height,
        padding: pad,
        margin: mar,
        borderRadius: radius,
        boxShadow: shadow,
        flexGrow: flex,
        overflowY: overflow,
        ...style,
        minWidth: minWidth,
        maxWidth: maxWidth,
      }}
    >
      {children}
    </div>
  );
}
