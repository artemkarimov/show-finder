import type { FunctionComponent } from 'react';
import Link from 'next/link';

import ArrowRightIcon from '../../icons/arrow-right-icon';
import styles from './styles.module.scss';

interface Props {
  link: string;
}

const ExploreButton: FunctionComponent<Props> = ({ link }) => {
  return (
    <Link href={link}>
      <a target="_blank">
        <button className={styles.button}>
          <span>Explore</span>
          <span className={styles.icon}>
            <ArrowRightIcon />
          </span>
        </button>
      </a>
    </Link>
  );
};

export default ExploreButton;
