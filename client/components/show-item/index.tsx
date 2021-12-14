import type { FunctionComponent } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import styles from './styles.module.scss';

interface Props {
  title: string;
  image: string;
  plot: string;
  link: string;
}

const ShowItem: FunctionComponent<Props> = ({ title, image, plot, link }) => {
  return (
    <li>
      <Link href={link}>
        <a>
          <div className={styles.image}>
            <Image src={image} alt={title} width={300} height={200} />
          </div>
          <div className={styles.content}>
            <h3>{title}</h3>
            <p>{plot}</p>
          </div>
        </a>
      </Link>
    </li>
  );
};

export default ShowItem;
