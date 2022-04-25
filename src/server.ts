// import CustomRouter from './routes/Router';
import App from './app';
import carsRouter from './routers/CarsRouter';
import motorcycleRouter from './routers/MotorcycleRouter';

// import exampleController from './controllers/controller-example';

// import { example } from './interfaces/ExampleInterface';

const server = new App();

// exampleRouter.addRoute(exampleController);

server.addRouter(carsRouter);
server.addRouter(motorcycleRouter);

export default server;
