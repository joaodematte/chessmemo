'use client';

import { ThemeProvider } from 'next-themes';
import Board from '@/components/Board';
import Header from '@/components/Header';
import OptionsButton from '@/components/Options';
import { GameEngineContextProvider } from '@/context/GameEngineContext';

export default function Home() {
  return (
    <ThemeProvider attribute="class">
      <GameEngineContextProvider>
        <main className="relative flex h-full w-full flex-col items-center justify-between">
          <OptionsButton />
          <Header />
          <Board />
        </main>
      </GameEngineContextProvider>
    </ThemeProvider>
  );
}
