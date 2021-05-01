import React, { useEffect, useState } from 'react';
import { MainLayout } from 'layouts';
import styles from './ObjectPage.module.scss';
import fontsStyles from 'styles/fonts.module.scss';
import { useParams } from 'react-router';
import { AwsObjectDto } from 'types';
import { getObject } from 'api';
import { SpinnerContainer } from 'components';

function ObjectPage() {
  const { name, objectName } = useParams<{
    name: string;
    objectName: string;
  }>();
  const [object, setObject] = useState<AwsObjectDto | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchObject = async () => {
    try {
      setIsLoading(true);
      const { data } = await getObject(name, objectName);
      setObject(data);
    } catch (e) {
      setError(e.message || 'Something went wrong...');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchObject();
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return <SpinnerContainer />;
    }

    if (object) {
      return (
        <div className={styles.container}>
          <h2 className={fontsStyles.title3Text}>Object name:</h2>
          <p>{object.name}</p>
          {object.data && (
            <React.Fragment>
              <h2 className={fontsStyles.title3Text}>Object data:</h2>
              <p>
                <pre>{JSON.parse(object.data)}</pre>
              </p>
            </React.Fragment>
          )}
        </div>
      );
    }
  };

  return <MainLayout>{renderContent()}</MainLayout>;
}

export default ObjectPage;
