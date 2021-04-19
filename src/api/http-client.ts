import axios, {
  CancelToken as AxiosCancelToken,
  AxiosError,
  AxiosRequestConfig,
} from 'axios';
import {
  AWS_HEADER_ACCESS,
  AWS_HEADER_REGION,
  AWS_HEADER_SECRET,
} from 'common/constants';
import { BASE_URL } from 'config';
import LocalStorage from 'services/LocalStorage';

export type CancelToken = AxiosCancelToken;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RequestError<
  T = { message: string; statusCode: number; error: string }
> = AxiosError<T>;
export type RequestConfig = AxiosRequestConfig;

const httpClient = axios.create({
  baseURL: BASE_URL,
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      throw error.response.data;
    }

    if (error.data) {
      throw error.data;
    }

    throw error;
  }
);

httpClient.interceptors.request.use((config: AxiosRequestConfig) => {
  const credentials = [AWS_HEADER_ACCESS, AWS_HEADER_SECRET, AWS_HEADER_REGION];

  credentials.forEach((cred) => {
    const value = LocalStorage.getItem(cred);
    config.headers[cred] = config.headers[cred] || value;
  });

  return config;
});

export const createSourceCancelToken = () => {
  return axios.CancelToken.source();
};

export default httpClient;
