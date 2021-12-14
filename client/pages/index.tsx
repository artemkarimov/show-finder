import type { NextPage } from 'next';

import SearchBar from '../components/search-bar';
import styles from './styles.module.scss';

const HomePage: NextPage = () => {
  return (
    <div className={styles['search-bar']}>
      <SearchBar />
    </div>
  );
};

export default HomePage;
