import styles from './GameBoard.module.scss';

// Игровое поле([3 строки[3 ячейки]])
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({ onSelectSquare, turns }) {
  // Копия массива игрового поля.
  const gameBoard = [...initialGameBoard.map((innerArray) => [...innerArray])];

  // Проход по всем ходам игроков, изменение символов в ячейках игрового поля.
  for (const turn of turns) {
    // Деструктуризация двух свойств из объекта turn(ход игрока).
    const { square, player } = turn;
    // Деструктуризация двух свойств из объекта square(координаты ячейки игрового поля).
    const { row, col } = square;
    // Изменение символа ячейки игрового поля.
    gameBoard[row][col] = player;
  }

  /*   
// Хук отслеживания изменения состояния игрового поля.
  const [gameBoard, setGameBoard] = useState(initialGameBoard);

// Перерендер игрового поля при нажатии на ячейку.
  function handleSelectSquare(rowIndex, colIndex) {
    console.log(`${activePlayerSymbol}: [${rowIndex}][${colIndex}]`);
    // Получение и изменение пркдыдушего состояния игрового поля.
    setGameBoard((prevGameBoard) => {
      // Копия предыдущего состояния игрового поля.
      const updatedBoard = [
        ...prevGameBoard.map((innerArray) => [...innerArray]),
      ];
      // Добавление символа текущего игрока на игровом поле.
      updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
      // Возврат измененного состояния поля обратно в хук gameBoard.
      return updatedBoard;
    });
    // Изменение текущего игрока.
    onSelectSquare();
  } 
*/

  return (
    <div className={styles.root}>
      <ol>
        {gameBoard.map((row, rowIndex) => (
          <li key={rowIndex}>
            <ol>
              {row.map((playerSymbol, colIndex) => (
                <li key={colIndex}>
                  <button onClick={() => onSelectSquare(rowIndex, colIndex)}>
                    {playerSymbol}
                  </button>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </div>
  );
}
