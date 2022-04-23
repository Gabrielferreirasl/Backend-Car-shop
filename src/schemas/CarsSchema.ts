import mongoose from 'mongoose';
import { Car } from '../interfaces/CarInterface';

const CarsSchema = new mongoose.Schema<Car>();

export default CarsSchema;