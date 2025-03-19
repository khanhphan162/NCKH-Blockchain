import { ApiProperty } from '@nestjs/swagger';

export class QuestionResponseDto {
  @ApiProperty({ example: "question-uuid", description: "Question ID" })
  id: string;

  @ApiProperty({ example: "What is NestJS?", description: "Question text" })
  text: string;

  @ApiProperty({ example: "quiz-uuid", description: "Quiz ID associated with the question" })
  quizId: string;
}
