/*
  Warnings:

  - You are about to alter the column `phone_number` on the `Phone_Business` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(12)`.
  - You are about to alter the column `phone_number` on the `Phone_Worker` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(12)`.

*/
-- AlterTable
ALTER TABLE "Phone_Business" ALTER COLUMN "phone_number" SET DATA TYPE VARCHAR(12);

-- AlterTable
ALTER TABLE "Phone_Worker" ALTER COLUMN "phone_number" SET DATA TYPE VARCHAR(12);
