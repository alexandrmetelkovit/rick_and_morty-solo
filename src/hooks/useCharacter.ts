import { useEffect, useState } from 'react';

import axios from 'axios';

import type { ICharacterCard } from '@/widgets';
import { getCharacterById } from '@/shared/api/getCharacterById';

export const useCharacter = (id?: string) => {
  const [character, setCharacter] = useState<ICharacterCard | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState('');

  useEffect(() => {
    if (!id) return;

    const fetchCharacter = async () => {
      try {
        setIsLoading(true);
        const data = await getCharacterById(Number(id));
        setCharacter(data);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setIsError('Failed ti fetch character data.');
          console.error(err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  return { character, isLoading, isError };
};
