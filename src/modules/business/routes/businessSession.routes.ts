import { Router } from "express";
import BusinessSessionController from "../controllers/BusinessSessionController";
import { validateCreateSession } from "../validation/CreateSessionBusinessSchema";

const businessSession = Router();
const sessionController = new BusinessSessionController();

// Create Business Session
businessSession.post("/", validateCreateSession, (req, res, next) => {
  sessionController.create(req, res).catch(next);
});

export default businessSession;
