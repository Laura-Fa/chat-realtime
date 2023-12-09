import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { OpenaiService } from '../openai/openai.service';

interface IMessage {
  username: string;
  content: string;
  timeSent: string;
  translation: string;
  informationVerification: string;
}

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private openaiService: OpenaiService) {}

  @WebSocketServer()
  server: Socket;

  clients: { client: Socket; username?: string; language: string }[] = [];
  chatMessages: IMessage[] = [];

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    this.server.emit('message', payload);
    console.log({ payload });
    return 'Hello world!';
  }

  @SubscribeMessage('chat-message')
   handleChatMessage(client: any, payload: IMessage){
    const c = this.clients.find((c) => c.client.id === client.id);
  
    if (c.username) {
      this.chatMessages.push({
        ...payload,
        username: c.username,
      });

      const messagesHistory = this.chatMessages.map(message => {
        return {
          role: 'user',
          content: `User "${message.username}": ${message.content}`
        };
       });

      this.clients.forEach(async (client) => {
        if(client.username != undefined){
          try{
            // Ne pas traduire pour le client qui a envoye le message, ni pour ceux qui n'ont pas choisi de langue de traduction
            let translatedMessage = client.username != c.username && client.language != "" ? await this.openaiService.translateMessage(payload.content, client.language) : "";
            client.client.emit('chat-message', {
              ...payload,
              username: c.username,
              translation: translatedMessage,
          });
          } catch (error){
            client.client.emit('chat-message', {
              ...payload,
              username: c.username,
              translation: "Translation error",
            });
          }

          try{
            let answers = [];
            for (let i = 0; i < 2; i++) {
              answers.push( await this.openaiService.suggestAnswers(messagesHistory, client.username));
            }
            client.client.emit('suggested-answers', {
              ...answers
            });
          } catch (error){
            client.client.emit('suggested-answers', {
            ...["Error when suggesting answers"]
            });
          }
      }

      });

    }
  }

  @SubscribeMessage('verify-information')
  handleVerifyInformation(client: any, payload: any) {
    if( payload.message.content != null && payload.message.content != undefined){
      this.openaiService.verifyInformation(payload.message.content)
      .then(verifiedInformation => {
       this.server.emit('verify-information', {
          ...payload.message,
          informationVerification: verifiedInformation
        }); 
      }).catch(error => {
        this.server.emit('verify-information', {
          ...payload.message,
          informationVerification: "Error during verification"
        }); 
      })
    }
  }

  @SubscribeMessage('username-set')
  handleUsernameSet(client: any, payload: any): void {
    const c = this.clients.find((c) => c.client.id === client.id);
    if (c) {
      c.username = payload.username;
    }
  }

  @SubscribeMessage('language-set')
  handleLanguagenameSet(client: any, payload: any): void {
    const c = this.clients.find((c) => c.client.id === client.id);
    if (c) {
      c.language = payload.language;
    }
  }

  handleConnection(client: Socket) {
    console.log('client connected ', client.id);
    const language = "";
    this.clients.push({
      client,
      language,
    });
    client.emit('messages-old', this.chatMessages);
  }

  handleDisconnect(client: any) {
    console.log('client disconnected ', client.id);
    this.clients = this.clients.filter((c) => c.client.id !== client.id);
  }

}
