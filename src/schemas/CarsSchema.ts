import mongoose, { Document } from 'mongoose';
import { Car } from '../interfaces/CarInterface';

interface CarDocument extends Car, Document { }

const CarsSchema = new mongoose.Schema<CarDocument>();

export default CarsSchema;