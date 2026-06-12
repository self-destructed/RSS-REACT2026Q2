import { memo, useState, useEffect, useRef } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import styles from './search-bar.module.css';

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export const SearchBar = memo(({ value, onChange }: SearchBarProps) => {
  const [localValue, setLocalValue] = useState(value);
  const debouncedValue = useDebounce(localValue, 500);
  const isFirstRender = useRef(true);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  return (
    <div className={styles.container}>
      <label htmlFor="search" className={styles.label}>
        Search countries:
      </label>
      <input
        id="search"
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder="Type to search..."
        className={styles.input}
      />
    </div>
  );
});
SearchBar.displayName = 'SearchBar';
