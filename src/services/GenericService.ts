import GenericModel from '../models/GenericModel';

export default class GenericService<T> {
  constructor(public model: GenericModel<T>) {}

  public async read(): Promise<T[]> {
    const items = await this.model.read();
    return items;
  }

  public async create(obj: T): Promise<T> {
    const item = await this.model.create(obj);
    return item;
  }

  public async readOne(id: string): Promise<T | null> {
    const item = await this.model.readOne(id);
    return item;
  }

  public async update(id: string, obj: T): Promise<T | null> {
    const objToUpdate = await this.readOne(id);
    if (!objToUpdate) return null;
    const item = await this.model.update(id, obj);
    return item;
  }

  public async delete(id: string): Promise<T | null> {
    const objToDelete = await this.readOne(id);
    if (!objToDelete) return null;
    const item = await this.model.delete(id);
    return item;
  }
}