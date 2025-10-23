/* 
Хук useState позволяет функциональному компоненту хранить внутреннее состояние(state) 
и реагировать на его изменения. 
Без него компонент не может "запоминать" данные между рендерами.
*/
import { useState } from 'react';
/* 
Импорт массива объектов всех 8 выигрышных комбинаций в игре кретики-нолики.
*/
import { WINNING_COMBINATIONS } from './winningCombinations.js';
/* 
Импорт react компонента игрока(Рендер и Логика).
*/
import Player from '@/components/Players/Player.jsx';
/* 
Импорт react компонента игрового поля(Рендер).
*/
import GameBoard from './components/GameBoard/GameBoard.jsx';
/* 
Импорт react компонента логирование ходов игроков(Рендер).
*/
import Log from './components/Log.jsx';
/* 
Импорт react компонента окна окончания игры(Рендер).
*/
import GameOver from './components/GameOver.jsx';
/* 
Импорт scss стилей всего приложения.
*/
import '@/App.scss';

//========CONSTANTS========//
// Константа объект зранения изначальных имет игроков по их символам.
const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2',
};

// Константа массива массивов хранения изеначального пустого игрового поля(шаблон).
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
//========<<===>>========//

//========FUNCTIONS-OUTSIDE========//
// Получение текущего активного игрока.
function deriveActivePlayer(gameTurns) {
  return gameTurns.length > 0 && gameTurns[0].player === 'X' ? 'O' : 'X';
}
// Заполнение игровой доски/проверка выигрышных комбинаций.
function handleGameTurns(INITIAL_GAME_BOARD, gameTurns, players) {
  // Победитель партии.
  let winner = null;

  // Копия массива игрового поля.
  const gameBoard = INITIAL_GAME_BOARD.map((row) => [...row]);

  // Проход по всем ходам игроков, изменение символов в ячейках игрового поля.
  // { square: { row: rowIndex, col: colIndex }, player: currentPlayer }
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
    // Координаты выигрышной комбинации.
    const [
      { row: rowA, col: colA },
      { row: rowB, col: colB },
      { row: rowC, col: colC },
    ] = combination;
    // Получение символов внутри ячеек координатов выигрышной комбинации.
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
      winner = players[firstSquareSymbol];
      break;
    }
  }

  // Возврат нового игрового поля и состояния победителя.
  return { gameBoard, winner };
}
//===============<<===>>===============//

function App() {
  //========HOOKS/FUNCTIONS-INSIDE========//
  // Хук отслеживания состояния имен игроков.
  const [players, setPlayers] = useState(PLAYERS);
  // Реактивное изменение имен игроков.
  function handlePlayerChangeName(symbol, newName) {
    // Перерендер элемента при изменении имени игрока.
    setPlayers((prevPlayers) => {
      // Возврат обновленного имени игрока.
      return {
        // Использование spread оператора для создания копии объекта имен игроков.
        ...prevPlayers,
        // Использование динамического ключа для изменения имени игрока по его символу.
        [symbol]: newName,
      };
    });
  }

  // Хук отслеживания состояния логирования ходов игроков.
  const [gameTurns, setGameTurns] = useState([]);
  // Отслеживание и изменение очередности текущего игрока.
  function handleSelectSquare(rowIndex, colIndex) {
    // Обработка состояния массива ходов игроков(логирование).
    setGameTurns((prevTurns) => {
      // Отслеживание символа предыдущего игрока.
      const currentPlayer = deriveActivePlayer(prevTurns);
      // Соединение информации предыдущих ходов с текушим.
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  // Обнуление массива ходов игроков(Новая Игра).
  function handleRestart() {
    setGameTurns([]);
  }
  //=======<<===>>========//

  //========ACTIVE========//

  // Получение символа текущего активного игрока. ---O
  const activePlayer = deriveActivePlayer(gameTurns);

  // Инициализирование игрового поля символами ходов игроков/Проверка выигрышных комбинаций.
  const { gameBoard, winner } = handleGameTurns(
    INITIAL_GAME_BOARD,
    gameTurns,
    players
  );

  // Завершение партии при победе или ничьей.
  const gameOver = gameTurns.length === 9 || !!winner;
  //=======<<===>>========//

  return (
    <main>
      <div id='game-container'>
        <ol id='players' className='highlight-player'>
          <Player
            // Имя игрока 1 игрока по умолчанию.
            initialName={PLAYERS.X}
            // Символ 1 игрока.
            symbol='X'
            // Является ли 1 игрок текущим(true/false) игроком.
            isActive={activePlayer === 'X'}
            // Получение имени игрока.
            onChangeName={handlePlayerChangeName}
          />
          <Player
            // Имя игрока 2 игрока по умолчанию.
            initialName={PLAYERS.O}
            // Символ 2 игрока.
            symbol='O'
            // Является ли 2 игрок текущим(активым) игроком.
            isActive={activePlayer === 'O'}
            // Получение имени игрока.
            onChangeName={handlePlayerChangeName}
          />
        </ol>
        {gameOver && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard
          // Добавление ходов игроков.
          onSelectSquare={handleSelectSquare}
          // Передача заполненного игрового поля для рендера.
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
