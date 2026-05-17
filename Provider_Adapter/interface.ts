export interface Provider {
  call(prompt: string): Promise<{ output: string; tokens: number }>;
}