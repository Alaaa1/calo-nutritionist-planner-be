import Joi from 'joi';
import { IIngredientDeleteEvent } from '@lib/interfaces';
import { middyfy } from '@lib/middleware/eventParserMiddleware';
import { queryValidationMiddleware } from '@lib/middleware/validationMiddleware';
import { deleteExceptionHandlerMiddleware } from '@lib/middleware/exceptionHandlerMiddleware';
import { deleteIngredient } from './useCase';

export default middyfy(async (
  event: IIngredientDeleteEvent
): Promise<any> => {
  console.log('Received CloudFormation Event:', JSON.stringify(event, null, 2));

  const validationSchema = Joi.object({
    id: Joi
      .string()
      .min(36)
      .required(),
  });

  // Validation before Processing
  await queryValidationMiddleware(validationSchema)(event);

  // useCase - Delete Ingredient
  const result = await deleteIngredient(event);
  return result;
})
.use(deleteExceptionHandlerMiddleware());