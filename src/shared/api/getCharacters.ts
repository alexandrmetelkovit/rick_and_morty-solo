import { $api } from './api';
import type { ICharacterCard } from '../types';

export const getCharacters = async () => {
  const response = await $api.get('character');
  return response.data.results.map((character: ICharacterCard) => ({
    ...character,
    status: character.status.toLowerCase()
  }));
};
