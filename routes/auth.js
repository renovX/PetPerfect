import express from "express";
import authController from "../controller/auth.js";
const authRouter = express.Router();
authRouter.post("/login", authController.logIn);
authRouter.post("/registor", authController.registor);
authRouter.get("/logout", authController.logOut);

export default authRouter;
