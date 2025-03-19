import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';

export class CreateSubmissionDto {
  @ApiProperty({ example: "user-uuid", description: "User ID" })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({ example: "quiz-uuid", description: "Quiz ID" })
  @IsNotEmpty()
  @IsString()
  quizId: string;

  @ApiProperty({ example: 85, description: "Score obtained in the quiz" })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  score: number;
}
