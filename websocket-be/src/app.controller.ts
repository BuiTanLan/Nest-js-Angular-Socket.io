import { Controller, Get } from '@nestjs/common';
import { Ctx, EventPattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { ChatGateway } from './chat/chat.gateway';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly chatGateway: ChatGateway) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @EventPattern('message_printed')
  async handleMessagePrinted(@Payload() data: any, @Ctx() context: any) {

    this.chatGateway.wss.emit('lan', data);
  }
}
