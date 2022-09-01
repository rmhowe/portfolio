import { useContext } from 'react';
import { PuzzleContext } from '.';
import level1 from '../../data/picross-puzzles/1.json';
import level2 from '../../data/picross-puzzles/2.json';
import level3 from '../../data/picross-puzzles/3.json';
import level4 from '../../data/picross-puzzles/4.json';
import level5 from '../../data/picross-puzzles/5.json';
import level6 from '../../data/picross-puzzles/6.json';
import level7 from '../../data/picross-puzzles/7.json';
import level8 from '../../data/picross-puzzles/8.json';
import level9 from '../../data/picross-puzzles/9.json';
import level10 from '../../data/picross-puzzles/10.json';

export function PuzzleSelect() {
  const { setPuzzleNumber, setPuzzleDetails } = useContext(PuzzleContext);
  const levels = [
    { number: 1, details: level1 },
    { number: 2, details: level2 },
    { number: 3, details: level3 },
    { number: 4, details: level4 },
    { number: 5, details: level5 },
    { number: 6, details: level6 },
    { number: 7, details: level7 },
    { number: 8, details: level8 },
    { number: 9, details: level9 },
    { number: 10, details: level10 },
  ];
  return (
    <div className="mt-10">
      <h2 className="text-xl md:text-3xl text-center mb-6">Picross</h2>
      <p className="text-center">Select a level</p>
      <div className="flex flex-wrap justify-between gap-x-14 gap-y-8 w-full max-w-xs mx-auto my-6">
        {levels.map(({ number, details }) => (
          <div
            key={number}
            className="flex justify-center items-center w-10 h-10 rounded border-2 border-blue-500 hover:bg-blue-500 hover:cursor-pointer transition"
            onClick={() => {
              setPuzzleNumber(number);
              setPuzzleDetails(details);
            }}
          >
            {number}
          </div>
        ))}
      </div>
    </div>
  );
}
