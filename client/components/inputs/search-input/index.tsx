import type { FunctionComponent } from 'react';

import styles from './styles.module.scss';

interface Props {
  placeholder: string;
}

const SearchInput: FunctionComponent<Props> = ({ placeholder }) => {
  return <input className={styles.input} placeholder={placeholder} />;
};

export default SearchInput;