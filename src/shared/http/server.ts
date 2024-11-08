// src/shared/http/server.ts
import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Access_Service!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
