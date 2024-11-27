import { Request, Response } from "express";
import CreateSessionBusinessService from "../services/session/CreateSessionBusinessService";
import { ICreateSessionBusinessRequest } from "../interfaces/req/ICreateSessionBusinessRequest";

export default class BusinessSessionController {
  public async create(request: Request, response: Response): Promise<void> {
    const createSession = new CreateSessionBusinessService();

    const session = await createSession.execute(
      request.body as ICreateSessionBusinessRequest
    );

    response.json(session);
  }
}
