import type { FunctionComponent } from 'react';

import ShowsGrid from '../shows-grid';
import Show from '../../common/interfaces/show';
import { getSlugFromString } from '../../helpers/slug';
import { FALLBACK_IMAGE_PATH } from '../../constants';
import styles from './styles.module.scss';

interface Props {
  shows: Show[];
}

const MostSearchedShows: FunctionComponent<Props> = ({ shows }) => {
  const mostSearchedShows = shows.map(show => {
    const { type, title, poster, plot, releaseYear, releaseYears } = show;
    const slug = getSlugFromString(title);
    return {
      type,
      title,
      image: poster ? poster : FALLBACK_IMAGE_PATH,
      plot,
      link: `/shows/${slug}`,
      releasePeriod: releaseYear ? releaseYear.toString() : releaseYears!,
    };
  });
  return (
    <section className={styles.section}>
      <h2>Most Searched Shows</h2>
      <ShowsGrid shows={mostSearchedShows} />
    </section>
  );
};

export default MostSearchedShows;
