import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLessonDto {
  @ApiProperty({ example: "Lesson 1", description: "Title of the lesson" })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: "Lesson content goes here", description: "Content of the lesson" })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({ example: "course-uuid", description: "Course ID to associate the lesson with" })
  @IsNotEmpty()
  @IsString()
  courseId: string;
}
