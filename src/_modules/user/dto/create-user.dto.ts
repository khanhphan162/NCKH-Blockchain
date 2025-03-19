import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'User full name' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'johndoe@example.com', description: 'User email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'securePassword123', description: 'User password', minLength: 6 })
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'STUDENT', description: 'User role', enum: Role })
  @IsEnum(Role)
  role?: Role = Role.STUDENT;
}
