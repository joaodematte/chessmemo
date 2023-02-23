import { useContext } from 'react';
import { GameSettingsContext } from '@/context/GameSettingsContext';
import { BoardProps } from '@/types/board';
import BoardSquare from './BoardSquare';

const BOARD: BoardProps = {
  alphabet: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
  numbers: [1, 2, 3, 4, 5, 6, 7, 8]
};

export default function Board() {
  const { gameSettings } = useContext(GameSettingsContext);

  const parsedAlphabet = gameSettings.viewAs === 'black' ? BOARD.alphabet : [...BOARD.alphabet].reverse();

  return (
    <div id="board" className="grid grid-cols-8 grid-rows-8 border-4 border-slate-800 dark:border-slate-200">
      {parsedAlphabet.map((word, index) =>
        BOARD.numbers.map((number) => (
          <BoardSquare key={`${word}${number}`} word={word} number={number} even={index % 2 === 0} />
        ))
      )}
    </div>
  );
}
