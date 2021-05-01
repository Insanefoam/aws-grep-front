import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './Home.module.scss';
import fontsStyles from 'styles/fonts.module.scss';
import cx from 'classnames';
import { SpinnerContainer } from 'components';
import { Button, TextInput } from 'UI';
import { SearchItemDto } from 'types';
import { searchInIndex } from 'api';
import { useHistory } from 'react-router';
import { ROUTE_PATH } from '_constants';
import debounce from 'debounce';
import { MainLayout } from 'layouts';

function Home() {
  const history = useHistory();

  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchItemDto[]>([]);

  const fetchResults = async (searchValue: string) => {
    try {
      setIsLoading(true);
      const { data } = await searchInIndex(searchValue);
      setResults(data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedFetch = useMemo(() => debounce(fetchResults, 500), []);

  useEffect(() => {
    if (searchValue) {
      debouncedFetch(searchValue);
    }
  }, [searchValue]);

  const renderContent = () => {
    if (isLoading) {
      return <SpinnerContainer />;
    }

    if (!searchValue) {
      return (
        <p className={cx(fontsStyles.title4Text, styles.noSearchText)}>
          Try to type something!
        </p>
      );
    }

    if (results.length === 0) {
      return (
        <p className={cx(fontsStyles.title4Text, styles.noSearchText)}>
          Nothing found :(
        </p>
      );
    }

    return results.map((result) => {
      return (
        <div
          className={styles.resultItem}
          key={`${result.bucket} ${result.object}`}
        >
          <h1>
            Bucket:&nbsp;
            <a href={ROUTE_PATH.bucket(result.object)}>{result.bucket}</a>
          </h1>
          <h2>
            Object:&nbsp;
            <a href={ROUTE_PATH.object(result.bucket, result.object)}>
              {result.object}
            </a>
          </h2>
          <p dangerouslySetInnerHTML={{ __html: result.highlight }} />
        </div>
      );
    });
  };

  return (
    <MainLayout>
      <section>
        <form className={styles.formContainer}>
          <TextInput
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Start typing and we try to find what you want..."
          />
          <Button type="button">Search!</Button>
          <div className={styles.suggestionsContainer}>suggestions</div>
        </form>
        <div className={styles.contentContainer}>{renderContent()}</div>
      </section>
    </MainLayout>
  );
}

export default Home;
