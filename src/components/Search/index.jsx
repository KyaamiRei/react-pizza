import styles from './Search.module.scss';

export default function Search({ searchValue, setSearchValue }) {
  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        viewBox='0 0 20 20'
        xmlns='http://www.w3.org/2000/svg'>
        <path d='M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z' />
      </svg>
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className={styles.input}
        type='text'
        placeholder='Поиск пиццы'
      />
      {searchValue && (
          <svg
          onClick={() => setSearchValue('')}
          className={styles.close}
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'>
          <path d='M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z' />
        </svg>
      )}
    </div>
  );
}
