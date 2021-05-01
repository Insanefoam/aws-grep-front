import { MainLayout } from 'layouts';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import styles from './Bucket.module.scss';
import fontsStyles from 'styles/fonts.module.scss';
import { AwsObjectDto } from 'types';
import { getAllBucketObjects } from 'api';
import { useAsyncCallback } from 'hooks';
import { SpinnerContainer } from 'components';
import { ROUTE_PATH } from '_constants';

function Bucket() {
  const history = useHistory();

  const { name: bucketName } = useParams<{ name: string }>();

  const [object, setObjects] = useState<AwsObjectDto[]>([]);
  const [error, setError] = useState('');

  const fetchObjects = async () => {
    try {
      const { data } = await getAllBucketObjects(bucketName);
      setObjects(data);
    } catch (e) {
      setError(e.message || 'Something went wrong...');
    }
  };

  const [asyncFetchObjects, isLoading] = useAsyncCallback(fetchObjects);

  useEffect(() => {
    asyncFetchObjects(false);
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return <SpinnerContainer />;
    }

    if (error) {
      <p className={fontsStyles.title4Text}>{error}</p>;
    }

    return (
      <div className={styles.objectsContainer}>
        {object.map((object) => (
          <div
            className={styles.objectContainer}
            onClick={() =>
              history.push(ROUTE_PATH.object(bucketName, object.name))
            }
            key={`${object.name} ${object.size}`}
          >
            <p className={styles.objectName}>{object.name}</p>
            <p className={styles.objectSize}>Size: {object.size} bytes</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <MainLayout>
      <h1 className={fontsStyles.title4Text}>{bucketName}</h1>
      {renderContent()}
    </MainLayout>
  );
}

export default Bucket;
