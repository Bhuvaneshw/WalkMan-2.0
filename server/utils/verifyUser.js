import jwt from "jsonwebtoken";

export function verifyUer(req, res, next) {
  try {
    const token = req.headers.token;
    // const id = jwt.verify(token, "12345");
    req.userId = "64ed96a98ffa4070a171e330";
    next();
  } catch (e) {
    console.log(e.message);
    res.status(401).json({ msg: "not authorised please login" });
  }
}
