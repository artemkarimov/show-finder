import type { FunctionComponent } from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';

import LoadingSpinner from '@components/loading-spinner';
import loadImage from '@helpers/image-loader';
import { FALLBACK_IMAGE_PATH } from '@constants';
import styles from './styles.module.scss';

interface Props {
  title: string;
  image: string | null;
}

const ShowHeader: FunctionComponent<Props> = ({ title, image }) => {
  const [imagePath, setImagePath] = useState<string>('');
  useEffect(() => {
    const getImagePath = async () => {
      if (image) {
        const url = await loadImage(image);
        setImagePath(url);
      } else setImagePath(FALLBACK_IMAGE_PATH);
    };
    getImagePath();
  }, []);
  if (!imagePath) return <LoadingSpinner />;
  return (
    <header className={styles.header}>
      <h1>{title}</h1>
      <Image src={imagePath} alt={title} width={150} height={225} />
    </header>
  );
};

export default ShowHeader;
