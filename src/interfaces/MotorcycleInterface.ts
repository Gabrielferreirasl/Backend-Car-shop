import { Document } from 'mongoose';
import { z } from 'zod';
import schemaVehicleZood from './VehicleInterface';

export const schemaMotorcycleZood = z.object({
  ...schemaVehicleZood.shape,
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number({
    required_error: 'engineCapacity is required',
    invalid_type_error: 'engineCapacity must be a number',
  }).gt(0, { message: 'engineCapacity must be 1 or higher' })
    .lte(2500, { message: 'engineCapacity must be 2500 or lower' })
    .int({ message: 'engineCapacity must be an integer' }),
});

export type Motorcycle = z.infer<typeof schemaMotorcycleZood>;

export interface MotorcycleDocument extends Motorcycle, Document { }