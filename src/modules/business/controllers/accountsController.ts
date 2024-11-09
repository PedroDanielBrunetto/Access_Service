import { Request, Response } from "express";
import CreateAccountService from "../services/createAccountService";

export default class AccountsController {
  public async create(request: Request, response: Response): Promise<void> {
    const createAccount = new CreateAccountService();

    const business = await createAccount.execute(request.body);

    response.json(business);
  }
}
