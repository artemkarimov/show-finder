import type { FunctionComponent } from 'react';
import Link from 'next/link';

import styles from './styles.module.scss';

interface Props {
  flat: boolean;
  link?: string;
  clickHandler?: () => void | Promise<void>;
}

const Button: FunctionComponent<Props> = ({ flat, link, clickHandler, children }) => {
  const classNames = [styles.button, flat ? styles.flat : ''];
  if (link) {
    return (
      <Link href={link}>
        <button className={classNames.join(' ')} onClick={clickHandler}>{children}</button>
      </Link>
    );
  }
  return <button className={classNames.join(' ')} onClick={clickHandler}>{children}</button>;
};

export default Button;
