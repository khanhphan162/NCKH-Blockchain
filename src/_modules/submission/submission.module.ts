import { Module } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { SubmissionController } from './submission.controller';
import { SubmissionRepository } from './submission.repository';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SubmissionController],
  providers: [SubmissionService, SubmissionRepository],
  exports: [SubmissionService],
})
export class SubmissionModule {}
