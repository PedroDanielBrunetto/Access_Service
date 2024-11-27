import AppError from "@/shared/errors/AppError";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class DisableAccountBusinessService {
  public async execute(public_id: string): Promise<void> {
    const business = await prisma.business.findUnique({
      where: { public_id },
    });

    if (!business) throw new AppError("Usuário não encontrado", 404);

    await prisma.business.update({
      where: { public_id },
      data: {
        status: false,
        updated_at: new Date(),
      },
    });
  }
}

export default DisableAccountBusinessService;
