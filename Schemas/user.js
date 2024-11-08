import mangoose from "mongoose";
import express from "express";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  age: Number,
  gender: String,
  email: {
    type: String,
    unique: true,
    required: true,
    lowerCase: true,
    trim: true,
  },
  password: { type: String, required: true, minLength: 8 },
});

const User = mangoose.model("User", userSchema);
export default User;
