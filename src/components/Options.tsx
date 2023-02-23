'use client';

import { SetStateAction, useContext, useState } from 'react';
import { GameSettingsContext } from '@/context/GameSettingsContext';
import { BoardTheme, SiteTheme, ViewAs } from '@/types/gameSettingsContext';
import { Button } from './ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './ui/Dialog';
import { Label } from './ui/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/Select';
import { Switch } from './ui/Switch';

interface SiteThemeSelectorProps {
  defaultValue: SiteTheme;
  setSiteTheme: React.Dispatch<SetStateAction<SiteTheme>>;
}

interface BoardThemeSelectorProps {
  defaultValue: BoardTheme;
  setBoardTheme: React.Dispatch<SetStateAction<BoardTheme>>;
}

interface ViewAsSelectorProps {
  defaultValue: ViewAs;
  setViewAs: React.Dispatch<SetStateAction<ViewAs>>;
}

function SiteThemeSelector({ defaultValue, setSiteTheme }: SiteThemeSelectorProps) {
  const handleValueChange = (value: string) => {
    setSiteTheme(value as SiteTheme);
  };

  return (
    <Select defaultValue={defaultValue} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a site theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="system">System</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="light">Light</SelectItem>
      </SelectContent>
    </Select>
  );
}

function BoardThemeSelector({ defaultValue, setBoardTheme }: BoardThemeSelectorProps) {
  const handleValueChange = (value: string) => {
    setBoardTheme(value as BoardTheme);
  };

  return (
    <Select defaultValue={defaultValue} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a board theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="blue">Blue</SelectItem>
        <SelectItem value="green">Green</SelectItem>
      </SelectContent>
    </Select>
  );
}

function ViewAsSelector({ defaultValue, setViewAs }: ViewAsSelectorProps) {
  const handleValueChange = (value: string) => {
    setViewAs(value as ViewAs);
  };

  return (
    <Select defaultValue={defaultValue} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a view as" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="white">White</SelectItem>
        <SelectItem value="black">Black</SelectItem>
      </SelectContent>
    </Select>
  );
}

export default function OptionsButton() {
  const { gameSettings, saveSettings } = useContext(GameSettingsContext);

  const [viewAs, setViewAs] = useState<ViewAs>(gameSettings.viewAs);
  const [siteTheme, setSiteTheme] = useState<SiteTheme>(gameSettings.siteTheme);
  const [boardTheme, setBoardTheme] = useState<BoardTheme>(gameSettings.boardTheme);
  const [showCoordinates, setShowCoordinates] = useState<boolean>(gameSettings.showCoordinates);

  const onSaveSettings = () => {
    const data = {
      viewAs,
      siteTheme,
      boardTheme,
      showCoordinates,
      timer: 10000
    };

    saveSettings(data);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="subtle" className="absolute top-2 right-2 font-bold">
          options
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Game Settings</DialogTitle>
          <DialogDescription>All your settings are gonna be persisted.</DialogDescription>
        </DialogHeader>
        <div id="formSettings" className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="viewAs">View as</Label>
            <ViewAsSelector defaultValue={viewAs} setViewAs={setViewAs} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="siteTheme">Site theme</Label>
            <SiteThemeSelector defaultValue={siteTheme} setSiteTheme={setSiteTheme} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="boardTheme">Board theme</Label>
            <BoardThemeSelector defaultValue={boardTheme} setBoardTheme={setBoardTheme} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="showCoordinates">Show coordinates</Label>
            <Switch
              id="showCoordinates"
              defaultChecked={showCoordinates}
              onCheckedChange={(checked) => setShowCoordinates(checked)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => onSaveSettings()}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
