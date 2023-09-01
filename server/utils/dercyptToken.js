import jwt from "jsonwebtoken";

export default function decryptToken(token) {
  return jwt.verify(token, "12345");
}
