import moongose from 'mongoose';
import { Motorcycle } from '../interfaces/MotorcycleInterface';
import motorcycleModelSchema from '../models_schemas/motorcycleModelSchema';
import GenericModel from './GenericModel';

export default class MotorcycleModel extends GenericModel<Motorcycle> {
  constructor(
    public model = moongose.model('Motorcycle', motorcycleModelSchema),
  ) {
    super(model);
  }
}