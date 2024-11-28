import { Business } from "@prisma/client";

export interface IGetProfileSessionBusinessResponse {
  business: Business;
  phones: [
    {
      id_phone_number: number;
      phone_number: string;
    }
  ];
}
