import type { FunctionComponent } from 'react';

import ShowItem from '../show-item';
import { Props as ShowData } from '../show-item';
import styles from './styles.module.scss';

interface Props {
  shows: ShowData[];
}

const ShowsGrid: FunctionComponent<Props> = ({ shows }) => {
  return (
    <ul className={styles.grid}>
      {shows.map(show => {
        const { type, title, image, plot, releasePeriod, link } = show;
        return (
          <ShowItem
            key={link}
            type={type}
            title={title}
            image={image}
            plot={plot}
            link={link}
            releasePeriod={releasePeriod}
          />
        );
      })}
    </ul>
  );
};

export default ShowsGrid;
