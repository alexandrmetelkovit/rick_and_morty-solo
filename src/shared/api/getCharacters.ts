import { $api } from './api';

import type { ICharacterCard } from '../types';

export const getCharacters = async (filters: {
  name?: string;
  species?: string;
  gender?: string;
  status?: string;
}) => {
  const response = await $api.get('character', {
    params: {
      name: filters.name,
      species: filters.species,
      gender: filters.gender,
      status: filters.status
    }
  });

  return response.data.results.map((character: ICharacterCard) => ({
    ...character,
    status: character.status.toLowerCase()
  }));
};
