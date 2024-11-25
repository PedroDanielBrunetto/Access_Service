import { PrismaClient, Business } from "@prisma/client";
import AppError from "@/shared/errors/AppError";
import { hash } from "bcrypt";
import { IUpdateForgotPasswordRequest } from "../interfaces/req/IUpdateForgotPasswordRequest";

const prisma = new PrismaClient();

class UpdateForgotPasswordService {
  public async execute({
    public_id,
    password,
    token,
  }: IUpdateForgotPasswordRequest): Promise<
    Omit<Business, "id" | "password" | "logo" | "token">
  > {
    const business = await prisma.business.findUnique({
      where: { public_id },
    });

    if (!business) throw new AppError("Usuário não encontrado", 404);

    if (business.token !== token) throw new AppError("Token inválido", 401);

    if (password) {
      password = await hash(password, 10);
    } else throw new AppError("A senha não pode ser vazia", 400);

    const updatedBusiness = await prisma.business.update({
      where: { public_id },
      data: {
        password,
        updated_at: new Date(),
      },
    });

    const businessFiltered = {
      public_id: updatedBusiness.public_id,
      name: updatedBusiness.name,
      type_doc: updatedBusiness.type_doc,
      doc: updatedBusiness.doc,
      address: updatedBusiness.address,
      city: updatedBusiness.city,
      uf: updatedBusiness.uf,
      postal_code: updatedBusiness.postal_code,
      instagram: updatedBusiness.instagram,
      facebook: updatedBusiness.facebook,
      created_at: updatedBusiness.created_at,
      updated_at: updatedBusiness.updated_at,
      email: updatedBusiness.email,
    };

    return businessFiltered;
  }
}

export default UpdateForgotPasswordService;
