import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateLessonDto {
  @ApiPropertyOptional({ example: "Updated Lesson Title", description: "Updated title of the lesson" })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: "Updated lesson content", description: "Updated content of the lesson" })
  @IsOptional()
  @IsString()
  content?: string;
}
