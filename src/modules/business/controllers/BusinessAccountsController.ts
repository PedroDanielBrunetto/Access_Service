import { Request, Response } from "express";
import CreateAccountBusinessService from "../services/CreateAccountBusinessService";
import { ICreateBusinessAccountRequest } from "../interfaces/req/ICreateBusinessAccountRequest";
import { IUpdateBusinessAccountRequest } from "../interfaces/req/IUpdateBusinessAccountRequest";
import UpdateAccountBusinessService from "../services/UpdateAccountBusinessService";
import DisableAccountBusinessService from "../services/DisableAccountBusinessService";
import EnableAccountBusinessService from "../services/EnableAccountBusinessService";
import { UpdateAvatarBusinessService } from "../services/UpdateAvatarBusinessService";
import AppError from "@/shared/errors/AppError";

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

  public async disable(request: Request, response: Response): Promise<void> {
    const { public_id } = request.body;

    const disableAccountBusiness = new DisableAccountBusinessService();

    await disableAccountBusiness.execute(public_id);

    response.json({
      statusAccount: false,
      message: "Conta desativada",
    });
  }

  public async enable(request: Request, response: Response): Promise<void> {
    const { public_id } = request.body;

    const enableAccountBusiness = new EnableAccountBusinessService();

    await enableAccountBusiness.execute(public_id);

    response.json({
      statusAccount: true,
      message: "Conta ativada",
    });
  }

  public async avatar(req: Request, res: Response): Promise<Response> {
    const { id: public_id } = req.params;
    const avatarFile = req.file?.buffer;
    const fileName = req.file?.originalname;
    const contentType = req.file?.mimetype;

    if (!avatarFile || !fileName || !contentType)
      throw new AppError("Arquivo obrigatório.", 400);

    const service = new UpdateAvatarBusinessService();

    try {
      const avatarUrl = await service.execute({
        public_id,
        avatarFile,
        fileName,
        contentType,
      });

      return res.json({ avatarUrl });
    } catch (error: any) {
      throw new AppError(error.message, 400);
    }
  }
}
