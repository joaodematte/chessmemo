'use client';

import { BoardSquareProps } from '@/types/board';
import clsx from 'clsx';

export default function BoardSquare({ word, number, even }: BoardSquareProps) {
  const className = clsx({
    'h-24 w-24 bg-[#eaead2]': (!even && number % 2 === 0) || (even && number % 2 !== 0),
    'h-24 w-24 bg-[#4b7399]': (even && number % 2 === 0) || (!even && number % 2 !== 0)
  });

  return (
    <button
      id={`${word}${number}`}
      aria-label={`${word}${number}`}
      type="button"
      className={className}
      onClick={() => console.log(`${word}${number}`)}
    />
  );
}
