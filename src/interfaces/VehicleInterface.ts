import { z } from 'zod';

const schemaVehicle = z.object({
  model: z.string().min(3).nonempty(),
  year: z.number().min(1900).max(2022),
  color: z.string().min(3).nonempty(),
  status: z.boolean().optional(),
  buyValue: z.number().int(),
});

export default schemaVehicle;

export type Vehicle = z.infer<typeof schemaVehicle>;