import { Controller, Get, Post, Delete, Body, Query } from '@nestjs/common';

import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dtos/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly service: CommentsService) {}

  @Post()
  async createComment(@Body() body: CreateCommentDto) {
    return this.service.create(body);
  }

  @Get()
  async getComments(@Query('show-id') showId: string) {
    const comments = await this.service.find(+showId);
    return comments;
  }

  @Delete()
  async deleteComment(@Query('comment-id') commentId: string) {
    return await this.service.delete(+commentId);
  }
}
