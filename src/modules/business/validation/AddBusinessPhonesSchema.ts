import AppError from "@/shared/errors/AppError";
import { Request, Response, NextFunction } from "express";
import { string, z } from "zod";

const businessSchema = z.object({
  public_id: string().uuid(),
  phone_number: z
    .string()
    .regex(/^\d{10,11}$/, "Número de telefone inválido")
    .array()
    .nonempty("O array de números de telefone não pode estar vazio"),
});

export function validateAddPhones(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = businessSchema.safeParse(req.body);

  if (!result.success) {
    throw new AppError(result.error.format(), 400);
  }

  next();
}
