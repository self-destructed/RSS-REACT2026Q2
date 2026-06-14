import { useState } from 'react';
import styles from './column-modal.module.css';

type ColumnModalProps = {
  availableColumns: string[];
  initialSelectedColumns: string[];
  onConfirm: (columns: string[]) => void;
};

export const ColumnModal = ({
  availableColumns,
  initialSelectedColumns,
  onConfirm,
}: ColumnModalProps) => {
  const [draft, setDraft] = useState(initialSelectedColumns);

  const handleToggle = (column: string) => {
    setDraft((prev) =>
      prev.includes(column) ? prev.filter((c) => c !== column) : [...prev, column]
    );
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Select columns to display</h2>
        <div className={styles.columnList}>
          {availableColumns.map((column) => (
            <div key={column} className={styles.columnItem}>
              <label>
                <input
                  type="checkbox"
                  checked={draft.includes(column)}
                  onChange={() => handleToggle(column)}
                  className={styles.checkbox}
                />
                {column}
              </label>
            </div>
          ))}
        </div>
        <div className={styles.buttonContainer}>
          <button onClick={() => onConfirm(draft)} className={styles.closeButton}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
