import moongose from 'mongoose';
import { Car } from '../interfaces/CarInterface';
import CarsSchema from '../schemas/CarsSchema';
import GenericModel from './GenericModel';

export default class CarsModel extends GenericModel<Car> {
  constructor(public model = moongose.model('Car', CarsSchema)) {
    super(model);
  }
}