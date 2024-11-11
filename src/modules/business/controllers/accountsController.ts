import { Request, Response } from "express";
import CreateAccountBusinessService from "../services/CreateAccountBusinessService";
import { ICreateAccountRequest } from "../interfaces/ICreateAccountRequest";

export default class AccountsController {
  public async create(request: Request, response: Response): Promise<void> {
    const createAccount = new CreateAccountBusinessService();

    const business = await createAccount.execute(
      request.body as ICreateAccountRequest
    );

    response.json(business);
  }
}
