import Show from '../common/interfaces/show';

type Tuple = [string, string | number];

const prepareShowDetails = (show: Show): Tuple[] => {
  const map = new Map<string, string | number>();
  if (show.releaseYear) map.set('Release Year', show.releaseYear);
  if (show.releaseYears) map.set('Release Years', show.releaseYears);
  map.set('Genre', show.genre.join(', '));
  map.set('Language', show.language);
  map.set('Country', show.country.name);
  map.set('Runtime', show.runtime + ' min');
  if (show.totalSeasons) map.set('Total seasons', show.totalSeasons);
  map.set('Plot', show.plot);
  return [...map.entries()];
};

export default prepareShowDetails;
