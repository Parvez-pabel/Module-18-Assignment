import {
  deleteUser,
  getAll,
  getById,
  login,
  profileDetails,
  register,
  updateUser,
} from "../services/userServices.js";

export const userRegister = async (req, res, next) => {
  try {
    const result = await register(req);
    return res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const userLogin = async (req, res, next) => {
  try {
    const { Email, Password } = req.body;
    const result = await login(Email, Password);
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: {
        token: result.token,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const userProfile = async (req, res, next) => {
  try {
    const userID = req.user?.id || req.user?._id;
    const profileData = await profileDetails(userID);
    return res.status(200).json({
      success: true,
      message: "User profile retrieved successfully",
      data: profileData,
    });
  } catch (error) {
    next(error);
  }
};

export const allUsers = async (req, res, next) => {
  try {
    const profiles = await getAll(req);
    return res.status(200).json({
      success: true,
      message: "User profile retrieved successfully",
      data: profiles,
    });
  } catch (error) {
    next(error);
  }
};

export const userGetById = async (req, res, next) => {
  try {
    const result = await getById(req, res);
    return res.status(200).json({
      success: true,
      message: "User profile retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const updatedUserInfo = async (req, res, next) => {
  try {
    const result = await updateUser(req, res);
    return res.status(200).json({
      success: true,
      message: "User profile updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const userDelete = async (req, res, next) => {
  try {
    const userID = req.params.id;
    const result = await deleteUser(userID);
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: result,
    });
  } catch (error) {
    return next(error);
  }
};
