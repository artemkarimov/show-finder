import type { FunctionComponent } from 'react';

import styles from './styles.module.scss';

const Card: FunctionComponent = ({ children }) => {
  return <div className={styles.card}>{children}</div>;
};

export default Card;
