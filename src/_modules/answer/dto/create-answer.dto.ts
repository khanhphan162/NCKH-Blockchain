import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreateAnswerDto {
  @ApiProperty({ example: "NestJS is a framework", description: "Answer text" })
  @IsNotEmpty()
  @IsString()
  text: string;

  @ApiProperty({ example: true, description: "Indicates if the answer is correct" })
  @IsNotEmpty()
  @IsBoolean()
  isCorrect: boolean;

  @ApiProperty({ example: "question-uuid", description: "Question ID associated with the answer" })
  @IsNotEmpty()
  @IsString()
  questionId: string;
}
