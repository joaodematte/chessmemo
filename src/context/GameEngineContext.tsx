import { createContext, useCallback, useMemo, useReducer, useState } from 'react';
import {
  ActionType,
  GameEngineContextProps,
  GameEngineContextProviderProps,
  GameEngineState,
  GameStatus
} from '@/types/gameEngineContext';
import { BOARD } from '@/lib/board';
import { randomIntFromInterval } from '@/lib/utils';

const initialState: GameEngineState = {
  status: GameStatus.NOT_STARTED,
  duration: 1000 * 2,
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
  const [target, setTarget] = useState<string>('');
  const [beforePosition, setBeforePosition] = useState<string>('');

  const getToClick = useCallback((): string => {
    const word = BOARD.alphabet[randomIntFromInterval(0, BOARD.alphabet.length - 1)];
    const number = BOARD.numbers[randomIntFromInterval(0, BOARD.numbers.length - 1)];
    const temptTarget = `${word}${number}`;

    return beforePosition === temptTarget ? getToClick() : temptTarget;
  }, [beforePosition]);

  const handleHit = useCallback(
    (guess: string) => {
      if (guess === target) {
        setBeforePosition(target);
        setTarget(getToClick());

        return true;
      }

      return false;
    },
    [getToClick, target]
  );

  const handleStartGame = useCallback(() => {
    dispatch({
      type: ActionType.STARTING_GAME
    });

    setTarget(getToClick());

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
  }, [gameState.duration, getToClick]);

  const gameEngineMemo = useMemo(
    () => ({
      gameState,
      handleStartGame,
      target,
      handleHit,
      previousTarget: beforePosition
    }),
    [gameState, handleHit, handleStartGame, target, beforePosition]
  );

  return <GameEngineContext.Provider value={gameEngineMemo}>{children}</GameEngineContext.Provider>;
}
