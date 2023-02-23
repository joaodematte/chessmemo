import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { useTheme } from 'next-themes';
import { GameSettingsContextProps, GameContextProviderProps, GameSettings } from '@/types/gameSettingsContext';

export const GameSettingsContext = createContext<GameSettingsContextProps>({} as GameSettingsContextProps);

const defaultSettings: GameSettings = {
  viewAs: 'white',
  siteTheme: 'system',
  showCoordinates: false,
  boardTheme: 'blue',
  timer: 10000
};

export function GameSettingsContextProvider({ children }: GameContextProviderProps) {
  const { setTheme } = useTheme();

  const [isLoadingSettings, setIsLoadingSettings] = useState<boolean>(true);
  const [gameSettings, setGameSettings] = useState<GameSettings>(defaultSettings);

  const saveSettings = useCallback(
    (settings: GameSettings) => {
      setTheme(settings.siteTheme);
      setGameSettings(settings);

      localStorage.setItem('chessmemo-settings', JSON.stringify(settings));
    },
    [setTheme]
  );

  useEffect(() => {
    const cachedSettings: GameSettings | null = JSON.parse(localStorage.getItem('chessmemo-settings') as string);

    if (cachedSettings) {
      setGameSettings(cachedSettings);
    }

    setIsLoadingSettings(false);

    return () => setIsLoadingSettings(true);
  }, []);

  const gameSettingsMemo = useMemo(
    () => ({
      gameSettings,
      saveSettings,
      isLoadingSettings
    }),
    [gameSettings, isLoadingSettings, saveSettings]
  );

  return <GameSettingsContext.Provider value={gameSettingsMemo}>{children}</GameSettingsContext.Provider>;
}
