import React, { useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';

import { setSearchValue } from '../../redux/slices/filterSlice';

import styles from './Search.module.scss';

const Search = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const updateSearchValue = useCallback(
    debounce((value: string) => {
      dispatch(setSearchValue(value));
    }, 500),
    [],
  );

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        viewBox='0 0 20 20'
        xmlns='http://www.w3.org/2000/svg'>
        <path d='M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z' />
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setValue(e.target.value);
          updateSearchValue(e.target.value);
        }}
        className={styles.input}
        type='text'
        placeholder='Поиск пиццы'
      />
      {value && (
        <svg
          onClick={() => {
            setSearchValue('');
            inputRef.current?.focus();
          }}
          className={styles.close}
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'>
          <path d='M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z' />
        </svg>
      )}
    </div>
  );
};

export default Search;
