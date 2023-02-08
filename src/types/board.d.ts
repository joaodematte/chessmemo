type Word = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h';

export interface Board {
  alphabet: string[];
  numbers: number[];
}

export interface BoardLineProps {
  word: string;
  numbers: number[];
  even: boolean;
}

export interface BoardSquareProps {
  word: string;
  number: number;
  even: boolean;
}
