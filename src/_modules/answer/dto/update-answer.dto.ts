import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateAnswerDto {
  @ApiPropertyOptional({ example: "Updated Answer", description: "Updated answer text" })
  @IsOptional()
  @IsString()
  text?: string;

  @ApiPropertyOptional({ example: false, description: "Updated correctness of the answer" })
  @IsOptional()
  @IsBoolean()
  isCorrect?: boolean;
}
