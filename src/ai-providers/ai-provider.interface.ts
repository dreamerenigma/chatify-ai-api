export interface AIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AIModelOptions {
  model: string;
  temperature?: number;
  maxTokens?: number;
}

export interface AIResponse {
  content: string;
  model: string;
  provider: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface AIProviderInterface {
  readonly providerName: string;
  
  generate(messages: AIMessage[], options: AIModelOptions): Promise<AIResponse>;
  stream(messages: AIMessage[], options: AIModelOptions): AsyncIterable<string>;
  isAvailable(): Promise<boolean>;
}
