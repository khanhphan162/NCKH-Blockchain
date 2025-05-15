import { EnrollmentService } from './enrollment.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
export declare class EnrollmentController {
    private readonly enrollmentService;
    constructor(enrollmentService: EnrollmentService);
    create(createEnrollmentDto: CreateEnrollmentDto): Promise<{
        id: string;
        userId: string;
        courseId: string;
        createdAt: Date;
    }>;
    getAll(): Promise<{
        id: string;
        userId: string;
        courseId: string;
        createdAt: Date;
    }[]>;
    getById(id: string): Promise<{
        id: string;
        userId: string;
        courseId: string;
        createdAt: Date;
    }>;
    delete(id: string): Promise<{
        id: string;
        userId: string;
        courseId: string;
        createdAt: Date;
    }>;
}
