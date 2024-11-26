declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
    file: {
      mimetype: string;
      originalname: string;
      buffer: Buffer;
      filename?: string;
    };
  }
}
