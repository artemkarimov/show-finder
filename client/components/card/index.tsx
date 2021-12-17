import type { FunctionComponent } from 'react';

import styles from './styles.module.scss';

interface Props {
  maxWidth?: string;
}

const Card: FunctionComponent<Props> = ({ maxWidth, children }) => {
  return (
    <div className={styles.card} style={{ maxWidth }}>
      {children}
    </div>
  );
};

export default Card;
