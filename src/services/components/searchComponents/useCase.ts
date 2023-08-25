import { IComponentSearchEvent } from '@lib/interfaces';
import ComponentRepository from '@lib/repositories/componentRepository';
import { capitalizeFirstLetter } from 'src/utils/stringUtils';

export async function searchComponents(
  event: IComponentSearchEvent
): Promise<any> {
  const componentRepo = ComponentRepository.getInstance();

  const index = capitalizeFirstLetter(event.queryStringParameters.name);

  // Repo - Search Components
  const result = await componentRepo.searchComponents(index);
  return result;
}