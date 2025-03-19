import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { QuestionRepository } from './question.repository';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [QuestionController],
  providers: [QuestionService, QuestionRepository],
  exports: [QuestionService],
})
export class QuestionModule {}
