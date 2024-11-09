import { Router } from "express";
import accountsRouter from "@/modules/business/routes/accounts.routes";

const routes = Router();

routes.use("/business", accountsRouter);

export default routes;
