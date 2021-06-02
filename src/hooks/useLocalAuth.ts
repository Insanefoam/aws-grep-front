import { validateCredentials } from 'api';
import { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router';
import LocalStorage from 'services/LocalStorage';
import { AwsCredentials } from 'types';
import { ROUTE_PATH } from '_constants';

export const useLocalAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const history = useHistory();

  const credentials = useMemo(() => {
    return {
      awssecret: LocalStorage.getItem('awssecret'),
      awsaccess: LocalStorage.getItem('awsaccess'),
      awsregion: LocalStorage.getItem('awsregion'),
    } as AwsCredentials;
  }, []);

  const validate = async () => {
    try {
      const { data } = await validateCredentials(credentials);
      setIsAuthenticated(data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    validate();
  }, [credentials]);

  if (!isLoading && !isAuthenticated) {
    history.push(ROUTE_PATH.auth);
  }

  return [isAuthenticated, isLoading] as const;
};
