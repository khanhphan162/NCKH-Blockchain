import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({ example: 'JavaScript Basics' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Learn JavaScript from scratch' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'Image URL' })
  @IsString()
  @IsNotEmpty()
  imageUrl: string;
}
