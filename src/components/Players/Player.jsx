import { useState } from 'react';
import styles from './Player.module.scss';

export default function Player({ initialName, symbol, isActive }) {
  // Состояние отслеживания возможности(true/false) редактирования имени игрока.
  const [isEditing, setIsEditing] = useState(false);
  // Состояние отслеживания имени(String) игрока.
  const [playerName, setPlayerName] = useState(initialName);

  // Изменение возможности(true/false) редактирования имени игрока.
  function handleEditClick() {
    setIsEditing((editing) => !editing);
  }
  // Изменение имени игрока.
  function handleNameChange(event) {
    setPlayerName(event.target.value);
  }

  // Поле изменения имени игрока.
  let editablePlayerName = !isEditing ? (
    <span className={styles.playerName}>{playerName}</span>
  ) : (
    <input
      type='text'
      required
      value={playerName}
      onChange={handleNameChange}
    />
  );
  // Состояние кнопки редактирования имени игрока.
  let btnCaption = !isEditing ? 'Edit' : 'Save';

  // Рендер интрефейся игрока.
  return (
    <li className={`${styles.root} ${isActive ? 'active' : undefined}`}>
      <span className={styles.player}>
        {editablePlayerName}
        <span className={styles.playerSymbol}>{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{btnCaption}</button>
    </li>
  );
}
