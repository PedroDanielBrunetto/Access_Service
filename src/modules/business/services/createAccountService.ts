import { PrismaClient, Business } from "@prisma/client";
import AppError from "@/shared/errors/AppError";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

class CreateAccountService {
  public async execute(data: {
    name;
    type_doc;
    doc;
    address;
    city;
    uf;
    postal_code;
    instagram;
    facebook;
    email;
    password;
  }): Promise<Business> {
    const userExists = await prisma.business.findFirst({
      where: {
        OR: [
          {
            AND: [{ type_doc: data.type_doc }, { doc: data.doc }],
          },
          { email: data.email },
        ],
      },
    });

    if (userExists) throw new AppError("Email ou Documento já existente", 400);

    const hashedPassword = await hash(data.password, 10);

    data.password = hashedPassword;

    const business = await prisma.business.create({
      data,
    });

    return business;
  }
}

export default CreateAccountService;
