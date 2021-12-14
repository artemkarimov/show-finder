import type { FunctionComponent, ChangeEvent } from 'react';

import styles from './styles.module.scss';

interface Props {
  value: string;
  placeholder: string;
  searchHandler: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
}

const SearchInput: FunctionComponent<Props> = ({ placeholder, value, searchHandler }) => {
  return (
    <input
      type="text"
      className={styles.input}
      value={value}
      placeholder={placeholder}
      onChange={searchHandler}
    />
  );
};

export default SearchInput;
