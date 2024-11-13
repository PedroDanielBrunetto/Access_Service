import { TypeDoc } from "@prisma/client";

export interface IUpdateBusinessAccountRequest {
  public_id: string;
  name?: string;
  type_doc?: TypeDoc;
  doc?: string;
  address?: string;
  city?: string;
  uf?: string;
  postal_code?: string;
  instagram?: string;
  facebook?: string;
  email?: string;
  password?: string;
  oldPassword?: string;
}
