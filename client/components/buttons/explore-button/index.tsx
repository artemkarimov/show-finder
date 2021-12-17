import type { FunctionComponent } from 'react';

import ArrowRightIcon from '../../icons/arrow-right-icon';
import styles from './styles.module.scss';

interface Props {
  clickHandler: () => void;
}

const ExploreButton: FunctionComponent<Props> = ({ clickHandler }) => {
  return (
    <button className={styles.button} onClick={clickHandler}>
      <span>Explore</span>
      <span className={styles.icon}>
        <ArrowRightIcon />
      </span>
    </button>
  );
};

export default ExploreButton;
