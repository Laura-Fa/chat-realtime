import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';
import { OpenaiService } from './openai/openai.service';

@Module({
  imports: [ConfigModule.forRoot(), ChatModule],
  providers: [OpenaiService],
})
export class AppModule {}
