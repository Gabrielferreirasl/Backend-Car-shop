import { Router } from 'express';
import MotorcycleController from '../controllers/MotorcycleController';
import { schemaMotorcycleZood } from '../interfaces/MotorcycleInterface';
import GenericMiddleware from '../middlewares/GenericMiddleware';

const motorcycleController = new MotorcycleController();
const motorcycleMiddleware = new GenericMiddleware(schemaMotorcycleZood);

const motorcycleRouter = Router();

motorcycleRouter
  .post(
    '/motorcycles', 
    (req, res, next) => motorcycleMiddleware.validateSchema(req, res, next),
    (req, res) => motorcycleController.create(req, res),
  )
  .get('/motorcycles', (req, res) => motorcycleController.read(req, res))
  .get(
    '/motorcycles/:id',
    (req, res, next) => motorcycleMiddleware.validateId(req, res, next),
    (req, res) => motorcycleController.readOne(req, res),
  )
  .put(
    '/motorcycles/:id',
    (req, res, next) => motorcycleMiddleware.validateId(req, res, next),
    (req, res, next) => motorcycleMiddleware.validateSchema(req, res, next),
    (req, res) => motorcycleController.update(req, res),
  );

export default motorcycleRouter;