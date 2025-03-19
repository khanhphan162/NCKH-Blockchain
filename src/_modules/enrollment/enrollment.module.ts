import { Module } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { EnrollmentController } from './enrollment.controller';
import { EnrollmentRepository } from './enrollment.repository';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [EnrollmentController],
    providers: [EnrollmentService, EnrollmentRepository],
    exports: [EnrollmentService],
})
export class EnrollmentModule { }
