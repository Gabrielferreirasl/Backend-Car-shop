import { Document } from 'mongoose';
import { z } from 'zod';
import schemaVehicleZood from './VehicleInterface';

export const schemaCarZood = z.object({
  ...schemaVehicleZood.shape,
  doorsQty: z.number({
    required_error: 'doorsQty is required',
    invalid_type_error: 'dorrsQty must be a number',
  }).gte(2, { message: 'doorsQty must be 2 or higher' })
    .lte(4, { message: 'doorsQty must be 4 or lower' }),
  seatsQty: z.number({
    required_error: 'seatsQty is required',
    invalid_type_error: 'seatsQty must be a number',
  }).gte(2, { message: 'seatsQty must be 2 or higher' })
    .lte(7, { message: 'seatsQty must be 7 or lower' }),
});

export type Car = z.infer<typeof schemaCarZood>;

export interface CarDocument extends Car, Document { }