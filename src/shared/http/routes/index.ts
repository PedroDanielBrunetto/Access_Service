import { Router } from "express";
import AppError from "../../errors/AppError";

const routes = Router();

routes.get("/test-error", (req, res, next) => {
  try {
    throw new AppError("Simulação de erro!", 500);
  } catch (error) {
    next(error);
  }
});

export default routes;
