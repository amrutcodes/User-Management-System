import express from "express";
import {
  createUser,
  deleteUser,
  findAll,
  findByPhone,
  forgotPassword,
  login,
  update,
} from "../controller/userController.js";

const userRouter = express.Router();
userRouter.route("/createUser").post(createUser);
userRouter.route("/findAll").get(findAll);
userRouter.route("/update").post(update);
userRouter.route("/deleteUser/:id").delete(deleteUser);
userRouter.route("/findByPhone/:phone").get(findByPhone);
userRouter.route("/login").post(login);
userRouter.route("/forgotPassword").post(forgotPassword);



export default userRouter;
