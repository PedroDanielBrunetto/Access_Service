import { Router } from "express";
import ResetPasswordController from "../controllers/ResetPasswordController";
import { validateForgotPassword } from "../validation/SendForgotPasswordSchema";
import { validateUpdatePassword } from "../validation/UpdateForgotPasswordSchema";

const resetPasswordRouter = Router();
const resetController = new ResetPasswordController();

resetPasswordRouter.post("/", validateForgotPassword, (req, res, next) => {
  resetController.forgot(req, res).catch(next);
});
resetPasswordRouter.patch("/", validateUpdatePassword, (req, res, next) => {
  resetController.update(req, res).catch(next);
});

export default resetPasswordRouter;
