import type { NextPage, GetStaticProps } from 'next';

import SearchBar from '../components/search-bar';
import MostSearchedShows from '../components/most-searched-shows';
import Show from '../common/interfaces/show';
import { getMostSearchedShows } from '../api/api-helper';
import styles from './styles.module.scss';

interface Props {
  mostSearchedShows: Show[];
}

const HomePage: NextPage<Props> = ({ mostSearchedShows }) => {
  console.log(mostSearchedShows);
  return (
    <>
      <div className={styles['search-bar']}>
        <SearchBar />
      </div>
      <div className={styles['most-searched']}>
        <MostSearchedShows shows={mostSearchedShows} />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const mostSearchedShows = await getMostSearchedShows(6);
  return {
    props: {
      mostSearchedShows,
    },
  };
};

export default HomePage;
