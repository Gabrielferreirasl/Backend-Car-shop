import { z } from 'zod';
import { NextFunction, Request, Response } from 'express';

export default class GenericMiddleware {
  constructor(private schema: z.ZodTypeAny) {}

  public validateId = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const checkForValidMongoDbID = /^[0-9a-fA-F]{24}$/;

    if (!checkForValidMongoDbID.test(id)) {
      return res.status(400)
        .json({ error: 'Id must have 24 hexadecimal characters' });
    }

    next();
  };

  public validateSchema(req: Request, res: Response, next: NextFunction) {
    const parsed = this.schema.safeParse(req.body);
    
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0].message });
    }
    next();
  }
}