'use client';

import clsx from 'clsx';
import { useContext, useState } from 'react';
import { useAtom } from 'jotai';
import { BoardSquareProps } from '@/types/board';
import { GameEngineContext } from '@/context/GameEngineContext';
import { GameStatus } from '@/types/gameEngineContext';
import { gameSettingsDerivedAtom } from '@/stores/gameSettings';

const COLOR_SCHEMES = {
  blue: {
    light: 'bg-[#eaead2]',
    dark: 'bg-[#4b7399]'
  },
  green: {
    light: 'bg-[#eeedd3]',
    dark: 'bg-[#779558]'
  }
};

export default function BoardSquare({ word, number, even }: BoardSquareProps) {
  const [gameSettings] = useAtom(gameSettingsDerivedAtom);

  const [clicked, setClicked] = useState<boolean>(false);

  const { gameState } = useContext(GameEngineContext);

  const className = clsx(
    'relative h-full w-12 h-12 sm:w-20 sm:h-20 md:w-24 md:h-24 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:z-10 transition-colors duration-300',
    {
      [COLOR_SCHEMES[gameSettings.boardTheme].light]: (!even && number % 2 === 0) || (even && number % 2 !== 0),
      [COLOR_SCHEMES[gameSettings.boardTheme].dark]: (even && number % 2 === 0) || (!even && number % 2 !== 0),
      'bg-red-500 focus:ring-red-500 transition-none': clicked && `${word}${number}` !== 'a1',
      'bg-green-500 focus:ring-green-500 transition-none': clicked && `${word}${number}` === 'a1'
    }
  );

  const handleOnClick = () => {
    if (gameState.status !== GameStatus.STARTED) return;

    setClicked(true);

    setTimeout(() => {
      setClicked(false);
    }, 1000);
  };

  return (
    <button
      id={`${word}${number}`}
      aria-label={`${word}${number}`}
      type="button"
      className={className}
      onClick={handleOnClick}
    >
      {gameSettings.showCoordinates ? (
        <span className="absolute top-2 left-2 text-sm font-medium text-black opacity-25">{`${word}${number}`}</span>
      ) : null}
    </button>
  );
}
