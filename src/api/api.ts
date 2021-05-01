import { AwsCredentials, AwsObjectDto, SearchItemDto } from 'types';
import httpClient from './http-client';

export const getAllBuckets = () => {
  return httpClient.get<string[]>('storage/buckets');
};

export const getAllBucketObjects = (bucket: string) => {
  return httpClient.get<AwsObjectDto[]>(`storage/buckets/${bucket}/objects`);
};

export const getObject = (bucket: string, objectKey: string) => {
  return httpClient.get<AwsObjectDto>(
    `storage/buckets/${bucket}/objects/${objectKey}`
  );
};

export const indexBucketObjects = (bucket: string) => {
  return httpClient.post(`elastic-search/index-objects/${bucket}`);
};

export const searchInIndex = (search: string) => {
  return httpClient.get<SearchItemDto[]>(`elastic-search/search/${search}`);
};

export const validateCredentials = (credentials: AwsCredentials) => {
  return httpClient.post<boolean>('storage/validate', null, {
    headers: credentials,
  });
};
