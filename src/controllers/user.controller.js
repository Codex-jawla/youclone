import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import {ApiResponse} from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";
import { uploadfiles } from "../utils/cloudnary.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullname, username, email, password } = req.body;
  // console.log(fullname,username,email,password);

  if (
    [fullname, username, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existed = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existed) {
    throw new ApiError(409, "User already exists with this email or username");
  }
  if (!req.files.avatar) {
    throw new ApiError(409, "avatar is required");
  }
  const avtarlocalpath = req.files?.avatar[0]?.path;
  const coverlocalpath = req.files?.cover_img[0]?.path;

  if (!avtarlocalpath) {
    throw new ApiError(400, "Avatar is required");
  }

  const avatar = await uploadfiles(avtarlocalpath);
  const cover_img = await uploadfiles(coverlocalpath);

  const user = await User.create({
    fullname,
    email,
    username:username.toLowerCase(),
    password,
    avatar:  "jattdc",
    cover_img: "",
  });

  const createduser = await User.findById(user._id).select("-password -refresh_token");

  if (!createduser){
    throw new ApiError(500, "User creation failed");
  }

  res.status(201).json(new ApiResponse(201, "User created successfully", createduser));
  
  
});

const loginUser = asyncHandler(async(req,res)=>{
  const {username,password} = req.body;

  if ([username,password].some((field) => field?.trim() === "")){
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findOne({username:username.toLowerCase()});

  if (!user){
    throw new ApiError(404, "User not found please register first");
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch){
    throw new ApiError(401, "Invalid credentials");
  }
  
})


export { registerUser, loginUser };
