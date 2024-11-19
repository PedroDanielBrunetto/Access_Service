import nodemailer from "nodemailer";
import HandleBarsMailTemplate from "@/config/mail/HandleBarsMailTemplate";
import mailConfig from "@/config/mail/Mail";

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariable;
}

interface IMailContract {
  name: string;
  email: string;
}

interface ISendMail {
  to: IMailContract;
  from?: IMailContract;
  subject: string;
  templateData: IParseMailTemplate;
}

export default class SendMail {
  static async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMail): Promise<void> {
    const mailTemplate = new HandleBarsMailTemplate();

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: false,
      auth: {
        user: process.env.DEFAULT_FROM_EMAIL,
        pass: process.env.DEFAULT_PASS_EMAIL,
      }
    });

    const { email, name } = mailConfig.defaults.from;

    await transporter.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await mailTemplate.parse(templateData),
    });
  }
}
