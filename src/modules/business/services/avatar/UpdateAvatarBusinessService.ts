import { PrismaClient } from "@prisma/client";
import { S3StorageProvider } from "@/shared/providers/S3StorageProvider";
import path from "path";
import AppError from "@/shared/errors/AppError";

const prisma = new PrismaClient();

interface UpdateAvatarDTO {
  public_id: string;
  avatarFile: Buffer;
  fileName: string;
  contentType: string;
}

export class UpdateAvatarBusinessService {
  private storageProvider = new S3StorageProvider();

  public async execute({
    public_id,
    avatarFile,
    fileName,
    contentType,
  }: UpdateAvatarDTO): Promise<string> {
    const business = await prisma.business.findUnique({
      where: { public_id },
    });

    if (!business) throw new AppError("Business not found");

    // Deleta o avatar antigo, se existir
    if (business.logo) {
      const oldFileName = path.basename(business.logo);
      await this.storageProvider.deleteFile(
        `business-avatars/${public_id}/${oldFileName}`
      );
    }

    // Salva o novo avatar
    const fileKey = `business-avatars/${business.public_id}/${fileName}`;
    const newAvatarUrl = await this.storageProvider.saveFile(
      fileKey,
      avatarFile,
      contentType
    );

    // Atualiza o logo no banco de dados
    await prisma.business.update({
      where: { public_id },
      data: { logo: newAvatarUrl },
    });

    return newAvatarUrl;
  }
}
