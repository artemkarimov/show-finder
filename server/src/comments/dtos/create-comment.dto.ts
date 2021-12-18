import { IsString, IsNumber } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  content: string;
}
