import { ArrowLeft, Eraser, Pencil, XSquare } from 'phosphor-react';
import { Fragment, ReactNode, useCallback, useEffect, useState } from 'react';
import { TPuzzle } from '.';
import cn from 'classnames';

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
        'flex justify-center items-center w-10 h-6 border border-blue-400 hover:bg-blue-400',
        { 'bg-blue-400': active }
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
  const [mode, setMode] = useState<TileState>('draw');
  const [mouseCapture, setMouseCapture] = useState(false);
  const [currentTile, setCurrentTile] = useState<Tile | null>(null);
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
    return () => {
      window.removeEventListener('mouseup', disableCapture);
      window.removeEventListener('mouseleave', disableCapture);
    };
  }, []);

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
    },
    [board, mode]
  );
  const handleMouseMove = useCallback(() => {
    if (!mouseCapture) {
      return;
    }
    updateBoard(currentTile);
  }, [mouseCapture, currentTile]);

  return (
    <div className="flex flex-col items-center mb-10">
      <div className="flex justify-between items-center mb-10 w-full">
        <ArrowLeft />
        <h2 className="text-xl md:text-3xl text-center">Level {number}</h2>
      </div>
      <div
        className="flex flex-col"
        onMouseDown={() => setMouseCapture(true)}
        onMouseMove={handleMouseMove}
      >
        {rows.map((row, y) => {
          return (
            <div className="flex relative" key={y}>
              <div className="absolute top-0 left-0 -translate-x-full">
                {row}
              </div>
              {columns.map((column, x) => {
                const tile = (
                  <div
                    key={`${x},${y}`}
                    className={cn(
                      'w-10 h-10 border border-blue-400 hover:bg-blue-400 transition',
                      { 'bg-blue-400': board[x][y] === 'draw' },
                      { 'bg-gray-400': board[x][y] === 'block' },
                      { 'bg-none': board[x][y] === 'clear' }
                    )}
                    onMouseOver={() => setCurrentTile({ x, y })}
                    onClick={() => updateBoard({ x, y })}
                  ></div>
                );
                return (
                  <Fragment key={x}>
                    {y === 0 && (
                      <div className="relative">
                        <div className="absolute top-0 -translate-y-full flex flex-col">
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
