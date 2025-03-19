import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './_modules/user/user.module'
import { AuthModule } from './_modules/auth/auth.module'
import { CourseModule } from './_modules/course/course.module'
import { LessonModule } from './_modules/lesson/lesson.module';
import { EnrollmentModule } from './_modules/enrollment/enrollment.module'
import { QuizModule } from './_modules/quiz/quiz.module'
import { QuestionModule } from './_modules/question/question.module'
import { AnswerModule } from './_modules/answer/answer.module'
import { SubmissionModule } from './_modules/submission/submission.module'

@Module({
  imports: [UserModule, AuthModule, CourseModule, LessonModule, EnrollmentModule, QuizModule, QuestionModule, AnswerModule, SubmissionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
