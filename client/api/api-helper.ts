import axios, { AxiosResponse } from 'axios';

import Show from '../common/interfaces/show';
import SubscriptionPlan from '../common/interfaces/subscription-plan';

const SERVER_HOST = process.env.NEXT_PUBLIC_SERVER_HOST;

export const getMatchingShows = async (input: string): Promise<Show[]> => {
  const response: AxiosResponse<Show[]> = await axios.get(
    `${SERVER_HOST}/shows/matching?input=${input}`
  );
  const shows = response.data;
  return shows;
};

export const getMostSearchedShows = async (limit: number): Promise<Show[]> => {
  const response: AxiosResponse<Show[]> = await axios.get(
    `${SERVER_HOST}/shows/most-searched?limit=${limit}`
  );
  const shows = response.data;
  return shows;
};

export const getBlobData = async (url: string): Promise<Blob> => {
  const response: AxiosResponse<Blob> = await axios.get(url, {
    responseType: 'blob',
  });
  const blob = response.data;
  return blob;
};

export const getAllSubscriptionPrices = async (): Promise<SubscriptionPlan[]> => {
  const response: AxiosResponse<SubscriptionPlan[]> = await axios.get(
    `${SERVER_HOST}/subscription-prices`
  );
  const subscriptionPrices = response.data;
  return subscriptionPrices;
};
