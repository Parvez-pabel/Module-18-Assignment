import { generateToken } from "../helpers/tokenHelpers.js";
import userModel from "../models/userModel.js";

export const register = async (req) => {
  try {
    let { fullName, Email, Password, phoneNumber, course, semester, address } =
      req.body;
    if ((!fullName, !Email, !Password, !phoneNumber)) {
      const error = new Error("Please fill all the required fields ");
      error.statusCode = 422;
      throw error;
    }
    const newUser = await userModel.create(req.body);
    return newUser;
  } catch (error) {
    throw error;
  }
};

export const login = async (Email, Password) => {
  try {
    const user = await userModel.findOne({ Email });

    if (user && (await user.comparePassword(Password))) {
      const token = generateToken(user._id);
      return { token: token };
    }
    const error = new Error("Unauthorized Access: Invalid Email or Password");
    error.statusCode = 401;
    throw error;
  } catch (error) {
    throw error;
  }
};

export const profileDetails = async (userID) => {
  try {
    const userDetails = await userModel.findById(userID).select("-Password");
    if (!userDetails) {
      const error = new Error("User data not found");
      error.statusCode = 404;
      throw error;
    }
    return userDetails;
  } catch (error) {
    throw error;
  }
};
export const getAll = async (req, res) => {
  try {
    const users = await userModel.find().select("-Password");
    if (!users) {
      const error = new Error("User data not found");
      error.statusCode = 404;
      throw error;
    }
    return users;
  } catch (error) {
    throw error;
  }
};

export const getById = async (req, res) => {
  try {
    const userID = req.params.id;
    const user = await userModel.findById(userID).select("-Password");
    if (!user) {
      const error = new Error("User data not found");
      error.statusCode = 404;
      throw error;
    }
    return user;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (req, res) => {
  try {
    const userID = req.params.id;
    const reqBody = req.body;
    const updatedUser = await userModel
      .findByIdAndUpdate(userID, reqBody, { new: true })
      .select("-Password");
    if (!updatedUser) {
      const error = new Error("User data not found");
      error.statusCode = 404;
      throw error;
    }
    return updatedUser;
  } catch (error) {
    throw error;
  }
};
export const deleteUser = async (userID) => {
  try {
    if (!userID) {
      const error = new Error("User ID is required");
      error.statusCode = 404;
      throw error;
    }
    const deletedDetails = await userModel.findByIdAndDelete(userID);
    if (!deletedDetails) {
      const error = new Error("User not found or already deleted");
      error.statusCode = 404; // Not Found
      throw error;
    }
    return deletedDetails;
  } catch (error) {
    throw error;
  }
};
