import { Router } from "express";
import { validateCreateSession } from "../validation/CreateSessionBusinessSchema";
import BusinessSessionController from "../controllers/BusinessSessionController";

const businessSession = Router();
const sessionController = new BusinessSessionController();

businessSession.post("/", validateCreateSession, (req, res, next) => {
  sessionController.create(req, res).catch(next);
});

export default businessSession;
