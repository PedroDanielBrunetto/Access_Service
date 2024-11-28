import { Router } from "express";
import isAuthenticated from "@/shared/http/middlewares/isAuthenticated";
import { PrismaClient } from "@prisma/client";
import AppError from "@/shared/errors/AppError";
import upload from "@/shared/http/middlewares/uploadMiddleware";

import BusinessAccountsController from "../controllers/BusinessAccountsController";

import { validateCreateBusinessAccount } from "../validation/CreateAccountBusinessSchema";
import { validateUpdateBusinessAccount } from "../validation/UpdateAccountBusinessSchema";
import { validateStatusBusinessAccount } from "../validation/StatusAccountBusinessSchema";
import { validateAddPhones } from "../validation/AddBusinessPhonesSchema";

const businessAccountsRouter = Router();
const prisma = new PrismaClient();
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
businessAccountsRouter.post(
  "/phones",
  validateAddPhones,
  // Middleware to validate if user want to update phones or create phones
  async (req, res, next) => {
    try {
      const business = await prisma.business.findUnique({
        where: { public_id: req.body.public_id },
      });

      if (!business) throw new AppError("Business is not found", 404);

      const phones = await prisma.phone_Business.findMany({
        where: { user_id: business?.id },
      });

      console.log(phones)

      // If user has phones, need jwt
      if (phones.length) return isAuthenticated(req, res, next);

      return next();
    } catch (error) {
      next(error);
    }
  },
  (req, res, next) => {
    accountController.createPhones(req, res).catch(next);
  }
);

// Remove Business Phones Number
businessAccountsRouter.delete(
  "/phones/:id",
  isAuthenticated,
  (req, res, next) => {
    accountController.deletePhones(req, res).catch(next);
  }
);

// Update Avatar Business Account
businessAccountsRouter.post(
  "/:id/avatar",
  upload.single("avatar"),
  // Middleware to validate if user want to update avatar or create avatar
  async (req, res, next) => {
    try {
      const business = await prisma.business.findUnique({
        where: { public_id: req.params.id },
      });

      if (!business) throw new AppError("Business not found", 404);

      // If user has avatar, need jwt
      if (business.logo) return isAuthenticated(req, res, next);

      return next();
    } catch (error) {
      next(error);
    }
  },
  (req, res, next) => {
    accountController.avatar(req, res).catch(next);
  }
);

export default businessAccountsRouter;
