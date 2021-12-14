import { getBlobData } from '../api/api-helper';

const loadImage = async (imageUrl: string): Promise<string> => {
  const blob = await getBlobData(imageUrl);
  const url = URL.createObjectURL(blob);
  return url;
};

export default loadImage;
