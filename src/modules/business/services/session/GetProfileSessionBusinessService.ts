import AppError from "@/shared/errors/AppError";
import { Business, PrismaClient } from "@prisma/client";
import { IGetProfileSessionBusinessResponse } from "../../interfaces/res/IGetProfileSessionBusinessResponse";

const prisma = new PrismaClient();

class GetProfileSessionBusinessService {
  public async execute(
    public_id: string
  ): Promise<IGetProfileSessionBusinessResponse> {
    const business = await prisma.business.findUnique({ where: { public_id } });

    if (!business) throw new AppError("Usuário não encontrado.", 404);

    const phones = await prisma.phone_Business.findMany({
      where: { user_id: business.id },
    });

    const { id, password, token, ...businessWithoutId } = business;

    return {
      business: businessWithoutId,
      phones: phones
        ? phones.map((phone) => {
            return {
              id_phone_number: phone.id,
              phone_number: phone.phone_number,
            };
          })
        : null,
    } as IGetProfileSessionBusinessResponse;
  }
}

export default GetProfileSessionBusinessService;
