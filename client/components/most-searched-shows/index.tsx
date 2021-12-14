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
    const { title, poster, plot } = show;
    const slug = getSlugFromString(title);
    if (poster) return { title, image: poster, plot, link: `/shows/${slug}` };
    else return { title, image: FALLBACK_IMAGE_PATH, plot, link: `${slug}` };
  });
  return (
    <section className={styles.section}>
      <h2>Most Searched Shows</h2>
      <ShowsGrid shows={mostSearchedShows} />
    </section>
  );
};

export default MostSearchedShows;
