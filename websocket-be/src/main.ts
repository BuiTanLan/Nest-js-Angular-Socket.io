import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.enableCors({
  //   origin: 'http://localhost:4200',
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  //   credentials: true,
  // });

  const microservice = await app.connectMicroservice( {
    transport: Transport.RMQ,
    options: {
      urls: ['amqps://dyilfhrb:t-D-bfwdLxkRmp-2B-Q26ALBSa1a9rof@gerbil.rmq.cloudamqp.com/dyilfhrb'],
      queue: 'user-messages',
      queueOptions: {
        durable: false,
      },
    },
  });
  await app.startAllMicroservicesAsync();
  await app.listen(3000);

}
bootstrap();