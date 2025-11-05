import type { TStatus } from './status';

export interface ICharacterCard {
  id: number;
  name: string;
  gender: string;
  species: string;
  location: {
    name: string;
    url: string;
  };
  status: TStatus;
  image: string;
}
