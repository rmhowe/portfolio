import { ArrowLeft, Eraser, Pencil, XSquare } from 'phosphor-react';
import {
  Fragment,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { PuzzleContext, TPuzzle } from '.';
import cn from 'classnames';
import confetti from 'canvas-confetti';

type TileState = 'draw' | 'block' | 'clear';
type Tile = { x: number; y: number };

function Control({
  active,
  onClick,
  className,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        className,
        'flex justify-center items-center w-10 h-6 border border-l-0 first:border-l border-blue-500 hover:bg-blue-500',
        { 'bg-blue-500': active }
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export function Puzzle({
  number,
  details,
}: {
  number: number;
  details: TPuzzle;
}) {
  const [storageKey] = useState(`picross-puzzle-${number}`);
  const { setPuzzleNumber, setPuzzleDetails } = useContext(PuzzleContext);
  const [mode, setMode] = useState<TileState>('draw');
  const [mouseCapture, setMouseCapture] = useState(false);
  const { rows, columns, solution } = details;
  const getInitialBoard = () => {
    const tempBoard: TileState[][] = [];
    rows.forEach((row, x) => {
      const tileRow: TileState[] = [];
      columns.forEach((column, y) => {
        tileRow.push('clear');
      });
      tempBoard.push(tileRow);
    });
    return tempBoard;
  };
  const [board, setBoard] = useState<TileState[][]>(getInitialBoard());

  useEffect(() => {
    const disableCapture = () => setMouseCapture(false);
    window.addEventListener('mouseup', disableCapture);
    window.addEventListener('mouseleave', disableCapture);

    const storedBoard = localStorage.getItem(storageKey);
    if (storedBoard) {
      setBoard(JSON.parse(storedBoard));
    }
    return () => {
      window.removeEventListener('mouseup', disableCapture);
      window.removeEventListener('mouseleave', disableCapture);
    };
  }, []);

  const checkSolution = (board: TileState[][]) => {
    let numUserDrawn = 0;
    for (let y = 0; y < rows.length; y++) {
      for (let x = 0; x < columns.length; x++) {
        if (board[x][y] === 'draw') {
          numUserDrawn++;
        }
      }
    }
    let numSolutionDrawn = 0;
    const correctTilesFilled = solution.every((row, y) => {
      return row.every((columns) => {
        for (let x = columns[0]; x <= columns[1]; x++) {
          numSolutionDrawn++;
          if (board[x][y] !== 'draw') {
            return false;
          }
        }
        return true;
      });
    });
    return correctTilesFilled && numUserDrawn === numSolutionDrawn;
  };

  const updateBoard = useCallback(
    (tile: Tile | null) => {
      const updatedBoard: TileState[][] = [];
      rows.forEach((row, x) => {
        const tileRow: TileState[] = [];
        columns.forEach((column, y) => {
          if (x === tile?.x && y === tile?.y) {
            tileRow.push(mode);
          } else {
            tileRow.push(board[x][y]);
          }
        });
        updatedBoard.push(tileRow);
      });
      setBoard(updatedBoard);
      localStorage.setItem(storageKey, JSON.stringify(updatedBoard));
      const solved = checkSolution(updatedBoard);
      if (solved) {
        confetti();
      }
    },
    [board, mode]
  );

  return (
    <div className="flex flex-col items-center mb-10">
      <div className="flex justify-between items-center mb-10 w-full">
        <ArrowLeft
          className="text-2xl hover:cursor-pointer"
          onClick={() => {
            setPuzzleNumber();
            setPuzzleDetails();
          }}
        />
        <h2 className="text-xl md:text-3xl text-center">Level {number}</h2>
      </div>
      <div className="flex flex-col mt-10">
        {rows.map((row, y) => {
          return (
            <div className="flex relative" key={y}>
              <div className="absolute top-0 left-0 -translate-x-full h-full flex items-center gap-2 pr-2">
                {row.map((r, i) => (
                  <span key={i}>{r}</span>
                ))}
              </div>
              {columns.map((column, x) => {
                const tile = (
                  <div
                    key={`${x},${y}`}
                    className={cn(
                      'w-10 h-10 border-t border-l border-blue-500 transition',
                      {
                        'bg-blue-500': board[x][y] === 'draw',
                        'bg-slate-700': board[x][y] === 'block',
                        'bg-none': board[x][y] === 'clear',
                        'border-r': x === columns.length - 1,
                        'border-b': y === rows.length - 1,
                        'hover:bg-blue-500': mode === 'draw',
                        'hover:bg-slate-700': mode === 'block',
                        'hover:bg-none': mode === 'clear',
                      }
                    )}
                    onMouseDown={(event) => {
                      event.preventDefault();
                      setMouseCapture(true);
                      updateBoard({ x, y });
                    }}
                    onMouseOver={() => {
                      if (mouseCapture) {
                        updateBoard({ x, y });
                      }
                    }}
                  ></div>
                );
                return (
                  <Fragment key={x}>
                    {y === 0 && (
                      <div className="relative">
                        <div className="absolute top-0 -translate-y-full flex flex-col w-10 items-center pb-1">
                          {column.map((col, i) => (
                            <span key={i}>{col}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {tile}
                  </Fragment>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="flex mt-6">
        <Control
          active={mode === 'draw'}
          onClick={() => setMode('draw')}
          className="rounded-l-md"
        >
          <Pencil />
        </Control>
        <Control active={mode === 'block'} onClick={() => setMode('block')}>
          <XSquare />
        </Control>
        <Control
          active={mode === 'clear'}
          onClick={() => setMode('clear')}
          className="rounded-r-md"
        >
          <Eraser />
        </Control>
      </div>
    </div>
  );
}
