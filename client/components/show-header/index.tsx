import type { FunctionComponent } from 'react';
import Image from 'next/image';

import styles from './styles.module.scss';

interface Props {
  title: string;
  image: string;
}

const ShowHeader: FunctionComponent<Props> = ({ title, image }) => {
  return (
    <header className={styles.header}>
      <h1>Title</h1>
      <Image src={image} alt={title} width={200} height={300} />
    </header>
  );
};

export default ShowHeader;
