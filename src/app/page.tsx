import BoardSquare from '@/components/BoardSquare';
import { Board, BoardLineProps } from '@/types/board';

const BOARD: Board = {
  alphabet: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
  numbers: [1, 2, 3, 4, 5, 6, 7, 8]
};

function BoardLine({ word, numbers, even }: BoardLineProps) {
  return (
    <div id={word} className="h-24 w-full">
      {numbers.map((number) => (
        <BoardSquare key={`${word}${number}`} word={word} number={number} even={even} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex h-full w-full items-center justify-center">
      <div id="board">
        {BOARD.alphabet.reverse().map((word, index) => (
          <BoardLine key={word} word={word} numbers={BOARD.numbers} even={index % 2 === 0} />
        ))}
      </div>
    </main>
  );
}
