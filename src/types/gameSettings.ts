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
