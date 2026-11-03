import type { MessageRole, MessageStatus } from '../../../generated/prisma/client.js';

export interface MessageMetadata {
  [key: string]: unknown;
}

export interface CreateMessageData {
  conversationId: string;
  role: MessageRole;
  content: string;
  status?: MessageStatus;
  metadata?: MessageMetadata;
}
