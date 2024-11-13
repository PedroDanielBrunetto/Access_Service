import { Request, Response } from "express";
import SendForgotPasswordEmailService from "../services/SendForgotPasswordEmailService";
import { ISendForgotPasswordEmailRequest } from "../interfaces/ISendForgotPasswordEmailRequest";

export default class ResetPasswordController {
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
}
