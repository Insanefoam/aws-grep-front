import { getAllBuckets, indexBucketObjects } from 'api';
import { Logo, SpinnerContainer } from 'components';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import LocalStorage from 'services/LocalStorage';
import { Button } from 'UI';
import { ROUTE_PATH } from '_constants';
import styles from './MainLayout.module.scss';
import fontsStyles from 'styles/fonts.module.scss';

type Props = React.PropsWithChildren<{}>;

function MainLayout({ children }: Props) {
  const history = useHistory();
  const [isSynchronizing, setIsSynchronizing] = useState(false);

  const synchronizeObjects = async () => {
    try {
      setIsSynchronizing(true);
      const { data: buckets } = await getAllBuckets();
      await Promise.all(
        buckets.map(async (bucket) => {
          await indexBucketObjects(bucket);
        })
      );
    } catch (e) {
      console.log(e);
    } finally {
      setIsSynchronizing(false);
    }
  };

  const handleLogout = () => {
    LocalStorage.clearCredentials();
    history.push(ROUTE_PATH.auth);
  };

  const renderContent = () => {
    if (isSynchronizing) {
      return (
        <div className={styles.syncContainer}>
          <p className={fontsStyles.title4Text}>
            We index all your bucket objects. Please wait...
          </p>
          <SpinnerContainer />
        </div>
      );
    }

    return children;
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Logo />
        <Button disabled={isSynchronizing} onClick={synchronizeObjects}>
          Synchronize objects
        </Button>
        <Button onClick={handleLogout}>Logout</Button>
      </header>
      <main>{renderContent()}</main>
    </div>
  );
}

export default MainLayout;
