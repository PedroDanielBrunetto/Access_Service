import { PrismaClient } from "@prisma/client";
import AppError from "@/shared/errors/AppError";
import { IAddBusinessPhonesRequest } from "../../interfaces/req/IAddBusinessPhonesRequest";

const prisma = new PrismaClient();

class AddPhonesBusinessService {
  public async execute({
    public_id,
    phone_number,
  }: IAddBusinessPhonesRequest): Promise<void> {
    const business = await prisma.business.findUnique({
      where: { public_id },
    });

    if (!business) throw new AppError("Usuário não encontrado", 404);

    const phoneData = phone_number.map((number) => ({
      user_id: business.id,
      phone_number: number,
    }));

    await prisma.phone_Business.createMany({
      data: phoneData,
      skipDuplicates: true, //Ignora registros duplicados
    });
  }
}

export default AddPhonesBusinessService;
