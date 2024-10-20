import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { generateTokens } from "../utils/jwt.js";

const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production"
};

const registerUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new ApiError(409, "User with email already exists");
    }

    // Create user
    const user = await User.create({
        email,
        password
    });

    // Get created user data excluding password
    const createdUser = await User.findById(user._id).select(
        "-password"
    );

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    const { accessToken, refreshToken } = await generateTokens(user._id);
    
    res.cookie("accessToken", accessToken, options);
    res.cookie("refreshToken", refreshToken, options);


    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    );
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid credentials");
    }

    const { accessToken, refreshToken } = await generateTokens(user._id);

    res.cookie("accessToken", accessToken, options);
    res.cookie("refreshToken", refreshToken, options);


    const loggedInUser = await User.findById(user._id).select("-password");

    return res.status(200).json(
        new ApiResponse(200, loggedInUser, "User logged in successfully")
    );
});

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie("accessToken", "", {
        ...options,
        maxAge: 0
    });
    res.cookie("refreshToken", "", {
        ...options,
        maxAge: 0
    });

    return res.status(200).json(
        new ApiResponse(200, {}, "User logged out successfully")
    );
});

const checkAuth = asyncHandler(async (req, res) => {
    // This route will be protected by verifyJWT middleware
    // If we reach here, user is authenticated
    return res.status(200).json(
        new ApiResponse(200, { success: true }, "User is authenticated")
    );
});

export { registerUser, loginUser, logoutUser, checkAuth };