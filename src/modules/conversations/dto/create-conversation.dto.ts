import { IsObject, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateConversationDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  title?: string;
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}
