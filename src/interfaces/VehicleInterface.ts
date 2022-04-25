import { z } from 'zod';

const schemaVehicleZood = z.object({
  model: z.string({
    required_error: 'model is required',
    invalid_type_error: 'model must be a string',
  }).min(3, { message: 'model must be 3 or more characters' }),
  year: z.number({
    required_error: 'year is required',
    invalid_type_error: 'year must be a number',
  }).gte(1900, { message: 'year must be 1900 or higher' })
    .lte(2022, { message: 'year can\'t be lower than 2022' }),
  color: z.string({
    required_error: 'color is required',
    invalid_type_error: 'color must be a string',
  }).min(3, { message: 'Must be 3 or more characters' }),
  status: z.boolean().optional(),
  buyValue: z.number({
    required_error: 'buyValue is required',
    invalid_type_error: 'buyValue must be an integer',
  }).int(),
});

export default schemaVehicleZood;

export type Vehicle = z.infer<typeof schemaVehicleZood>;