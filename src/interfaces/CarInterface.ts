import { z } from 'zod';
import schemaVehicle from './VehicleInterface';

const schemaCar = z.object({
  ...schemaVehicle.shape,
  doorsQty: z.number().gte(2).lte(4),
  seatsQty: z.number().gte(2).lte(7),
});

export default schemaCar;

export type Car = z.infer<typeof schemaCar>;