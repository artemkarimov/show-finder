import type { FunctionComponent } from 'react';

import ShowItem, { Props as ShowData } from '@components/show-item';
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
