import type { FunctionComponent } from 'react';

import ShowItem from '../show-item';
import styles from './styles.module.scss';

interface ShowData {
  title: string;
  image: string;
  plot: string;
  link: string;
}

interface Props {
  shows: ShowData[];
}

const ShowsGrid: FunctionComponent<Props> = ({ shows }) => {
  return (
    <ul className={styles.grid}>
      {shows.map(show => {
        const { title, image, plot, link } = show;
        return <ShowItem key={link} title={title} image={image} plot={plot} link={link} />;
      })}
    </ul>
  );
};

export default ShowsGrid;
