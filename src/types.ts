export type Language = 'fr' | 'en';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export type Tab = 'home' | 'expertise' | 'solutions' | 'values' | 'contact';

export interface Expert {
  name: string;
  title: string;
  specialty: string;
  image: string;
}

export interface InnovationSolution {
  title: string;
  description: string;
  features: string[];
}
