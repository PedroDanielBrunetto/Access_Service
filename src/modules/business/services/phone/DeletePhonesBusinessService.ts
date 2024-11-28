import AppError from "@/shared/errors/AppError";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class DeletePhonesBusinessService {
  public async execute(id_phone_number: number): Promise<void> {
    const phone = await prisma.phone_Business.findUnique({
      where: { id: id_phone_number },
    });

    if (!phone) throw new AppError("Telefone não existe.", 404);

    await prisma.phone_Business.delete({
      where: { id: id_phone_number },
    });
  }
}

export default DeletePhonesBusinessService;
