import { createContext, useState } from 'react';
import { PuzzleSelect } from './PuzzleSelect';
import { Puzzle } from './Puzzle';

export type TPuzzle = {
  rows: number[][];
  columns: number[][];
  solution: number[][][];
};
type TPuzzleContext = {
  puzzleNumber?: number;
  setPuzzleNumber: (n?: number) => void;
  puzzleDetails?: TPuzzle;
  setPuzzleDetails: (d?: TPuzzle) => void;
  themeColor: string;
};
export const PuzzleContext = createContext<TPuzzleContext>({
  setPuzzleNumber: () => {},
  setPuzzleDetails: () => {},
  themeColor: '',
});

export function Picross() {
  const [puzzleNumber, setPuzzleNumber] = useState<number>();
  const [puzzleDetails, setPuzzleDetails] = useState<TPuzzle>();
  const [themeColor, setThemeColor] = useState('blue-500');

  return (
    <PuzzleContext.Provider
      value={{
        puzzleNumber,
        setPuzzleNumber,
        puzzleDetails,
        setPuzzleDetails,
        themeColor,
      }}
    >
      <div className="w-full min-h-[36rem] rounded-lg bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 p-4">
        {!puzzleNumber && <PuzzleSelect />}
        {puzzleNumber && puzzleDetails && (
          <Puzzle number={puzzleNumber} details={puzzleDetails} />
        )}
      </div>
    </PuzzleContext.Provider>
  );
}
