import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('E-Learning API')
  .setDescription('API documentation for the E-Learning system')
  .setVersion('1.0')
  .addBearerAuth() 
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 API is running at: http://localhost:3000/api`);
}
bootstrap();
