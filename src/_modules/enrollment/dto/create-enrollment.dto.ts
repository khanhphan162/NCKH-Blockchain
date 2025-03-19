import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEnrollmentDto {
    @ApiProperty({ example: "user-uuid", description: "User ID who enrolls in the course" })
    @IsNotEmpty()
    @IsString()
    userId: string;

    @ApiProperty({ example: "course-uuid", description: "Course ID to enroll in" })
    @IsNotEmpty()
    @IsString()
    courseId: string;
}
