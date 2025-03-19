import { Injectable, NotFoundException } from '@nestjs/common';
import { EnrollmentRepository } from './enrollment.repository';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';

@Injectable()
export class EnrollmentService {
    constructor(private readonly enrollmentRepository: EnrollmentRepository) { }

    async createEnrollment(createEnrollmentDto: CreateEnrollmentDto) {
        return this.enrollmentRepository.createEnrollment(createEnrollmentDto);
    }

    async getAllEnrollments() {
        return this.enrollmentRepository.getAllEnrollments();
    }

    async getEnrollmentById(id: string) {
        const enrollment = await this.enrollmentRepository.getEnrollmentById(id);
        if (!enrollment) {
            throw new NotFoundException(`Enrollment with ID ${id} not found`);
        }
        return enrollment;
    }

    async deleteEnrollment(id: string) {
        await this.getEnrollmentById(id);
        return this.enrollmentRepository.deleteEnrollment(id);
    }
}
