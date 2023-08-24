import Joi from 'joi';
import { PrismaClient } from '@prisma/client';
import { middyfy } from '@lib/middleware/eventParserMiddleware';
import { capitalizeFirstLetter } from 'src/utils/stringUtils';
import { searchMeals } from './useCase';
import createError from 'http-errors';

const prisma = new PrismaClient();

export default middyfy(async (event) => {
  try {
    console.log('Received CloudFormation Event:', JSON.stringify(event, null, 2));

    const validationSchema = Joi.object({
      name: Joi.string().required()
    })

    // Asynchronous Validation
    try {
      await validationSchema.validateAsync(event.queryStringParameters);
    } catch (validationError) {
      throw createError(400, 'Validation Error', {
        details: validationError.details.map(detail => detail.message),
      });
    }

    const searchName = event.queryStringParameters && event.queryStringParameters.name;
    const capitalizedSearchName = capitalizeFirstLetter(searchName)

    // useCase - Search Ingredients
    const result = await searchMeals(prisma, capitalizedSearchName);
    return result;
  } catch (err) {
    console.log('Error', err);
    throw createError(500, 'Internal Server Error', {
      details: 'An error occurred while fetching matching meal',
    });
  }
});