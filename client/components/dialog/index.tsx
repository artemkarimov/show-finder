import type { FunctionComponent } from 'react';

import styles from './styles.module.scss';

interface Props {
  title: string;
  top?: string;
}

const ConfirmDialog: FunctionComponent<Props> = ({ title, top, children }) => {
  return (
    <dialog className={styles.dialog} style={{ top }} open>
      <header>
        <h2>{title}</h2>
      </header>
      <section>{children}</section>
    </dialog>
  );
};

export default ConfirmDialog;
