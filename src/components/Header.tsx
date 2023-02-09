import { Button } from './ui/Button';

export default function Header() {
  return (
    <header className="flex h-full flex-col items-center justify-center p-4 text-center">
      <h1 className="text-2xl font-black">chessmemo</h1>
      <p className="font-medium">a simple application to help you memorize the chess board coordinates!</p>
      <Button variant="subtle" className="mt-4 font-bold">
        start
      </Button>
    </header>
  );
}
