import { Router } from "express";
import BusinessResetPasswordController from "../controllers/BusinessResetPasswordController";
import { validateForgotPassword } from "../validation/SendForgotPasswordSchema";
import { validateUpdatePassword } from "../validation/UpdateForgotPasswordSchema";

const resetPasswordRouter = Router();
const resetController = new BusinessResetPasswordController();

resetPasswordRouter.post("/", validateForgotPassword, (req, res, next) => {
  resetController.forgot(req, res).catch(next);
});
resetPasswordRouter.patch("/", validateUpdatePassword, (req, res, next) => {
  resetController.update(req, res).catch(next);
});

export default resetPasswordRouter;
