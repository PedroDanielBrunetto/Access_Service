import { Router } from "express";
import BusinessAccountsController from "../controllers/BusinessAccountsController";
import { validateCreateBusinessAccount } from "../validation/CreateAccountBusinessSchema";
import { validateUpdateBusinessAccount } from "../validation/UpdateAccountBusinessSchema";
import isAuthenticated from "@/shared/http/middlewares/isAuthenticated";
import { validateStatusBusinessAccount } from "../validation/StatusAccountBusinessSchema";

const businessAccountsRouter = Router();
const accountController = new BusinessAccountsController();

businessAccountsRouter.post(
  "/",
  validateCreateBusinessAccount,
  (req, res, next) => {
    accountController.create(req, res).catch(next);
  }
);
businessAccountsRouter.put(
  "/",
  validateUpdateBusinessAccount,
  isAuthenticated,
  (req, res, next) => {
    accountController.update(req, res).catch(next);
  }
);
businessAccountsRouter.delete(
  "/",
  validateStatusBusinessAccount,
  isAuthenticated,
  (req, res, next) => {
    accountController.disable(req, res).catch(next);
  }
);
businessAccountsRouter.patch(
  "/enable",
  validateStatusBusinessAccount,
  (req, res, next) => {
    accountController.enable(req, res).catch(next);
  }
);

export default businessAccountsRouter;
