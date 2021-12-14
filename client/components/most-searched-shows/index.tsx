import type { FunctionComponent } from 'react';

import ShowsGrid from '../shows-grid';
import Show from '../../common/interfaces/show';
import getGrid from '../../helpers/slug';
import styles from './styles.module.scss';

interface Props {
  shows: Show[];
}

const MostSearchedShows: FunctionComponent<Props> = ({ shows }) => {
  const fallbackImage = '/images/cinema.jpg';
  const mostSearchedShows = shows.map(show => {
    const { title, poster, plot } = show;
    const slug = getGrid(title);
    if (poster) return { title, image: poster, plot, link: slug };
    else return { title, image: fallbackImage, plot, link: slug };
  });
  return (
    <section className={styles.section}>
      <h2>Most Searched Shows</h2>
      <ShowsGrid shows={mostSearchedShows} />
    </section>
  );
};

export default MostSearchedShows;
