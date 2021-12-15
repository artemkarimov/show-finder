import type { FunctionComponent } from 'react';
import Link from 'next/link';

import StaticRoutes from '../../common/enums/static-routes';
import styles from './styles.module.scss';

const Header: FunctionComponent = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href={StaticRoutes.HOME}>ShowFinder</Link>
      </div>
    </header>
  );
};

export default Header;
