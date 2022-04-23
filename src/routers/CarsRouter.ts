import { Router } from 'express';
import CarsController from '../controllers/CarsController';

const carsController = new CarsController();

const carsRouter = Router();

carsRouter
  .post('/cars', (req, res) => carsController.create(req, res));