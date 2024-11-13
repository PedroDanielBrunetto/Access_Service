import { Router } from "express";
import accountsRouter from "@/modules/business/routes/businessAccounts.routes";
import resetPasswordRouter from "@/modules/business/routes/resetPassword.routes";

const routes = Router();

routes.use("/business", accountsRouter);
routes.use("/business-forgot-password", resetPasswordRouter);

export default routes;
