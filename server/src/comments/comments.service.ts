import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dtos/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(@InjectRepository(Comment) private readonly repository: Repository<Comment>) {}

  async create(commentDto: CreateCommentDto) {
    const comment = this.repository.create({ ...commentDto });
    return await this.repository.save(comment);
  }

  async find(showId: number) {
    const comments = await this.repository.find({
      relations: ['show', 'user'],
      where: { show: showId },
    });
    return comments;
  }
}
