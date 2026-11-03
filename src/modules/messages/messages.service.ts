import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { MessageRole, MessageStatus } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { CreateMessageDto } from './dto/create-message.dto.js';
import { MessageQueryDto } from './dto/message-query.dto.js';

@Injectable()
export class MessagesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(conversationId: string, dto: CreateMessageDto) {
    return this.prisma.$transaction(async (tx) => {
      const conversation = await tx.conversation.findFirst({
        where: { id: conversationId, deletedAt: null },
        select: { id: true, status: true },
      });

      if (!conversation) {
        throw new NotFoundException(`Conversation with ID ${conversationId} not found`);
      }

      if (conversation.status !== 'ACTIVE') {
        throw new ConflictException('Cannot add messages to an archived conversation');
      }

      const message = await tx.message.create({
        data: {
          conversationId,
          role: MessageRole.USER,
          status: MessageStatus.COMPLETED,
          content: dto.content,
        },
      });

      await tx.conversation.update({
        where: { id: conversationId },
        data: { updatedAt: new Date() },
      });

      return message;
    });
  }

  async findAll(conversationId: string, query: MessageQueryDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 50;

    const conversation = await this.prisma.conversation.findFirst({
      where: {
        id: conversationId,
        deletedAt: null,
      },
      select: {
        id: true,
      },
    });

    if (!conversation) {
      throw new NotFoundException(`Conversation with ID ${conversationId} not found`);
    }

    const where = { conversationId };

    const [items, total] = await Promise.all([
      this.prisma.message.findMany({ where, orderBy: { createdAt: 'asc' }, skip: (page - 1) * limit, take: limit }),
      this.prisma.message.count({ where }),
    ]);

    return { items, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async findOne(conversationId: string, messageId: string) {
    const message = await this.prisma.message.findFirst({
      where: { id: messageId, conversationId, conversation: { deletedAt: null } },
    });

    if (!message) {
      throw new NotFoundException(`Message with ID ${messageId} not found`);
    }

    return message;
  }
}
