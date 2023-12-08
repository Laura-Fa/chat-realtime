import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { OpenaiService } from '../openai/openai.service';

@Module({
  providers: [ChatGateway, OpenaiService],
})
export class ChatModule {}
