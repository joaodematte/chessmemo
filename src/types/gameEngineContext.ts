export enum GameStatus {
  NOT_STARTED = 'NOT_STARTED',
  STARTING = 'STARTING',
  STARTED = 'STARTED',
  FINISHED = 'FINISHED'
}

export enum ActionType {
  START_GAME = 'START_GAME',
  STARTING_GAME = 'STARTING_GAME',
  STOP_GAME = 'STOP_GAME'
}

export interface GameEngineState {
  status: GameStatus;
  duration: number;
  attempts: number | null;
  hits: number | null;
  errors: number | null;
  history: null;
}

export interface GameEngineContextProps {
  handleStartGame: () => void;
  gameState: GameEngineState;
}

export interface GameEngineContextProviderProps {
  children: React.ReactElement;
}
