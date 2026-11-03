import {
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @MinLength(1)
  @MaxLength(100_000)
  content!: string;
}
