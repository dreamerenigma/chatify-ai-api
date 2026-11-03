-- CreateEnum
CREATE TYPE "MessageRole" AS ENUM ('SYSTEM', 'USER', 'ASSISTANT', 'TOOL');

-- CreateEnum
CREATE TYPE "MessageStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "messages" (
    "id" UUID NOT NULL,
    "conversationId" UUID NOT NULL,
    "role" "MessageRole" NOT NULL,
    "status" "MessageStatus" NOT NULL DEFAULT 'COMPLETED',
    "content" TEXT NOT NULL,
    "model" VARCHAR(100),
    "provider" VARCHAR(100),
    "promptTokens" INTEGER,
    "completionTokens" INTEGER,
    "metadata" JSONB,
    "error" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "messages_conversationId_createdAt_idx" ON "messages"("conversationId", "createdAt");

-- CreateIndex
CREATE INDEX "messages_conversationId_role_idx" ON "messages"("conversationId", "role");

-- CreateIndex
CREATE INDEX "messages_status_createdAt_idx" ON "messages"("status", "createdAt");

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "conversations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
