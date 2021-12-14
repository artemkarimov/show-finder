const getLogoPath = (name: string): string => {
  const imageName = name.toLowerCase().split(' ').join('');
  return `/images/logos/${imageName}.png`;
};

export default getLogoPath;
