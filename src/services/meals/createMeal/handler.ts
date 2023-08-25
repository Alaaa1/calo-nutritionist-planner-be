import Joi from 'joi';
import { middyfy } from '@lib/middleware/eventParserMiddleware';
import { bodyValidationMiddleware } from '@lib/middleware/validationMiddleware';
import { readExceptionHandlerMiddleware } from '@lib/middleware/exceptionHandlerMiddleware';
import { createMeal, createMealComponent } from './useCase';

export default middyfy(async (event) => {
  console.log('Received CloudFormation Event:', JSON.stringify(event, null, 2));

  const validationSchema = Joi.object({
    name: Joi.string().required(),
    size: Joi.string().required(),
    unit: Joi.string().required(),
    components: Joi.array()
    .min(1)
    .required()
  })

  // Validation before Processing
  bodyValidationMiddleware(validationSchema)(event);

  // useCase - Create Meal
  const meal = await createMeal(event);

  // useCase - Create Meal Component
  await createMealComponent(meal, event)
  return meal;
})
.use(readExceptionHandlerMiddleware());