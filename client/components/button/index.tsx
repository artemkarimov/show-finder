import type { FunctionComponent } from 'react';
import Link from 'next/link';

import styles from './styles.module.scss';

interface Props {
  flat: boolean;
  link?: string;
}

const Button: FunctionComponent<Props> = ({ flat, link, children }) => {
  const classNames = [styles.button, flat ? styles.flat : ''];
  if (link) {
    return (
      <Link href={link}>
        <button className={classNames.join(' ')}>{children}</button>
      </Link>
    );
  }
  return <button className={classNames.join(' ')}>{children}</button>;
};

export default Button;
