export enum GameStatus {
  NOT_STARTED = 'NOT_STARTED',
  STARTING = 'STARTING',
  STARTED = 'STARTED',
  FINISHED = 'FINISHED'
}

export enum ActionType {
  START_GAME = 'START_GAME',
  STARTING_GAME = 'STARTING_GAME',
  STOP_GAME = 'STOP_GAME',
  INCREASE_ATTEMPTS = 'INCREASE_ATTEMPTS',
  INCREASE_HITS = 'INCREASE_HITS'
}

export interface GameEngineState {
  status: GameStatus;
  duration: number;
  attempts: number;
  hits: number;
}

export interface GameEngineContextProps {
  handleStartGame: () => void;
  gameState: GameEngineState;
  target: string;
  previousTarget: string;
  handleHit: (guess: string) => boolean;
}

export interface GameEngineContextProviderProps {
  children: React.ReactElement;
}
