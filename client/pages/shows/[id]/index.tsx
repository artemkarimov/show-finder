import type { NextPage, GetStaticProps, GetStaticPaths, GetStaticPropsContext } from 'next';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import ShowDetails from '../../../components/show-details';
import Show from '../../../common/interfaces/show';
import { getUser } from '../../../store/slices/auth-slice';
import { getMatchingShows, getMostSearchedShows } from '../../../api/api-helper';
import { getSlugFromString, getStringFromSlug } from '../../../helpers/slug';

interface Props {
  shows: Show[];
}

const ShowPage: NextPage<Props> = ({ shows }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, []);
  return (
    <>
      <ShowDetails shows={shows} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const shows = await getMostSearchedShows(20);
  const paths = [];
  for (const show of shows) {
    const slug = getSlugFromString(show.title);
    const object = { params: { id: `/shows/${slug}` } };
    paths.push(object);
  }
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const { params } = context;
  const pageId = (params && params.id)! as string;
  const showName = getStringFromSlug(pageId);
  console.log(showName);
  const shows = await getMatchingShows(showName);
  return {
    props: { shows },
  };
};

export default ShowPage;
