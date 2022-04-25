import App from './app';
import carsRouter from './routers/CarsRouter';
import motorcycleRouter from './routers/MotorcycleRouter';

const server = new App();

server.addRouter(carsRouter);
server.addRouter(motorcycleRouter);

export default server;
