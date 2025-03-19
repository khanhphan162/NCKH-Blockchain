import { ApiProperty } from '@nestjs/swagger';

export class QuizResponseDto {
  @ApiProperty({ example: "quiz-uuid", description: "Quiz ID" })
  id: string;

  @ApiProperty({ example: "Quiz 1", description: "Title of the quiz" })
  title: string;

  @ApiProperty({ example: "course-uuid", description: "Course ID associated with the quiz" })
  courseId: string;

  @ApiProperty({ example: "2024-03-01T12:00:00Z", description: "Quiz created date" })
  createdAt: Date;
}
