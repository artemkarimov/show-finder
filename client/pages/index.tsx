import type { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import SearchBar from '@components/search-bar';
import MostSearchedShows from '@components/most-searched-shows';
import Show from '@common/interfaces/show';
import { getMostSearchedShows } from '@api/api-helper';
import { getUser } from '@store/slices/auth-slice';

interface Props {
  mostSearchedShows: Show[];
}

const HomePage: NextPage<Props> = ({ mostSearchedShows }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, []);
  return (
    <>
      <Head>
        <title>ShowFinder</title>
      </Head>
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
