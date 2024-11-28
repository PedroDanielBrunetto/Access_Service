import { Request, Response } from "express";
import CreateSessionBusinessService from "../services/session/CreateSessionBusinessService";
import { ICreateSessionBusinessRequest } from "../interfaces/req/ICreateSessionBusinessRequest";
import GetProfileSessionBusinessService from "../services/session/GetProfileSessionBusinessService";

export default class BusinessSessionController {
  public async create(request: Request, response: Response): Promise<void> {
    const createSession = new CreateSessionBusinessService();

    const session = await createSession.execute(
      request.body as ICreateSessionBusinessRequest
    );

    response.json(session);
  }

  public async index(request: Request, response: Response): Promise<void> {
    const public_id = request.user.id;

    const profileSession = new GetProfileSessionBusinessService();

    const profile = await profileSession.execute(public_id);

    response.json(profile);
  }
}
