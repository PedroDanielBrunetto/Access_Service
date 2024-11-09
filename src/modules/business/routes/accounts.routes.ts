import { Router } from "express";
import AccountsController from "../controllers/accountsController";
import { validateBusiness } from "../validation/businessBody";

const accountsRouter = Router();
const accountController = new AccountsController();

accountsRouter.post("/", validateBusiness, (req, res, next) => {
  accountController.create(req, res).catch(next);
});

export default accountsRouter;
