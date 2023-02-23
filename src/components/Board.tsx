import { useContext } from 'react';
import { GameSettingsContext } from '@/context/GameSettingsContext';
import { BOARD } from '@/lib/board';
import BoardSquare from './BoardSquare';

export default function Board() {
  const { gameSettings } = useContext(GameSettingsContext);

  const parsedAlphabet = gameSettings.viewAs === 'black' ? BOARD.alphabet : [...BOARD.alphabet].reverse();

  return (
    <div id="board" className="grid grid-cols-8 grid-rows-8 border-4 border-slate-800 dark:border-slate-200">
      {parsedAlphabet.map((word, index) =>
        BOARD.numbers.map((number) => (
          <BoardSquare key={`${word}${number}`} value={`${word}${number}`} number={number} even={index % 2 === 0} />
        ))
      )}
    </div>
  );
}
