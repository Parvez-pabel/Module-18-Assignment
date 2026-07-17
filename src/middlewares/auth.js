import { verifyToken } from "../helpers/tokenHelpers.js";

export const protect = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token =
    authHeader?.startsWith("Bearer") ? authHeader.split(" ")[1] : authHeader;
  if (!token) {
    return res.status(401).json({
      status: "fail",
      message:
        "Unauthorized - Please login (Access Denied. No token provided.)",
    });
  }
  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      status: "fail",
      message: "Invalid or expired token.",
    });
  }
};
