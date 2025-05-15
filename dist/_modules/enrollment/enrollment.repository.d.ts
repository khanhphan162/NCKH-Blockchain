import { PrismaService } from '../../prisma/prisma.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
export declare class EnrollmentRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createEnrollment(data: CreateEnrollmentDto): Promise<{
        id: string;
        userId: string;
        courseId: string;
        createdAt: Date;
    }>;
    getAllEnrollments(): Promise<{
        id: string;
        userId: string;
        courseId: string;
        createdAt: Date;
    }[]>;
    getEnrollmentById(id: string): Promise<{
        id: string;
        userId: string;
        courseId: string;
        createdAt: Date;
    } | null>;
    deleteEnrollment(id: string): Promise<{
        id: string;
        userId: string;
        courseId: string;
        createdAt: Date;
    }>;
}
