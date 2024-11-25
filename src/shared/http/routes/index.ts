import { Router } from "express";
import accountsRouter from "@/modules/business/routes/businessAccounts.routes";
import resetPasswordRouter from "@/modules/business/routes/resetPassword.routes";
import businessSession from "@/modules/business/routes/businessSession.routes";

const routes = Router();

routes.use("/business", accountsRouter);
routes.use("/business-forgot-password", resetPasswordRouter);
routes.use("/business-login", businessSession);

export default routes;
