import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './filter/http-axception.filter';
import { ConfigService } from '@nestjs/config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter())

  const config = app.get(ConfigService)
  const port = config.getOrThrow<number>('app.port')
  const host = config.getOrThrow<string>('app.host')

  const swagger = new DocumentBuilder()
  .setTitle('GCI')
  .setDescription('The user API description')
  .setVersion('1.0')
  .build();
const document = SwaggerModule.createDocument(app, swagger);
SwaggerModule.setup('api', app, document);
  await app.listen(port, host);
}
bootstrap();
