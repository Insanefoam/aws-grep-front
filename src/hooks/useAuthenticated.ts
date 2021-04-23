import { validateCredentials } from 'api';
import { useEffect, useMemo, useState } from 'react';
import LocalStorage from 'services/LocalStorage';
import { AwsCredentials } from 'types';

export const useAuthenticated = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const credentials = useMemo(() => {
    return {
      awssecret: LocalStorage.getItem('awssecret'),
      awsaccess: LocalStorage.getItem('awsaccess'),
      awsregion: LocalStorage.getItem('awsregion'),
    } as AwsCredentials;
  }, []);

  useEffect(() => {
    const validate = async () => {
      const { data } = await validateCredentials(credentials);
      setIsAuthenticated(data);
    };

    validate();
  }, [credentials]);

  return isAuthenticated;
};
