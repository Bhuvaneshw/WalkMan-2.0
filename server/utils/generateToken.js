import jwt from "jsonwebtoken";

export default function generateToken(id) {
  return jwt.sign(id, "12345");
}
