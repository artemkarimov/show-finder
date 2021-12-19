import type { NextPage, GetStaticProps, GetStaticPaths, GetStaticPropsContext } from 'next';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';

import { State } from '../../../../store';
import { getUser } from '../../../../store/slices/auth-slice';
import ExploreButton from '../../../../components/buttons/explore-button';
import SearchBar from '../../../../components/search-bar';
import Show from '../../../../common/interfaces/show';
import {
  getAllSubscriptionPrices,
  getMatchingShows,
  getMostSearchedShows,
} from '../../../../api/api-helper';
import SubscriptionPrice from '../../../../common/interfaces/subscription-price';
import { getSlugFromString, getStringFromSlug } from '../../../../helpers/slug';
import Card from '../../../../components/card';
import getLogoPath from '../../../../helpers/logo-path';
import CommentSection from '../../../../components/comment-section';
import StaticRoutes from '../../../../common/enums/static-routes';
import styles from './styles.module.scss';

interface Props {
  show: Show;
  subscriptionPrices: SubscriptionPrice[];
}

const SubscriptionPlansPage: NextPage<Props> = ({ show, subscriptionPrices }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [dispatched, setDispatched] = useState<boolean>(false);
  useEffect(() => {
    dispatch(getUser());
    setDispatched(true);
  }, []);
  const currentUser = useSelector((state: State) => state.auth.currentUser);
  if (dispatched && !currentUser) router.replace(StaticRoutes.HOME);
  const prices = subscriptionPrices.filter(value => value.country.id === currentUser?.countryId);
  return (
    <>
      <SearchBar />
      <Card maxWidth="35rem">
        {!prices.length && (
          <h3 className={styles.heading}>
            Unfortunately none of the streaming services that have {show.type} "{show.title}" in
            their libraries are available in your country
          </h3>
        )}
        {!!prices.length && (
          <h3 className={styles.heading}>
            Prices for subscriptions for streaming services that are available in{' '}
            {!!prices.length && prices[0].country.name} where {show.type} "{show.title}" can be
            watched
          </h3>
        )}
        <ul>
          {prices.map((value, index) => (
            <li key={index} className={styles.item}>
              <Image
                src={getLogoPath(value.streamingService.name)}
                alt={value.streamingService.name}
                width={60}
                height={60}
              />
              <h3 className={styles.plan}>{value.subscriptionPlan.name}</h3>
              <p className={styles.cost}>{value.cost}</p>
              <div className={styles.button}>
                <ExploreButton link={prices.length ? value.streamingService.link : ''} />
              </div>
            </li>
          ))}
        </ul>
        {!!prices.length && currentUser && (
          <div>
            <CommentSection showId={show.id} userId={currentUser.id} />
          </div>
        )}
      </Card>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const shows = await getMostSearchedShows(20);
  const paths = [];
  for (const show of shows) {
    const slug = getSlugFromString(show.title);
    const object = { params: { id: `/shows/${slug}/subscription-plans` } };
    paths.push(object);
  }
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const slug = context.params?.id as string;
  const showName = getStringFromSlug(slug);
  const matchingShows  = await getMatchingShows(showName);
  const shows = matchingShows.filter(show => show.title.toLowerCase() === showName.toLowerCase());
  const streamingServices = shows.map(show => show.streamingService.id);
  const allSubscriptionPrices = await getAllSubscriptionPrices();
  const subscriptionPrices = allSubscriptionPrices.filter(value =>
    streamingServices.includes(value.streamingService.id)
  );
  return {
    props: {
      show: shows[0],
      subscriptionPrices,
    },
  };
};

export default SubscriptionPlansPage;
