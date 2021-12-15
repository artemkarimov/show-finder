import type { FunctionComponent } from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';

import SearchBar from '../search-bar';
import ShowHeader from '../show-header';
import Show from '../../common/interfaces/show';
import prepareShowDetails from '../../helpers/show-details';
import getLogoPath from '../../helpers/logo-path';
import LoadingSpinner from '../loading-spinner';
import styles from './styles.module.scss';
import capitalise from '../../helpers/capitaliser';

interface Props {
  shows: Show[];
}

const ShowDetails: FunctionComponent<Props> = ({ shows }) => {
  const show = shows[0];
  const showDetails = prepareShowDetails(show);
  const [imagesPaths, setImagesPaths] = useState<string[]>([]);
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
            {shows.length === 1 && (
              <p className={styles.message}>
                If you want to see if this streaming service is available in your country and
                checkout its subscription plans, please sign in
              </p>
            )}
            {shows.length > 1 && (
              <p className={styles.message}>
                If you want to see which of these streaming services are available in your country
                and checkout their subscription plans, please sign in.
              </p>
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
