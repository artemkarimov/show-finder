import { Controller, Post, Body, Get, Query } from '@nestjs/common';

import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dtos/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async createComment(@Body() body: CreateCommentDto) {
    return this.commentsService.create(body);
  }

  @Get()
  async getComments(@Query('show-id') showId: string) {
    return this.commentsService.find(+showId);
  }
}
