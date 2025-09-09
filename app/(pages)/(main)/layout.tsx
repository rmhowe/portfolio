import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-col justify-center max-w-4xl mx-auto px-8 my-10 text-white">
      {children}
    </main>
  );
}
