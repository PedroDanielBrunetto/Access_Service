import AppError from "@/shared/errors/AppError";
import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const businessSchema = z.object({
  name: z.string().min(1),
  type_doc: z.enum(["CPF", "CNPJ"]),
  doc: z.string(),
  address: z.string().min(1),
  city: z.string().min(1),
  uf: z.string().length(2),
  postal_code: z.string().length(8),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(6),
});

export function validateBusiness(
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
