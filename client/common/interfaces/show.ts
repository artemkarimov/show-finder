import StreamingService from './streaming-service';
import Country from './country';
import ShowType from '@common/types/show-type';

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
  poster: string | null;
  plot: string;
  searchCount: number;
  streamingService: StreamingService;
  country: Country;
}

export default Show;
