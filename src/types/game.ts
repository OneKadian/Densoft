
export type Character = 'male' | 'female';

export interface LoadingImagesState {
  male: boolean;
  female: boolean;
}

export interface GameState {
  stress: number;
  revenue: number;
  imageLoading: boolean;
}

export interface GameScenario {
  description: string;
  options: string[];
}
