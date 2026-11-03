import {Body, Controller, Get, Param, ParseUUIDPipe, Post, Query} from '@nestjs/common';
import { MessagesService } from './messages.service.js';
import { CreateMessageDto } from './dto/create-message.dto.js';
import { MessageQueryDto } from './dto/message-query.dto.js';

@Controller('conversations/:conversationId/messages')
export class MessagesController {
  constructor(
    private readonly messagesService: MessagesService,
  ) {}

  @Post()
  create(@Param('conversationId', ParseUUIDPipe) conversationId: string, @Body() dto: CreateMessageDto) {
    return this.messagesService.create(conversationId, dto);
  }

  @Get()
  findAll(@Param('conversationId', ParseUUIDPipe) conversationId: string, @Query() query: MessageQueryDto) {
    return this.messagesService.findAll(conversationId, query);
  }

  @Get(':messageId')
  findOne(
    @Param('conversationId', ParseUUIDPipe)
    conversationId: string,
    @Param('messageId', ParseUUIDPipe)
    messageId: string,
  ) {
    return this.messagesService.findOne(
      conversationId,
      messageId,
    );
  }
}
