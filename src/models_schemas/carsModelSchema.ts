import mongoose from 'mongoose';
import { CarDocument } from '../interfaces/CarInterface';

const carsModelSchema = new mongoose.Schema<CarDocument>({
  buyValue: Number,
  color: String,
  doorsQty: Number,
  model: String,
  seatsQty: Number,
  status: Boolean,
  year: Number,
}, { versionKey: false });

export default carsModelSchema;