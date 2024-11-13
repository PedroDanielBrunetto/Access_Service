import { Request, Response } from "express";
import CreateAccountBusinessService from "../services/CreateAccountBusinessService";
import { ICreateBusinessAccountRequest } from "../interfaces/ICreateBusinessAccountRequest";
import { IUpdateBusinessAccountRequest } from "../interfaces/IUpdateBusinessAccountRequest";
import UpdateAccountBusinessService from "../services/UpdateAccountBusinessService";

export default class BusinessAccountsController {
  public async create(request: Request, response: Response): Promise<void> {
    const createAccountBusiness = new CreateAccountBusinessService();

    const business = await createAccountBusiness.execute(
      request.body as ICreateBusinessAccountRequest
    );

    response.json(business);
  }

  public async update(request: Request, response: Response): Promise<void> {
    const updateAccountBusiness = new UpdateAccountBusinessService();

    const business = await updateAccountBusiness.execute(
      request.body as IUpdateBusinessAccountRequest
    );

    response.json(business);
  }
}
