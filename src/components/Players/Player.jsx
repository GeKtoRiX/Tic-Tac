import { useState } from 'react';
import styles from './Player.module.scss';

export default function Player({ initialName, symbol }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);

  function handleEditClick() {
    setIsEditing((editing) => !editing);
  }

  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  // Поле изменения имени игрока.
  let editablePlayerName = !isEditing ? (
    <span className={styles.playerName}>{playerName}</span>
  ) : (
    <input type='text' required value={playerName} onChange={handleChange} />
  );
  // Состояние кнопки редактирования имени игрока.
  let btnCaption = !isEditing ? 'Edit' : 'Save';

  return (
    <li className={styles.root}>
      <span className={styles.player}>
        {editablePlayerName}
        <span className={styles.playerSymbol}>{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{btnCaption}</button>
    </li>
  );
}
