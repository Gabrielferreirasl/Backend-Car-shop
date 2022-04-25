import { Motorcycle } from '../interfaces/MotorcycleInterface';
import MotorcycleModel from '../models/MotorcycleModel';
import GenericService from './GenericService';

export default class MotorcycleService extends GenericService<Motorcycle> {
  constructor(public model = new MotorcycleModel()) {
    super(model);
  }
}