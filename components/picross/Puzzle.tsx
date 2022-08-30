import { TPuzzle } from '.';

export function Puzzle({
  number,
  details,
}: {
  number: number;
  details: TPuzzle;
}) {
  const { rows, columns, solution } = details;
  console.log(details);

  return (
    <>
      <h2 className="text-xl md:text-3xl text-center mb-6">Level {number}</h2>
      {rows.map((row) => {
        columns.map((column) => {
          console.log('wat');

          return <div className="w-10 h-10 border border-cyan-400"></div>;
        });
      })}
    </>
  );
}
