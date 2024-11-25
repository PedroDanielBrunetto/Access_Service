import { PrismaClient, Business } from "@prisma/client";
import AppError from "@/shared/errors/AppError";
import { compare, hash } from "bcrypt";
import { IUpdateBusinessAccountRequest } from "../interfaces/req/IUpdateBusinessAccountRequest";

const prisma = new PrismaClient();

class UpdateAccountBusinessService {
  public async execute({
    public_id,
    ...data
  }: IUpdateBusinessAccountRequest): Promise<
    Omit<Business, "id" | "password" | "logo" | "token" | "status">
  > {
    const business = await prisma.business.findUnique({
      where: { public_id },
    });

    if (!business) throw new AppError("Usuário não encontrado", 404);

    const conflictingUser = await prisma.business.findFirst({
      where: {
        OR: [
          { AND: [{ type_doc: data.type_doc }, { doc: data.doc }] },
          { email: data.email },
        ],
      },
    });

    if (conflictingUser)
      throw new AppError("Email ou Documento já existente", 400);

    if (data.password && data.oldPassword) {
      const checkOldPassword = await compare(
        data.oldPassword,
        business.password
      );

      if (!checkOldPassword) throw new AppError("Old password does not match");

      data.password = await hash(data.password, 10);
    } else delete data.password;

    delete data.oldPassword;

    const updatedBusiness = await prisma.business.update({
      where: { public_id },
      data: {
        ...data,
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

export default UpdateAccountBusinessService;
