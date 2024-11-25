import { Request, Response } from "express";
import SendForgotPasswordEmailService from "../services/SendForgotPasswordEmailService";
import UpdateForgotPasswordService from "../services/UpdateForgotPasswordService";
import { ISendForgotPasswordEmailRequest } from "../interfaces/req/ISendForgotPasswordEmailRequest";
import { IUpdateForgotPasswordRequest } from "../interfaces/req/IUpdateForgotPasswordRequest";

export default class BusinessResetPasswordController {
  public async forgot(request: Request, response: Response): Promise<void> {
    const sendForgotPassword = new SendForgotPasswordEmailService();

    await sendForgotPassword.execute(
      request.body as ISendForgotPasswordEmailRequest
    );

    response.json({
      status: true,
      message: "Email enviado com sucesso.",
    });
  }

  public async update(request: Request, response: Response): Promise<void> {
    const updateForgotPassword = new UpdateForgotPasswordService();

    const business = await updateForgotPassword.execute(
      request.body as IUpdateForgotPasswordRequest
    );

    response.json(business);
  }
}
