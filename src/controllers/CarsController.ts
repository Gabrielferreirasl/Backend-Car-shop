import GenericController from './GenericController';
import { Car } from '../interfaces/CarInterface';
import CarsService from '../services/CarsService';

export default class CarsController extends GenericController<Car> {
  constructor(public service = new CarsService()) {
    super(service);
  }
}