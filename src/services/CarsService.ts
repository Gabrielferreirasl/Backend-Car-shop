import { Car } from '../interfaces/CarInterface';
import CarsModel from '../models/CarsModel';
import GenericService from './GenericService';

export default class CarsService extends GenericService<Car> {
  constructor(public model = new CarsModel()) {
    super(model);
  }
}