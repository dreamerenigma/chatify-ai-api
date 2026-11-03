-- CreateEnum
CREATE TYPE "ConversationStatus" AS ENUM ('ACTIVE', 'ARCHIVED');

-- CreateTable
CREATE TABLE "conversations" (
    "id" UUID NOT NULL,
    "userId" UUID,
    "title" VARCHAR(255) NOT NULL DEFAULT 'Новый диалог',
    "status" "ConversationStatus" NOT NULL DEFAULT 'ACTIVE',
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "conversations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "conversations_userId_status_updatedAt_idx" ON "conversations"("userId", "status", "updatedAt");

-- CreateIndex
CREATE INDEX "conversations_deletedAt_idx" ON "conversations"("deletedAt");
