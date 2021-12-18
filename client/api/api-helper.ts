import axios, { AxiosResponse } from 'axios';

import Show from '../common/interfaces/show';
import SubscriptionPrice from '../common/interfaces/subscription-price';
import User from '../common/interfaces/user';
import Comment from '../common/interfaces/comment';

const SERVER_HOST = process.env.NEXT_PUBLIC_SERVER_HOST;

interface SignupData {
  firstName: string;
  lastName: string;
  countryId: number;
  userName: string;
  password: string;
}

interface SigninData {
  userName: string;
  password: string;
}

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

export const getAllSubscriptionPrices = async (): Promise<SubscriptionPrice[]> => {
  const response: AxiosResponse<SubscriptionPrice[]> = await axios.get(
    `${SERVER_HOST}/subscription-prices`
  );
  const subscriptionPrices = response.data;
  return subscriptionPrices;
};

export const signUserUp = async (signupData: SignupData): Promise<User> => {
  const response: AxiosResponse<User> = await axios.post(
    `${SERVER_HOST}/users/signup`,
    signupData,
    { withCredentials: true }
  );
  const user = response.data;
  return user;
};

export const signUserIn = async (signinData: SigninData): Promise<User> => {
  const response: AxiosResponse<User> = await axios.post(
    `${SERVER_HOST}/users/signin`,
    signinData,
    { withCredentials: true }
  );
  const user = response.data;
  return user;
};

export const getCurrentUser = async (): Promise<User | null> => {
  const response: AxiosResponse<User | null> = await axios.get(
    `${SERVER_HOST}/users/current-user`,
    {
      withCredentials: true,
    }
  );
  const user = response.data;
  return user;
};

export const signUserOut = async (): Promise<void> => {
  await axios.post(
    `${SERVER_HOST}/users/signout`,
    {},
    {
      withCredentials: true,
    }
  );
};

export const getUsersByUserName = async (input: string): Promise<User[]> => {
  const response: AxiosResponse<User[]> = await axios.get(
    `${SERVER_HOST}/users/user-name?input=${input}`
  );
  const users = response.data;
  return users;
};

export const postComment = async (
  content: string,
  show: number,
  user: number
): Promise<Comment> => {
  const response: AxiosResponse<Comment> = await axios.post(`${SERVER_HOST}/comments`, {
    content,
    show,
    user,
  });
  const comment = response.data;
  return comment;
};

export const getComments = async (showId: number): Promise<Comment[]> => {
  const response: AxiosResponse<Comment[]> = await axios.get(
    `${SERVER_HOST}/comments?show-id=${showId}`
  );
  const comments = response.data;
  return comments;
};
