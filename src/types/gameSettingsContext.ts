export type SiteTheme = 'system' | 'dark' | 'light';
export type BoardTheme = 'blue' | 'green';
export type ViewAs = 'white' | 'black';

export interface GameSettings {
  viewAs: ViewAs;
  siteTheme: SiteTheme;
  showCoordinates: boolean;
  boardTheme: BoardTheme;
  timer: number;
}

export interface GameContextProviderProps {
  children: React.ReactNode;
}

export interface GameSettingsContextProps {
  gameSettings: GameSettings;
  saveSettings: (settings: GameSettings) => void;
  isLoadingSettings: boolean;
}
