import type { FunctionComponent, ChangeEvent } from 'react';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

import SearchInput from '../inputs/search-input';
import Show from '../../common/interfaces/show';
import styles from './styles.module.scss';

const SearchBar: FunctionComponent = () => {
  const [matchingShows, setMatchingShows] = useState<Show[]>([]);
  const searchHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
  };
  return (
    <>
      <div className={styles['search-input']}>
        <SearchInput placeholder="Search for..." searchHandler={searchHandler} />
        <div className={styles.icon}>
          <SearchIcon />
        </div>
      </div>
      <div className={styles['search-result']}>
        {!!matchingShows.length &&
          matchingShows.map(value => (
            <a className={styles.item}>
              <p>
                {value.title}{' '}
                <span>
                  ({value.type}, {value.type === 'film' ? value.releaseYear : value.releaseYears})
                </span>
              </p>
            </a>
          ))}
      </div>
    </>
  );
};

export default SearchBar;
