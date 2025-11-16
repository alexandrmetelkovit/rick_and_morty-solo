import { $api } from './api';

import type { ICharacterCard } from '../types';
import axios from 'axios';

export const getCharacters = async (
  page: number,
  filters: {
    name?: string;
    species?: string;
    gender?: string;
    status?: string;
  }
) => {
  try {
    const response = await $api.get('character', {
      params: {
        page,
        ...filters
      }
    });

    const results = response.data.results.map((character: ICharacterCard) => ({
      ...character,
      status: character.status.toLowerCase()
    }));

    const hasNextPage = Boolean(response.data.info.next);

    return { results, hasNextPage };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return { results: [], hasNextPage: false };
    }

    throw error;
  }
};
