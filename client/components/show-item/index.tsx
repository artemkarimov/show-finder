import { FunctionComponent, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { getBlobData } from '../../api/api-helper';
import styles from './styles.module.scss';

interface Props {
  title: string;
  image: string;
  plot: string;
  link: string;
}

const ShowItem: FunctionComponent<Props> = ({ title, image, plot, link }) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const fallbackImage = '/images/cinema.jpg';
  useEffect(() => {
    const loadImage = async () => {
      const blob = await getBlobData(image);
      const url = URL.createObjectURL(blob);
      setImageUrl(url);
    };
    loadImage();
  }, []);
  return (
    <li className={styles.show}>
      <Link href={link}>
        <a>
          <div className={styles.image}>
            <Image src={imageUrl ? imageUrl : fallbackImage} alt={title} width={200} height={300} />
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
