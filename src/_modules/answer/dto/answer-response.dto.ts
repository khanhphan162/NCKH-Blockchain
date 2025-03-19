import { ApiProperty } from '@nestjs/swagger';

export class AnswerResponseDto {
  @ApiProperty({ example: "answer-uuid", description: "Answer ID" })
  id: string;

  @ApiProperty({ example: "NestJS is a framework", description: "Answer text" })
  text: string;

  @ApiProperty({ example: true, description: "Indicates if the answer is correct" })
  isCorrect: boolean;

  @ApiProperty({ example: "question-uuid", description: "Question ID associated with the answer" })
  questionId: string;
}
