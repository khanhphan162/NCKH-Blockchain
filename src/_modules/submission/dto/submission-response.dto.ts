import { ApiProperty } from '@nestjs/swagger';

export class SubmissionResponseDto {
  @ApiProperty({ example: "submission-uuid", description: "Submission ID" })
  id: string;

  @ApiProperty({ example: "user-uuid", description: "User ID" })
  userId: string;

  @ApiProperty({ example: "quiz-uuid", description: "Quiz ID" })
  quizId: string;

  @ApiProperty({ example: 85, description: "Score obtained in the quiz" })
  score: number;

  @ApiProperty({ example: "2024-03-03T12:34:56Z", description: "Submission timestamp" })
  createdAt: Date;
}
