import { Router } from 'express';
import MotorcycleController from '../controllers/MotorcycleController';
import { schemaMotorcycleZood } from '../interfaces/MotorcycleInterface';
import GenericMiddleware from '../middlewares/GenericMiddleware';

const motorcycleController = new MotorcycleController();
const motorcycleMiddleware = new GenericMiddleware(schemaMotorcycleZood);

const motorcycleRouter = Router();

const ROUTE = '/motorcycles';

motorcycleRouter
  .post(
    ROUTE, 
    (req, res, next) => motorcycleMiddleware.validateSchema(req, res, next),
    (req, res) => motorcycleController.create(req, res),
  )
  .get(ROUTE, (req, res) => motorcycleController.read(req, res))
  .get(
    `${ROUTE}/:id`,
    (req, res, next) => motorcycleMiddleware.validateId(req, res, next),
    (req, res) => motorcycleController.readOne(req, res),
  )
  .put(
    `${ROUTE}/:id`,
    (req, res, next) => motorcycleMiddleware.validateId(req, res, next),
    (req, res, next) => motorcycleMiddleware.validateSchema(req, res, next),
    (req, res) => motorcycleController.update(req, res),
  )
  .delete(
    `${ROUTE}/:id`,
    (req, res, next) => motorcycleMiddleware.validateId(req, res, next),
    (req, res) => motorcycleController.delete(req, res),
  );

export default motorcycleRouter;