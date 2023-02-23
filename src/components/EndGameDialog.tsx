import { useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Confetti from 'react-confetti';
import { GameEngineContext } from '@/context/GameEngineContext';
import { GameStatus } from '@/types/gameEngineContext';
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

// const TempConfetti = ({ running }: { running: boolean }) =>
//   createPortal(<Confetti numberOfPieces={0} run={running} />, document.body);

export default function EndGameDialog() {
  const { gameState } = useContext(GameEngineContext);
  const [open, setOpen] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleOpenChange = (value: boolean) => {
    setOpen(value);
    setConfetti(value);
  };

  useEffect(() => {
    if (gameState.status === GameStatus.FINISHED) {
      buttonRef.current?.click();
    }
  }, [gameState.status]);

  return (
    <>
      <Confetti numberOfPieces={confetti ? 400 : 0} />
      <Dialog open={open} onOpenChange={handleOpenChange}>
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
          <DialogFooter>
            <Button onClick={() => handleOpenChange(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
