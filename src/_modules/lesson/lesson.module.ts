import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { LessonRepository } from './lesson.repository';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LessonController],
  providers: [LessonService, LessonRepository],
  exports: [LessonService],
})
export class LessonModule {}
