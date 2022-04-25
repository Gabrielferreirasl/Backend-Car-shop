import { Document } from 'mongoose';
import { z } from 'zod';
import schemaVehicleZood from './VehicleInterface';

const schemaMotorcycleZood = z.object({
  ...schemaVehicleZood.shape,
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().lte(2500).gte(1),
});

export type Motorcycle = z.infer<typeof schemaMotorcycleZood>;

export interface MotorcycleDocument extends Motorcycle, Document { }