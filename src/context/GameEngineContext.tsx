import { createContext, useCallback, useMemo, useReducer } from 'react';
import {
  ActionType,
  GameEngineContextProps,
  GameEngineContextProviderProps,
  GameEngineState,
  GameStatus
} from '@/types/gameEngineContext';

const initialState: GameEngineState = {
  status: GameStatus.NOT_STARTED,
  duration: 5 * 1000,
  attempts: null,
  hits: null,
  errors: null,
  history: null
};

function reducer(
  state: GameEngineState,
  action: { type: ActionType; payload?: { attempts: number; hits: number; errors: number; history: null } }
): GameEngineState {
  switch (action.type) {
    case ActionType.STARTING_GAME:
      return {
        ...state,
        status: GameStatus.STARTING
      };
    case ActionType.START_GAME:
      return {
        ...state,
        status: GameStatus.STARTED
      };
    case ActionType.STOP_GAME:
      return {
        ...state,
        status: GameStatus.FINISHED
      };
    default:
      throw Error('Unknown action.');
  }
}

export const GameEngineContext = createContext<GameEngineContextProps>({} as GameEngineContextProps);

export function GameEngineContextProvider({ children }: GameEngineContextProviderProps) {
  const [gameState, dispatch] = useReducer(reducer, initialState);

  const handleStartGame = useCallback(() => {
    dispatch({
      type: ActionType.STARTING_GAME
    });

    setTimeout(() => {
      dispatch({
        type: ActionType.START_GAME
      });

      setTimeout(() => {
        dispatch({
          type: ActionType.STOP_GAME
        });
      }, gameState.duration);
    }, 3000);
  }, [gameState]);

  const gameEngineMemo = useMemo(
    () => ({
      gameState,
      handleStartGame
    }),
    [gameState, handleStartGame]
  );

  return <GameEngineContext.Provider value={gameEngineMemo}>{children}</GameEngineContext.Provider>;
}
