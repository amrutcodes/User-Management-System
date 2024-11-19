import userSchema from "../schemas/userSchema.js";
import express from "express";
import asynchandler from "express-async-handler";
import User from "../schemas/userSchema.js";
import bcrypt from "bcryptjs";

export const createUser = asynchandler(async (req, res) => {
  try {
    const { name, email, password, phone, address, age } = req.body;

    const existingUser = await User.findOne({ phone });

    if (existingUser) {
      return res.status(404).json({
        success: false,
        msg: "User exist",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      phone,
      address,
      age,
    });

    return res.status(201).json({
      success: true,
      msg: "user Created",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
});

export const findAll = asynchandler(async (req, res) => {
  try {
    const userDoc = await User.find();
    if (!userDoc) {
      return res.status(404).json({
        success: false,
        msg: "User does not exist",
      });
    }
    return res.status(200).json({
      success: true,
      msg: "User Found",
      data: userDoc,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
});

export const update = asynchandler(async (req, res) => {
  try {
    const { userId, name, email, phone, address, age } = req.body;
    const userDoc = await User.findById(userId);
    if (!userDoc) {
      return res
        .status(404)
        .json({ success: false, msg: "Id not found ", userId });
    }
    const user = await User.updateOne(
      { _id: userId },
      { name, email, phone, address, age }
    );
    return res
      .status(201)
      .json({ success: true, msg: "user updated successfully", data: user });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "server error",
      error,
    });
  }
});

export const deleteUser = asynchandler(async (req, res) => {
  try {
    const del = await User.findByIdAndDelete(req.params.id);
    if (!del) {
      return res.status(404).json({
        success: false,
        msg: "User Not found",
      });
    }

    return res
      .status(200)
      .json({ success: true, msg: " User deleted successfully", data: del });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
});

export const findByPhone = asynchandler(async (req, res) => {
  try {
    const find = await User.findOne(phone);
    if (!find) {
      return res.status(404).json({
        success: false,
        msg: "Number does not exist",
      });
    }

    return res.status(200).json({
      success: true,
      msg: "found",
      data: find,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
});

export const login = asynchandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user in the database
    const loginUser = await User.findOne({ email });

    // Check if the user exists
    if (!loginUser) {
      return res.status(404).json({
        success: false,
        msg: "User not found",
      });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, loginUser.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        msg: "Invalid password",
      });
    }

    // If login is successful
    res.status(200).json({
      success: true,
      msg: "Logged in successfully",
      data: loginUser,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
});

export const forgotPassword=asynchandler(async (req,res)=>
{
  try{
    const { userId , password} =req.body;
    const userDoc = await User.findById(userId);
    if(!userDoc){
      return res.status(404).json({
        success:false,
        msg: "user not found"
      });

      

    }
    userDoc.password=password;
    await userDoc.save();
    return res.status(200).json({
      success:true,
      msg:"password updated",
      data: userDoc
    });

  }
  catch(e){
    console.log(e);
    return res.status(500).json({
      success:false,
      msg: "Internal Server Error"
    });
  }
});
 