import { Request, Response } from "express";
import CreateAccountBusinessService from "../services/CreateAccountBusinessService";
import { ICreateAccountRequest } from "../interfaces/ICreateAccountRequest";
import { IUpdateAccountRequest } from "../interfaces/IUpdateAccountRequest";
import UpdateAccountBusinessService from "../services/UpdateAccountBusinessService";

export default class AccountsController {
  public async create(request: Request, response: Response): Promise<void> {
    const createAccountBusiness = new CreateAccountBusinessService();

    const business = await createAccountBusiness.execute(
      request.body as ICreateAccountRequest
    );

    response.json(business);
  }

  public async update(request: Request, response: Response): Promise<void> {
    const updateAccountBusiness = new UpdateAccountBusinessService();

    const business = await updateAccountBusiness.execute(
      request.body as IUpdateAccountRequest
    );

    response.json(business);
  }
}
