import { atom } from 'jotai';
import { GameSettings } from '@/types/gameSettings';

const LOCAL_STORAGE_KEY = 'chessmemo-settings';

const defaultSettings: GameSettings = {
  viewAs: 'white',
  siteTheme: 'system',
  showCoordinates: false,
  boardTheme: 'blue',
  timer: 10000
};

const atomWithLocalStorage = (key: string, initialValue: GameSettings) => {
  const getInitialValue = () => {
    const item = localStorage.getItem(key);

    if (item !== null) {
      return JSON.parse(item);
    }

    return initialValue;
  };

  const baseAtom = atom(getInitialValue());

  const derivedAtom = atom(
    (get) => get(baseAtom),
    (get, set, update) => {
      const nextValue = typeof update === 'function' ? update(get(baseAtom)) : update;

      set(baseAtom, nextValue);

      localStorage.setItem(key, JSON.stringify(nextValue));
    }
  );

  return derivedAtom;
};
export const gameSettingsDerivedAtom = atomWithLocalStorage(LOCAL_STORAGE_KEY, defaultSettings);
