import { Router } from "express";
import BusinessAccountsController from "../controllers/BusinessAccountsController";
import { validateCreateBusinessAccount } from "../validation/CreateAccountBusinessSchema";
import { validateUpdateBusinessAccount } from "../validation/UpdateAccountBusinessSchema";

const businessAccountsRouter = Router();
const accountController = new BusinessAccountsController();

businessAccountsRouter.post("/", validateCreateBusinessAccount, (req, res, next) => {
  accountController.create(req, res).catch(next);
});
businessAccountsRouter.put("/", validateUpdateBusinessAccount, (req, res, next) => {
  accountController.update(req, res).catch(next);
});

export default businessAccountsRouter;
