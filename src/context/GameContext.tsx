/* eslint-disable react-hooks/exhaustive-deps */

import { createContext, useMemo, useState } from 'react';
import { useTheme } from 'next-themes';
import { GameSettingsContextProps, GameContextProviderProps, GameSettings } from '@/types/context';

export const GameSettingsContext = createContext<GameSettingsContextProps>({} as GameSettingsContextProps);

const cachedSettings = localStorage.getItem('chessmemo-settings');
const parsedSettings = cachedSettings ? (JSON.parse(cachedSettings) as GameSettings) : null;
const defaultSettings = parsedSettings ?? {
  siteTheme: 'system',
  showCoordinates: false,
  boardTheme: 'blue',
  timer: 10000
};

export function GameSettingsContextProvider({ children }: GameContextProviderProps) {
  const { setTheme } = useTheme();

  const [gameSettings, setGameSettings] = useState<GameSettings>(defaultSettings);

  const saveSettings = (settings: GameSettings) => {
    setTheme(settings.siteTheme);
    setGameSettings(settings);

    localStorage.setItem('chessmemo-settings', JSON.stringify(settings));
  };

  const gameSettingsMemo = useMemo(
    () => ({
      gameSettings,
      saveSettings
    }),
    [gameSettings, saveSettings]
  );

  return <GameSettingsContext.Provider value={gameSettingsMemo}>{children}</GameSettingsContext.Provider>;
}
