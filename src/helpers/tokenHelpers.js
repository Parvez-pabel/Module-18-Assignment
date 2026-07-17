import jwt from "jsonwebtoken";

//generate token
export const generateToken = (userID) => {
  return jwt.sign({ id: userID }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "24h",
  });
};
//verify token

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
