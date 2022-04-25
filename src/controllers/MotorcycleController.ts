import GenericController from './GenericController';
import { Motorcycle } from '../interfaces/MotorcycleInterface';
import MotorcycleService from '../services/MotorcycleService';

export default class MotorcycleController
  extends GenericController<Motorcycle> {
  constructor(public service = new MotorcycleService()) {
    super(service);
  }
}