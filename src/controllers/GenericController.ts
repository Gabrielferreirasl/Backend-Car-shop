import { Request, Response } from 'express';
import GenericService from '../services/GenericService';

const OBJECT_ERROR = 'Object not found';

export default class GenericController<T> {
  constructor(public service: GenericService<T>) {}

  public async read(_req: Request, res: Response): Promise<typeof res> {
    const items = await this.service.read();
    return res.status(200).json(items);
  }

  public async create(req: Request, res: Response): Promise<typeof res> {
    const item = await this.service.create(req.body);
    return res.status(201).json(item);
  }

  public async readOne(req: Request, res: Response): Promise<typeof res> {
    const { id } = req.params;
    const item = await this.service.readOne(id);
    if (!item) return res.status(404).json({ error: OBJECT_ERROR });
    return res.status(200).json(item);
  }

  public async update(req: Request, res: Response): Promise<typeof res> {
    const { id } = req.params;
    const item = await this.service.update(id, req.body);
    if (!item) return res.status(404).json({ error: OBJECT_ERROR });
    return res.status(200).json(item);
  }

  public async delete(req: Request, res: Response): Promise<typeof res> {
    const { id } = req.params;
    const item = await this.service.delete(id);
    if (!item) return res.status(404).json({ error: OBJECT_ERROR });
    return res.status(204).json(item);
  }
}