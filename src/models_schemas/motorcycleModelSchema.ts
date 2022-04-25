import mongoose from 'mongoose';
import { MotorcycleDocument } from '../interfaces/MotorcycleInterface';

const motorcycleModelSchema = new mongoose.Schema<MotorcycleDocument>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  category: String,
  engineCapacity: Number,
}, { versionKey: false });

export default motorcycleModelSchema;