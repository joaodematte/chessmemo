import { useContext, useEffect, useRef, useState } from 'react';
import Confetti from 'react-confetti';
import { GameEngineContext } from '@/context/GameEngineContext';
import { GameStatus } from '@/types/gameEngineContext';
import useWindowSize from '@/hooks/useWindowSize';
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

export default function EndGameDialog() {
  const { height, width } = useWindowSize();
  const { gameState } = useContext(GameEngineContext);
  const [open, setOpen] = useState(false);

  const precision = ((gameState.hits / gameState.attempts) * 100).toFixed(2);

  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (gameState.status === GameStatus.FINISHED) {
      buttonRef.current?.click();
    }
  }, [gameState.status]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Confetti height={height} width={width} numberOfPieces={open ? 400 : 0} />
      <DialogTrigger asChild>
        <Button ref={buttonRef} type="submit" className="hidden">
          end game dialog
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Game ended</DialogTitle>
          <DialogDescription>These is the stats that you achieved for the performance:</DialogDescription>
        </DialogHeader>
        <div className="text-base font-semibold text-slate-900 dark:text-slate-50">
          <p>Hits: {gameState.hits}</p>
          <p>Attempts: {gameState.attempts}</p>
          <p>Precision: {precision}%</p>
        </div>
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
