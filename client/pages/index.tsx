import type { NextPage, GetStaticProps } from 'next';

import SearchBar from '../components/search-bar';
import MostSearchedShows from '../components/most-searched-shows';
import Show from '../common/interfaces/show';
import { getMostSearchedShows } from '../api/api-helper';

interface Props {
  mostSearchedShows: Show[];
}

const HomePage: NextPage<Props> = ({ mostSearchedShows }) => {
  return (
    <>
      <SearchBar />
      <MostSearchedShows shows={mostSearchedShows} />
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
