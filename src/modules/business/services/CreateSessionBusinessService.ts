import { PrismaClient } from "@prisma/client";
import AppError from "@/shared/errors/AppError";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { ICreateBusinessSessionRequest } from "../interfaces/req/ICreateBusinessSessionRequest";
import { ICreateBusinessSessionResponse } from "../interfaces/res/ICreateBusinessSessionResponse";
import auth from "@/config/auth";

const prisma = new PrismaClient();

class CreateSessionBusinessService {
  public async execute({
    email,
    password,
  }: ICreateBusinessSessionRequest): Promise<ICreateBusinessSessionResponse> {
    const business = await prisma.business.findUnique({
      where: { email },
    });

    if (!business) throw new AppError("Usuário não encontrado", 404);

    if (!business.status) throw new AppError("Conta não ativada", 401);

    if (!(await compare(password, business.password)))
      throw new AppError("Senha inválida", 401);

    const token = sign({}, auth.jwt.secret, {
      subject: business.public_id,
      expiresIn: auth.jwt.expiresIn,
    });

    return {
      jwt: token,
      loggedAt: new Date(),
      public_id: business.public_id,
    } as ICreateBusinessSessionResponse;
  }
}

export default CreateSessionBusinessService;
