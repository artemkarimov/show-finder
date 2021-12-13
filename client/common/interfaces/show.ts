import StreamingService from './streamingService';
import Country from './country';
import ShowType from '../types/showType';

interface Show {
  id: number;
  title: string;
  type: ShowType;
  genre: string[];
  releaseYear: number | null;
  releaseYears: string | null;
  language: string;
  runtime: string;
  totalSeasons: number;
  poster: number | null;
  plot: string;
  searchCount: number;
  streamingService: StreamingService;
  country: Country;
}

export default Show;
