import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateQuestionDto {
  @ApiProperty({ example: "What is NestJS?", description: "Question text" })
  @IsNotEmpty()
  @IsString()
  text: string;

  @ApiProperty({ example: "quiz-uuid", description: "Quiz ID associated with the question" })
  @IsNotEmpty()
  @IsString()
  quizId: string;
}
