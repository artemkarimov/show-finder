const getSlug = (phrase: string): string => phrase.toLowerCase().split(' ').join('-');

export default getSlug;
