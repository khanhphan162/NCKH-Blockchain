import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateQuizDto {
  @ApiProperty({ example: "Quiz 1", description: "Title of the quiz" })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: "course-uuid", description: "Course ID associated with the quiz" })
  @IsNotEmpty()
  @IsString()
  courseId: string;
}
