import { $api } from './api';

export const getCharacterById = async (id: number) => {
  const response = await $api.get(`character/${id}`);

  if (response.data.error) {
    throw new Error('character not found');
  }
  return response.data;
};
