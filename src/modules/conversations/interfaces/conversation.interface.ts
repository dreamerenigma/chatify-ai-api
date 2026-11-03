import type { ConversationStatus } from '../enums/conversation-status.enum.js';

export interface ConversationMetadata {
  [key: string]: unknown;
}

export interface CreateConversationData {
  title?: string;
  metadata?: ConversationMetadata;
}

export interface UpdateConversationData {
  title?: string;
  status?: ConversationStatus;
}
