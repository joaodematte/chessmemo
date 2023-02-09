'use client';

import clsx from 'clsx';
import { useContext } from 'react';
import { GameSettingsContext } from '@/context/GameContext';
import { BoardSquareProps } from '@/types/board';

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
  const { gameSettings } = useContext(GameSettingsContext);

  const className = clsx(
    'relative h-full w-12 h-12 sm:w-20 sm:h-20 md:w-24 md:h-24 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:z-10',
    {
      [COLOR_SCHEMES[gameSettings.boardTheme].light]: (!even && number % 2 === 0) || (even && number % 2 !== 0),
      [COLOR_SCHEMES[gameSettings.boardTheme].dark]: (even && number % 2 === 0) || (!even && number % 2 !== 0)
    }
  );

  return (
    <button
      id={`${word}${number}`}
      aria-label={`${word}${number}`}
      type="button"
      className={className}
      onClick={() => console.log(`${word}${number}`)}
    >
      {gameSettings.showCoordinates ? (
        <span className="absolute top-2 left-2 font-medium text-black opacity-25">{`${word}${number}`}</span>
      ) : null}
    </button>
  );
}
