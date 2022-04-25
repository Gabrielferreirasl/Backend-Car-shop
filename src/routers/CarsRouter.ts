import { Router } from 'express';
import CarsController from '../controllers/CarsController';
import { schemaCarZood } from '../interfaces/CarInterface';
import GenericMiddleware from '../middlewares/GenericMiddleware';

const carsController = new CarsController();
const carsMiddleware = new GenericMiddleware(schemaCarZood);

const carsRouter = Router();

carsRouter
  .post(
    '/cars', 
    (req, res, next) => carsMiddleware.validateSchema(req, res, next),
    (req, res) => carsController.create(req, res),
  )
  .get('/cars', (req, res) => carsController.read(req, res))
  .get(
    '/cars/:id',
    (req, res, next) => carsMiddleware.validateId(req, res, next),
    (req, res) => carsController.readOne(req, res),
  )
  .put(
    '/cars/:id',
    (req, res, next) => carsMiddleware.validateId(req, res, next),
    (req, res, next) => carsMiddleware.validateSchema(req, res, next),
    (req, res) => carsController.update(req, res),
  );

export default carsRouter;