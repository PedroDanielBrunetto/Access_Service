import { PrismaClient, Business } from "@prisma/client";
import AppError from "@/shared/errors/AppError";
import { hash } from "bcrypt";
import { ICreateAccountBusinessRequest } from "../../interfaces/req/ICreateAccountBusinessRequest";

const prisma = new PrismaClient();

class CreateAccountBusinessService {
  public async execute(
    data: ICreateAccountBusinessRequest
  ): Promise<Omit<Business, "id" | "password" | "logo" | "updated_at" | "token" | "status">> {
    const userExists = await prisma.business.findFirst({
      where: {
        OR: [
          { AND: [{ type_doc: data.type_doc }, { doc: data.doc }] },
          { email: data.email },
        ],
      },
    });

    if (userExists) throw new AppError("Email ou Documento já existente", 400);

    data.password = await hash(data.password, 10);

    const business = await prisma.business.create({
      data,
    });

    const businessFiltered = {
      public_id: business.public_id,
      name: business.name,
      type_doc: business.type_doc,
      doc: business.doc,
      address: business.address,
      city: business.city,
      uf: business.uf,
      postal_code: business.postal_code,
      instagram: business.instagram,
      facebook: business.facebook,
      created_at: business.created_at,
      email: business.email,
    };

    return businessFiltered;
  }
}

export default CreateAccountBusinessService;
