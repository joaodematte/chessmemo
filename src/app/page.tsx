'use client';

import { ThemeProvider } from 'next-themes';
import Board from '@/components/Board';
import Header from '@/components/Header';
import OptionsButton from '@/components/Options';
import { GameSettingsContextProvider } from '@/context/GameContext';

export default function Home() {
  return (
    <main className="relative flex h-full w-full flex-col items-center justify-between">
      <ThemeProvider attribute="class">
        <GameSettingsContextProvider>
          <OptionsButton />
          <Header />
          <Board />
        </GameSettingsContextProvider>
      </ThemeProvider>
    </main>
  );
}
