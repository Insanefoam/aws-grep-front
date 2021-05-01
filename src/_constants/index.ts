export const ROUTE_PATH = {
  auth: '/auth',
  home: '/home',
  bucket: (bucket: string) => `/bucket/${bucket}`,
  object: (bucket: string, key: string) => `/bucket/${bucket}/object/${key}`,
};

export const AWS_HEADER_SECRET = 'awssecret';
export const AWS_HEADER_ACCESS = 'awsaccess';
export const AWS_HEADER_REGION = 'awsregion';
