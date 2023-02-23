export type Word = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h';

export interface BoardProps {
  alphabet: string[];
  numbers: number[];
}

export interface BoardSquareProps {
  number: number;
  even: boolean;
  value: string;
}
