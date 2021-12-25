import type { FunctionComponent } from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import SearchBar from '@components/search-bar';
import ShowHeader from '@components/show-header';
import LoadingSpinner from '@components/loading-spinner';
import Button from '@components/buttons/button';
import Show from '@common/interfaces/show';
import StaticRoutes from '@common/enums/static-routes';
import { State } from '@store';
import prepareShowDetails from '@helpers/show-details';
import getLogoPath from '@helpers/logo-path';
import capitalise from '@helpers/capitaliser';
import styles from './styles.module.scss';

interface Props {
  shows: Show[];
}

const ShowDetails: FunctionComponent<Props> = ({ shows }) => {
  const show = shows[0];
  const showDetails = prepareShowDetails(show);
  const [imagesPaths, setImagesPaths] = useState<string[]>([]);
  const isAuthenticated = useSelector((state: State) => state.auth.isAuthenticated);
  const router = useRouter();
  useEffect(() => {
    const getImagesPaths = async () => {
      const paths: string[] = [];
      for (const show of shows) {
        const path = getLogoPath(show.streamingService.name);
        paths.push(path);
      }
      setImagesPaths(paths);
    };
    getImagesPaths();
  }, []);
  if (!imagesPaths.length) return <LoadingSpinner />;
  return (
    <>
      <SearchBar />
      <article className={styles.content}>
        <ShowHeader title={show.title} image={show.poster} />
        <div className={styles.details}>
          <section>
            <h4>
              This {show.type} can be watched in {shows.length} streaming service
              {shows.length === 1 ? '' : 's'}:
            </h4>
            <ul>
              {shows.map((show, index) => {
                const streamingServiceName = show.streamingService.name;
                return (
                  <li key={streamingServiceName} style={{ display: 'flex', marginBottom: '1rem' }}>
                    <Image
                      src={imagesPaths[index]}
                      alt={streamingServiceName}
                      width={100}
                      height={100}
                    />
                    <h4 style={{ marginLeft: '1rem' }}>{streamingServiceName}</h4>
                  </li>
                );
              })}
            </ul>
            {!isAuthenticated && shows.length === 1 && (
              <p className={styles.message}>
                If you want to see if this streaming service is available in your country and
                checkout its subscription plans, please{' '}
                <Link href={StaticRoutes.SIGNIN}>sign in</Link>
              </p>
            )}
            {!isAuthenticated && shows.length > 1 && (
              <p className={styles.message}>
                If you want to see which of these streaming services are available in your country
                and checkout their subscription plans, please{' '}
                <Link href={StaticRoutes.SIGNIN}>sign in</Link>
              </p>
            )}
            {isAuthenticated && (
              <Button flat={true} link={`/shows/${router.query.id}/subscription-plans`}>
                Checkout subscription plans
              </Button>
            )}
          </section>
          <section>
            <h4 className={styles['show-details']}>{capitalise(show.type)} Details</h4>
            <ul>
              {showDetails.map(value => (
                <li key={value[0]}>
                  <span>{value[0]}:</span> {value[1]}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </article>
    </>
  );
};

export default ShowDetails;
