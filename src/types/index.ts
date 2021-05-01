import { components } from './global-types';
type schemas = components['schemas'];

export type AwsObjectDto = schemas['AwsObjectDto'];
export type SearchItemDto = schemas['SearchItemDto'];

export type AwsCredentials = {
  awssecret: string;
  awsaccess: string;
  awsregion: string;
  [key: string]: any;
};

export const AwsLocalStorageKeys = ['awssecret', 'awsaccess', 'awsregion'];
