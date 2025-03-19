import { ApiProperty } from '@nestjs/swagger';

export class EnrollmentResponseDto {
    @ApiProperty({ example: "enrollment-uuid", description: "Enrollment ID" })
    id: string;

    @ApiProperty({ example: "user-uuid", description: "User ID who enrolled" })
    userId: string;

    @ApiProperty({ example: "course-uuid", description: "Course ID" })
    courseId: string;

    @ApiProperty({ example: "2024-03-01T12:00:00Z", description: "Enrollment created date" })
    createdAt: Date;
}
