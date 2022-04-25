import moongose from 'mongoose';
import { Car } from '../interfaces/CarInterface';
import carsModelSchema from '../models_schemas/carsModelSchema';
import GenericModel from './GenericModel';

export default class CarsModel extends GenericModel<Car> {
  constructor(public model = moongose.model('Car', carsModelSchema)) {
    super(model);
  }
}