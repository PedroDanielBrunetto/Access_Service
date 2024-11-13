import { Router } from "express";
import ResetPasswordController from "../controllers/ResetPasswordController";
import { validateForgotPassword } from "../validation/SendForgotPasswordSchema";

const resetPasswordRouter = Router();
const resetController = new ResetPasswordController();

resetPasswordRouter.post("/", validateForgotPassword, (req, res, next) => {
  resetController.forgot(req, res).catch(next);
});

export default resetPasswordRouter;
