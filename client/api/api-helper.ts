import axios, { AxiosResponse } from 'axios';

import Show from '../common/interfaces/show';

const SERVER_HOST = process.env.NEXT_PUBLIC_SERVER_HOST;

export const getMatchingShows = async (input: string): Promise<Show[]> => {
  const response: AxiosResponse<Show[]> = await axios.get(
    `${SERVER_HOST}/shows/matching?input=${input}`
  );
  const shows = response.data;
  return shows;
};
