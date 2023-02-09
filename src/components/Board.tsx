import { BoardProps } from '@/types/board';
import BoardSquare from './BoardSquare';

const BOARD: BoardProps = {
  alphabet: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
  numbers: [1, 2, 3, 4, 5, 6, 7, 8]
};

export default function Board() {
  return (
    <div id="board" className="grid grid-cols-8 grid-rows-8">
      {BOARD.alphabet
        .reverse()
        .map((word, index) =>
          BOARD.numbers.map((number) => (
            <BoardSquare key={`${word}${number}`} word={word} number={number} even={index % 2 === 0} />
          ))
        )}
    </div>
  );
}
