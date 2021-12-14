import type { FunctionComponent } from 'react';
import Spinner from 'react-loader-spinner';

import styles from './styles.module.scss';

const LoadingSpinner: FunctionComponent = () => {
  return (
    <div className={styles.spinner}>
      <Spinner type="TailSpin" color="#757575" height={100} width={100} timeout={3000} />;
    </div>
  );
};

export default LoadingSpinner;
