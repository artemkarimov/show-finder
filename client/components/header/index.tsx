import type { FunctionComponent } from 'react';
import Link from 'next/link';

import styles from './styles.module.scss';

const Header: FunctionComponent = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">ShowFinder</Link>
      </div>
    </header>
  );
};

export default Header;
