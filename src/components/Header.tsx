import { useContext } from 'react';
import { GameEngineContext } from '@/context/GameEngineContext';
import { GameStatus } from '@/types/gameEngineContext';
import { Button } from './ui/Button';

function HeaderContent() {
  const { handleStartGame, gameState, target } = useContext(GameEngineContext);

  if (gameState.status === GameStatus.STARTING) return <p className="font-medium">starting...</p>;

  if (gameState.status === GameStatus.STARTED)
    return (
      <>
        <p className="font-medium">click on</p>
        <h1 className="text-4xl font-black">{target}</h1>
      </>
    );

  return (
    <>
      <h1 className="text-2xl font-black">chessmemo</h1>
      <p className="font-medium">a simple application to help you memorize the chess board coordinates!</p>
      <Button variant="subtle" className="mt-4 font-bold" onClick={handleStartGame}>
        start
      </Button>
    </>
  );
}

export default function Header() {
  return (
    <header className="flex h-full flex-col items-center justify-center p-4 text-center">
      <HeaderContent />
    </header>
  );
}
