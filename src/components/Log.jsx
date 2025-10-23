export default function Log({ turns }) {
  return (
    <ol id='log'>
      {turns.map((turn) => (
        // { square: { row: rowIndex, col: colIndex }, player: currentPlayer }
        <li key={`${turn.square.row}${turn.square.col}`}>
          {turn.player} - [{turn.square.row}][{turn.square.col}]
        </li>
      ))}
    </ol>
  );
}
