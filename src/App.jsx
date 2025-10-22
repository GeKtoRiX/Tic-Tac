import { useState } from 'react';
import { WINNING_COMBINATIONS } from './winningCombinations.js';
import Player from '@/components/Players/Player.jsx';
import GameBoard from './components/GameBoard/GameBoard.jsx';
import Log from './components/Log.jsx';
import GameOver from './components/GameOver.jsx';
import '@/App.scss';

// Игровое поле([3 строки[3 ячейки]])
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

// Получение текущего активного игрока.
function deriveActivePlayer(gameTurns) {
  return gameTurns.length > 0 && gameTurns[0].player === 'X' ? 'O' : 'X';
}
// Заполнение игровой доски/проверка выигрышных комбинаций.
function handleGameTurns(initialGameBoard, gameTurns) {
  // Победитель партии.
  let winner = null;

  // Копия массива игрового поля(изучить как работает...)
  const gameBoard = initialGameBoard.map((row) => [...row]);

  // Проход по всем ходам игроков, изменение символов в ячейках игрового поля.
  for (const turn of gameTurns) {
    // Деструктуризация двух свойств из объекта turn(ход игрока).
    const { square, player } = turn;
    // Деструктуризация двух свойств из объекта square(координаты ячейки игрового поля).
    const { row, col } = square;
    // Изменение символа ячейки игрового поля.
    gameBoard[row][col] = player;
  }

  // Проверка выигрышных комбинаций игроков(изучить подробно).
  for (const combination of WINNING_COMBINATIONS) {
    // Выигрышная комбинация.
    const [
      { row: rowA, col: colA },
      { row: rowB, col: colB },
      { row: rowC, col: colC },
    ] = combination;
    // Разбитие выигрышной комбинации на три ячейки.
    const firstSquareSymbol = gameBoard[rowA][colA];
    const secondSquareSymbol = gameBoard[rowB][colB];
    const thirdSquareSymbol = gameBoard[rowC][colC];
    // Проверка ячейки выигрышной комбинации.
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      // Определение победителя.
      winner = firstSquareSymbol;
      break;
    }
  }

  // Возврат нового игрового поля и состояния победителя.
  return { gameBoard, winner };
}

function App() {
  // Хук состояния логирования ходов игроков.
  const [gameTurns, setGameTurns] = useState([]);

  // Отслеживание и изменение очередности текущего игрока.
  function handleSelectSquare(rowIndex, colIndex) {
    // Обработка состояния массива ходов игроков(логирование).
    setGameTurns((prevTurns) => {
      // Отслеживание текущего игрока для логирования.
      const currentPlayer = deriveActivePlayer(prevTurns);
      // Соединение информации предыдущих ходов с текушим.
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  // Отслеживание текущего активного игрока.
  const activePlayer = deriveActivePlayer(gameTurns);

  // Заполнение игрового поля символами выбора игроков/Проверка выигрышных комбинаций.
  const { gameBoard, winner } = handleGameTurns(initialGameBoard, gameTurns);

  // Завершение партии при победе ничьей.
  const gameOver = gameTurns.length === 9 || !!winner;

  return (
    <main>
      <div id='game-container'>
        <ol id='players' className='highlight-player'>
          <Player
            // Имя игрока 1 игрока по умолчанию.
            initialName='Player 1'
            // Символ 1 игрока.
            symbol='X'
            // Является ли 1 игрок текущим(true/false) игроком.
            isActive={activePlayer === 'X'}
          />
          <Player
            // Имя игрока 2 игрока по умолчанию.
            initialName='Player 2'
            // Символ 2 игрока.
            symbol='O'
            // Является ли 2 игрок текущим(активым) игроком.
            isActive={activePlayer === 'O'}
          />
        </ol>
        {gameOver && <GameOver winner={winner} />}
        <GameBoard
          // Смена очередности текущего игрока и передача лога ходов игроков.
          onSelectSquare={handleSelectSquare}
          // Прокидывание массива ходов игроков.
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
