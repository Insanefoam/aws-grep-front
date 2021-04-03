import axios, {
  CancelToken as AxiosCancelToken,
  AxiosError,
  AxiosRequestConfig,
} from 'axios';
import { BASE_URL } from 'config';

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

export const createSourceCancelToken = () => {
  return axios.CancelToken.source();
};

export default httpClient;
