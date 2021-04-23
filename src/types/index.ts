export type AwsCredentials = {
  awssecret: string;
  awsaccess: string;
  awsregion: string;
  [key: string]: any;
};

export const AwsLocalStorageKeys = ['awssecret', 'awsaccess', 'awsregion'];
