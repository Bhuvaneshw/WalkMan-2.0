import { motion } from "framer-motion";

export default function BorderedCard({
  width = "min-content",
  height = "min-content",
  maxW,
  pad = "15px",
  mar = "15px",
  bg = "bg-color-white",
  radius = "10px",
  shadow = "0 0 5px #00000028",
  opacity,
  className,
  children,
  onClick,
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      // whileTap={{scale: 0.9}}
      className={bg + " " + className}
      style={{
        width: width,
        maxWidth: maxW,
        height: height,
        padding: pad,
        margin: mar,
        borderRadius: radius,
        boxShadow: shadow,
        opacity: opacity,
        cursor: onClick ? "pointer" : null,
      }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
