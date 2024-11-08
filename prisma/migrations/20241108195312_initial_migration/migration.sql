-- CreateEnum
CREATE TYPE "TypeDoc" AS ENUM ('CPF', 'CNPJ');

-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('business', 'worker');

-- CreateTable
CREATE TABLE "Business" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "type_doc" "TypeDoc" NOT NULL,
    "doc" CHAR(14) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "uf" CHAR(2) NOT NULL,
    "postal_code" CHAR(8) NOT NULL,
    "instagram" VARCHAR(255),
    "facebook" VARCHAR(255),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "logo" VARCHAR(255),

    CONSTRAINT "Business_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Phone" (
    "id" SERIAL NOT NULL,
    "user_type" "UserType" NOT NULL,
    "user_id" INTEGER NOT NULL,
    "phone_number" VARCHAR(255) NOT NULL,

    CONSTRAINT "Phone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Worker" (
    "id" SERIAL NOT NULL,
    "full_name" VARCHAR(255) NOT NULL,
    "cpf" CHAR(11) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "access_token" INTEGER,
    "expires_in" TIMESTAMP(3),
    "dismissed_in" TIMESTAMP(3),

    CONSTRAINT "Worker_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Business_public_id_key" ON "Business"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "Business_doc_key" ON "Business"("doc");

-- CreateIndex
CREATE UNIQUE INDEX "Business_email_key" ON "Business"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Phone_phone_number_key" ON "Phone"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "Worker_cpf_key" ON "Worker"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Worker_email_key" ON "Worker"("email");

-- AddForeignKey
ALTER TABLE "Phone" ADD CONSTRAINT "fk_phone_business" FOREIGN KEY ("user_id") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Phone" ADD CONSTRAINT "fk_phone_worker" FOREIGN KEY ("user_id") REFERENCES "Worker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
