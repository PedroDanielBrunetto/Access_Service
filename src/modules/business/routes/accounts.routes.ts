import { Router } from "express";
import AccountsController from "../controllers/accountsController";
import { validateCreateBusinessAccount } from "../validation/CreateAccountBusinessSchema";
import { validateUpdateBusinessAccount } from "../validation/UpdateAccountBusinessSchema";

const accountsRouter = Router();
const accountController = new AccountsController();

accountsRouter.post("/", validateCreateBusinessAccount, (req, res, next) => {
  accountController.create(req, res).catch(next);
});
accountsRouter.put("/", validateUpdateBusinessAccount, (req, res, next) => {
  accountController.update(req, res).catch(next);
});

export default accountsRouter;
