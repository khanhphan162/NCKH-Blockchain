import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateQuizDto {
  @ApiPropertyOptional({ example: "Updated Quiz Title", description: "Updated title of the quiz" })
  @IsOptional()
  @IsString()
  title?: string;
}
