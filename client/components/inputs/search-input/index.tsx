import type { FunctionComponent, ChangeEvent } from 'react';

import styles from './styles.module.scss';

interface Props {
  placeholder: string;
  searchHandler: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
}

const SearchInput: FunctionComponent<Props> = ({ placeholder, searchHandler }) => {
  return (
    <input
      type="text"
      className={styles.input}
      placeholder={placeholder}
      onChange={searchHandler}
    />
  );
};

export default SearchInput;
