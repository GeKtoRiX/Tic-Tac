import { useState } from 'react';
import Player from '@/components/Players/Player.jsx';
import GameBoard from './components/GameBoard/GameBoard.jsx';
import Log from './components/Log.jsx';
import '@/App.scss';

function App() {
  // Хук состояния очереди текущего игрока(по умолчанию текущий игрок - 'X').
  const [activePlayer, setActivePlayer] = useState('X');
  // Хук состояния логирования ходов игроков.
  const [gameTurns, setGameTurns] = useState([]);

  // Отслеживание и изменение очередности текущего игрока.
  function handleSelectSquare(rowIndex, colIndex) {
    // Переключатель текущего игрока.
    setActivePlayer((curActivePlayer) => (curActivePlayer === 'X' ? 'O' : 'X'));
    // Обработка состояния массива ходов игроков(логирование).
    setGameTurns((prevTurns) => {
      // Отслеживание текущего игрока для логирования.
      let currentPlayer =
        prevTurns.length > 0 && prevTurns[0].player === 'X' ? 'O' : 'X';
      // Соединение информации предыдущих ходов с текушим.
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

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
        <GameBoard
          // Смена очередности текущего игрока и передача лога ходов игроков.
          onSelectSquare={handleSelectSquare}
          // Прокидывание массива ходов игроков.
          turns={gameTurns}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
