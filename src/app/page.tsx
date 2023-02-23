'use client';

import { ThemeProvider } from 'next-themes';
import { useContext } from 'react';
import Board from '@/components/Board';
import Header from '@/components/Header';
import OptionsButton from '@/components/Options';
import { GameSettingsContext, GameSettingsContextProvider } from '@/context/GameSettingsContext';
import { GameEngineContextProvider } from '@/context/GameEngineContext';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

function LoadingWrapper() {
  const { isLoadingSettings } = useContext(GameSettingsContext);

  if (isLoadingSettings) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <OptionsButton />
      <Header />
      <Board />
    </>
  );
}

export default function Home() {
  return (
    <main className="relative flex h-full w-full flex-col items-center justify-between">
      <ThemeProvider attribute="class">
        <GameSettingsContextProvider>
          <GameEngineContextProvider>
            <LoadingWrapper />
          </GameEngineContextProvider>
        </GameSettingsContextProvider>
      </ThemeProvider>
    </main>
  );
}
