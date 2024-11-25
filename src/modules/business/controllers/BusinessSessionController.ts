import { Request, Response } from "express";
import CreateSessionBusinessService from "../services/CreateSessionBusinessService";
import { ICreateBusinessSessionRequest } from "../interfaces/req/ICreateBusinessSessionRequest";

export default class BusinessSessionController {
  public async create(request: Request, response: Response): Promise<void> {
    const createSession = new CreateSessionBusinessService();

    const session = await createSession.execute(
      request.body as ICreateBusinessSessionRequest
    );

    response.json(session);
  }
}
