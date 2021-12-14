import { FunctionComponent, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import loadImage from '../../helpers/image-loader';
import { FALLBACK_IMAGE_PATH } from '../../constants';
import styles from './styles.module.scss';

interface Props {
  title: string;
  image: string;
  plot: string;
  link: string;
}

const ShowItem: FunctionComponent<Props> = ({ title, image, plot, link }) => {
  const [imagePath, setImagePath] = useState<string>('');
  useEffect(() => {
    const getImagePath = async () => {
      const url = await loadImage(image);
      setImagePath(url);
    };
    getImagePath();
  }, []);
  return (
    <li className={styles.show}>
      <Link href={link}>
        <a>
          <div className={styles.image}>
            <Image
              src={imagePath ? imagePath : FALLBACK_IMAGE_PATH}
              alt={title}
              width={200}
              height={300}
            />
          </div>
          <div className={styles.content}>
            <h3>{title}</h3>
            <p>{plot}</p>
          </div>
        </a>
      </Link>
    </li>
  );
};

export default ShowItem;
