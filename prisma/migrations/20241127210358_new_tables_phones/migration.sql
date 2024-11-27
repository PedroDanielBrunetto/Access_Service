/*
  Warnings:

  - You are about to drop the `Phone` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Phone" DROP CONSTRAINT "fk_phone_business";

-- DropForeignKey
ALTER TABLE "Phone" DROP CONSTRAINT "fk_phone_worker";

-- DropTable
DROP TABLE "Phone";

-- DropEnum
DROP TYPE "UserType";

-- CreateTable
CREATE TABLE "Phone_Business" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "phone_number" VARCHAR(255) NOT NULL,

    CONSTRAINT "Phone_Business_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Phone_Worker" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "phone_number" VARCHAR(255) NOT NULL,

    CONSTRAINT "Phone_Worker_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Phone_Business_phone_number_key" ON "Phone_Business"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "Phone_Worker_phone_number_key" ON "Phone_Worker"("phone_number");

-- AddForeignKey
ALTER TABLE "Phone_Business" ADD CONSTRAINT "fk_phone_business" FOREIGN KEY ("user_id") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Phone_Worker" ADD CONSTRAINT "fk_phone_worker" FOREIGN KEY ("user_id") REFERENCES "Worker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
