import { Router } from "express";
import isAuthenticated from "@/shared/http/middlewares/isAuthenticated";
import upload from "@/shared/http/middlewares/uploadMiddleware";

import BusinessAccountsController from "../controllers/BusinessAccountsController";

import { validateCreateBusinessAccount } from "../validation/CreateAccountBusinessSchema";
import { validateUpdateBusinessAccount } from "../validation/UpdateAccountBusinessSchema";
import { validateStatusBusinessAccount } from "../validation/StatusAccountBusinessSchema";
import { validateAddPhones } from "../validation/AddBusinessPhonesSchema";

const businessAccountsRouter = Router();
const accountController = new BusinessAccountsController();

// Create Business Account
businessAccountsRouter.post(
  "/",
  validateCreateBusinessAccount,
  (req, res, next) => {
    accountController.create(req, res).catch(next);
  }
);

// Update Business Account
businessAccountsRouter.put(
  "/",
  validateUpdateBusinessAccount,
  isAuthenticated,
  (req, res, next) => {
    accountController.update(req, res).catch(next);
  }
);

// Disable Business Account
businessAccountsRouter.delete(
  "/",
  validateStatusBusinessAccount,
  isAuthenticated,
  (req, res, next) => {
    accountController.disable(req, res).catch(next);
  }
);

// Enable Business Account
businessAccountsRouter.patch(
  "/enable",
  validateStatusBusinessAccount,
  (req, res, next) => {
    accountController.enable(req, res).catch(next);
  }
);

// Add Business Phones Number
businessAccountsRouter.post("/phones", validateAddPhones, (req, res, next) => {
  accountController.createPhones(req, res).catch(next);
});

// Remove Business Phones Number
businessAccountsRouter.delete("/phones/:id", (req, res, next) => {
  accountController.deletePhones(req, res).catch(next);
});

// Update Avatar Business Account
businessAccountsRouter.post(
  "/:id/avatar",
  upload.single("avatar"),
  (req, res, next) => {
    accountController.avatar(req, res).catch(next);
  }
);

export default businessAccountsRouter;
