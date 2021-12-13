import {
  IsNumber,
  IsString,
  IsOptional,
  Length,
  ArrayMinSize,
} from 'class-validator';

import { ShowType } from '../types/show-type.type';

export class AddShowDto {
  @IsString()
  title: string;

  @IsString()
  @Length(4, 6)
  type: ShowType;

  @IsString({ each: true })
  @ArrayMinSize(1)
  genre: string[];

  @IsNumber()
  @IsOptional()
  releaseYear: number;

  @IsString()
  @IsOptional()
  @Length(9, 12)
  releaseYears: string;

  @IsString()
  language: string;

  @IsNumber()
  runtime: number;

  @IsString()
  @IsOptional()
  totalSeasons: number;

  @IsString()
  @IsOptional()
  poster: string;

  @IsString()
  plot: string;
}
