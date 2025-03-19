import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';

@Injectable()
export class EnrollmentRepository {
    constructor(private readonly prisma: PrismaService) { }

    async createEnrollment(data: CreateEnrollmentDto) {
        return this.prisma.enrollment.create({ data });
    }

    async getAllEnrollments() {
        return this.prisma.enrollment.findMany();
    }

    async getEnrollmentById(id: string) {
        return this.prisma.enrollment.findUnique({ where: { id } });
    }

    async deleteEnrollment(id: string) {
        return this.prisma.enrollment.delete({ where: { id } });
    }
}
