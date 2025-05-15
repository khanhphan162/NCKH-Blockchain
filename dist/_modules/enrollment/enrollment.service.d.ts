import { EnrollmentRepository } from './enrollment.repository';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
export declare class EnrollmentService {
    private readonly enrollmentRepository;
    constructor(enrollmentRepository: EnrollmentRepository);
    createEnrollment(createEnrollmentDto: CreateEnrollmentDto): Promise<{
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
    }>;
    deleteEnrollment(id: string): Promise<{
        id: string;
        userId: string;
        courseId: string;
        createdAt: Date;
    }>;
}
