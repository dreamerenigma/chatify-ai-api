import type { ConversationStatus } from '../enums/conversation-status.enum.js';
import type { ConversationMetadata } from '../interfaces/conversation.interface.js';

export class ConversationEntity {
  id!: string;
  userId!: string | null;
  title!: string;
  status!: ConversationStatus;
  metadata!: ConversationMetadata | null;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt!: Date | null;
}
