import { Router } from "express";
import BusinessSessionController from "../controllers/BusinessSessionController";
import { validateCreateSession } from "../validation/CreateSessionBusinessSchema";
import isAuthenticated from "@/shared/http/middlewares/isAuthenticated";

const businessSession = Router();
const sessionController = new BusinessSessionController();

// Create Business Session
businessSession.post("/", validateCreateSession, (req, res, next) => {
  sessionController.create(req, res).catch(next);
});

// Get Business Profile
businessSession.get("/", isAuthenticated, (req, res, next) => {
  sessionController.index(req, res).catch(next);
});

export default businessSession;
