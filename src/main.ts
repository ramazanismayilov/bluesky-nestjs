import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Request, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use('/', (req: Request, res: Response) => res.send('Bluesky'))
  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('Bluesky Project')
    .setDescription('The bluesky description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory, {
    swaggerOptions: {
      persistAuthorization: true
    }
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
