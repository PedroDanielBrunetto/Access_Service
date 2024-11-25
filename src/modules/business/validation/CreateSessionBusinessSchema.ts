import AppError from "@/shared/errors/AppError";
import { Request, Response, NextFunction } from "express";
import { string, z } from "zod";

const businessSchema = z.object({
  email: string().email(),
  password: string(),
});

export function validateCreateSession(
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
