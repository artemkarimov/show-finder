import type { FunctionComponent, ChangeEvent } from 'react';
import { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';

import SearchInput from '../inputs/search-input';
import Show from '../../common/interfaces/show';
import { getMatchingShows } from '../../api/api-helper';
import getArrayUniqueByKey from '../../helpers/array-unique-by-key';
import styles from './styles.module.scss';

const SearchBar: FunctionComponent = () => {
  const [matchingShows, setMatchingShows] = useState<Show[]>([]);
  const [resultCardHeight, setResultCardHeight] = useState<number>(250);
  const [noShowsFound, setNoShowsFound] = useState<boolean>(false);
  const searchHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    if (input) {
      const shows = await getMatchingShows(input);
      if (shows.length) {
        const uniqueShows = getArrayUniqueByKey<Show>(shows, 'title')
        setMatchingShows(uniqueShows);
        if (noShowsFound) setNoShowsFound(false);
      } else setNoShowsFound(true);
    } else {
      setMatchingShows([]);
    }
  };
  useEffect(() => {
    if (matchingShows.length === 4) setResultCardHeight(200);
    else if (matchingShows.length === 3) setResultCardHeight(150);
    else if (matchingShows.length === 2 || noShowsFound) setResultCardHeight(100);
    else if (matchingShows.length === 1) setResultCardHeight(50);
    else if (matchingShows.length !== 5) setResultCardHeight(250);
  }, [matchingShows, noShowsFound]);
  return (
    <>
      <div className={styles['search-input']}>
        <SearchInput placeholder="Search for..." searchHandler={searchHandler} />
        <div className={styles.icon}>
          <SearchIcon />
        </div>
      </div>
      <div
        className={styles['search-result']}
        style={{
          display: matchingShows.length ? 'block' : 'none',
          height: `${resultCardHeight}px`,
        }}
      >
        {!!matchingShows.length &&
          !noShowsFound &&
          matchingShows.map(value => (
            <a className={styles.item} key={value.id}>
              <p>
                {value.title}{' '}
                <span>
                  ({value.type}, {value.type === 'film' ? value.releaseYear : value.releaseYears})
                </span>
              </p>
            </a>
          ))}
        {!!matchingShows.length && noShowsFound && (
          <p className={styles['not-found']}>No Shows Found</p>
        )}
      </div>
    </>
  );
};

export default SearchBar;
