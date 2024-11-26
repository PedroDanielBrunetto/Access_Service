import { s3, bucketName } from "@/config/upload";
import { Readable } from "stream";

export class S3StorageProvider {
  async saveFile(
    key: string,
    buffer: Buffer,
    contentType: string
  ): Promise<string> {
    await s3
      .putObject({
        Bucket: bucketName,
        Key: key,
        Body: buffer,
        ContentType: contentType,
      })
      .promise();

    return `https://${bucketName}.s3.amazonaws.com/${key}`;
  }

  async deleteFile(key: string): Promise<void> {
    await s3
      .deleteObject({
        Bucket: bucketName,
        Key: key,
      })
      .promise();
  }
}
