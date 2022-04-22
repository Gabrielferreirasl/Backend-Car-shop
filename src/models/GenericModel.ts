import { Model as M } from 'mongoose';

export default class GenericModel<T> {
  constructor(public model: M<T>) {}

  public async read(): Promise<T[]> {
    const list = await this.model.find();
    return list;
  }

  public async readOne(id: string): Promise<T | null> {
    const obj = await this.model.findOne({ _id: id });
    return obj;
  }

  public async create(obj: T): Promise<T> {
    const objCreated = await this.model.create(obj);
    return objCreated;
  }

  public async update(id: string, obj: T): Promise<T | null> {
    const objUpdated = await this.model.findByIdAndUpdate({ _id: id }, obj);
    return objUpdated;
  }

  public async delete(id: string): Promise<T | null> {
    const objRemoved = await this.model.findByIdAndDelete({ _id: id });
    return objRemoved;
  }
}