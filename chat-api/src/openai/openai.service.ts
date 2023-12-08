import OpenAI from 'openai';

export class OpenaiService {
    openai: OpenAI;
    
    constructor() {
        this.openai = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY,
        });
    }

    async translateMessage(message: string, language: string): Promise<string> {
        const response = await this.openai.chat.completions.create({
          model: process.env.OPENAI_API_MODEL,
          max_tokens: 100,
          messages: [
            {role: 'system', content: 'You are a helpful assistant that translates text.'},
            {role: 'user', content: `Translate the following text to ${language}: ${message}` }],
        });
  
        return response.choices[0].message.content;
      }

    async verifyInformation(information: string): Promise<string> {   
        const response = await this.openai.chat.completions.create({
            model: process.env.OPENAI_API_MODEL,
            max_tokens: 50,
            messages: [
              {role: 'system', content: 'Answer concisely.'},
              {role: 'user', content: `Is the following information true or false? "${information}"` }],
          });

          return response.choices[0].message.content;
    }

}
