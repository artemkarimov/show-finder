import type { FunctionComponent } from 'react';
import SearchIcon from '@mui/icons-material/Search';

import SearchInput from '../inputs/search-input';
import styles from './styles.module.scss';

interface Props {
  shows: any[];
}

const SearchBar: FunctionComponent<Props> = ({ shows }) => {
  return (
    <>
      <div className={styles['search-input']}>
        <SearchInput placeholder="Search for..." />
        <div className={styles.icon}>
          <SearchIcon />
        </div>
      </div>
      <div className={styles['search-result']}>
        {shows.map(value => (
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
