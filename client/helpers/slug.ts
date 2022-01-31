export const getSlugFromString = (string: string): string => {
  return string.toLowerCase().split(' ').join('&');
};

export const getStringFromSlug = (slug: string): string => slug.split('&').join(' ');
