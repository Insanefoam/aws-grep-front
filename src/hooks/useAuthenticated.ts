import { validateCredentials } from 'api';
import { useEffect, useMemo, useState } from 'react';
import LocalStorage from 'services/LocalStorage';
import { AwsCredentials } from 'types';

export const useAuthenticated = () => {
  const [isLoading, setIsLoading] = useState(false);
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
      try {
        setIsLoading(true);
        const { data } = await validateCredentials(credentials);
        setIsAuthenticated(data);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };

    validate();
  }, [credentials]);

  return [isAuthenticated, isLoading];
};
