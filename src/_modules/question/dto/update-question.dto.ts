import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateQuestionDto {
  @ApiPropertyOptional({ example: "Updated Question", description: "Updated question text" })
  @IsOptional()
  @IsString()
  text?: string;
}
