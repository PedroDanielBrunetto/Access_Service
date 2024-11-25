import AppError from "@/shared/errors/AppError";
import { PrismaClient } from "@prisma/client";
import path from "path";
import { ISendForgotPasswordEmailRequest } from "../interfaces/req/ISendForgotPasswordEmailRequest";
import { generateToken } from "@/shared/utils/generateToken";
import SendMail from "@/shared/providers/SendMail";

const prisma = new PrismaClient();

class SendForgotPasswordEmailService {
  public async execute({
    email,
  }: ISendForgotPasswordEmailRequest): Promise<void> {
    const business = await prisma.business.findUnique({
      where: { email },
    });

    if (!business) throw new AppError("Usuário não encontrado", 404);

    const token = generateToken();

    await prisma.business.update({
      where: { id: business.id },
      data: {
        token,
        updated_at: new Date(),
      },
    });

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      "..",
      "views",
      "Forgot_password.hbs"
    );

    await SendMail.sendMail({
      to: {
        name: business.name,
        email: business.email,
      },
      subject: "[SyncUp Brasil] Recuperação de Senha",
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: business.name,
          link: `${process.env.APP_WEB_URL}/reset_password?token=${token}&user=${business.public_id}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
