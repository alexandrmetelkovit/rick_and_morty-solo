import { $api } from './api';

export const getCharacterById = async (id: number) => {
  const response = await $api.get(`character/${id}`);
  return response.data;
};
