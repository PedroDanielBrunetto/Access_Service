import { Router } from "express";

import BusinessResetPasswordController from "../controllers/BusinessResetPasswordController";

import { validateForgotPassword } from "../validation/SendForgotPasswordSchema";
import { validateUpdatePassword } from "../validation/UpdateForgotPasswordSchema";

const resetPasswordRouter = Router();
const resetController = new BusinessResetPasswordController();

// Send Email to user to reset password
resetPasswordRouter.post("/", validateForgotPassword, (req, res, next) => {
  resetController.forgot(req, res).catch(next);
});

// Update password
resetPasswordRouter.patch("/", validateUpdatePassword, (req, res, next) => {
  resetController.update(req, res).catch(next);
});

export default resetPasswordRouter;
