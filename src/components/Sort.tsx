import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { setSortType } from '../redux/filter/slice';
import { SortProperty, SortProps } from '../redux/filter/types';

type SortPopupProps = {
  value: SortProps;
};

type SortProp = {
  name: string;
  sortProperty: SortProperty;
};

type PopupClick = MouseEvent & {
  path: Node[];
};

export const sortType: SortProp[] = [
  { name: 'популярности (desc)', sortProperty: SortProperty.RATING_DESC },
  { name: 'популярности (asc)', sortProperty: SortProperty.RATING_ASC },
  { name: 'цене (desc)', sortProperty: SortProperty.PRICE_DESC },
  { name: 'цене (asc)', sortProperty: SortProperty.PRICE_ASC },
  { name: 'алфавиту (desc)', sortProperty: SortProperty.TITLE_DESC },
  { name: 'алфавиту (asc)', sortProperty: SortProperty.TITLE_ASC },
];

const Sort: React.FC<SortPopupProps> = React.memo(({ value }) => {
  const dispatch = useDispatch();
  const sortRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const clickOutside = (event: MouseEvent) => {
      const _event = event as PopupClick;

      if (sortRef.current && !_event.path.includes(sortRef.current)) {
        setIsVisible(false);
      }
    };
    document.body.addEventListener('click', clickOutside);
    return () => document.body.removeEventListener('click', clickOutside);
  }, []);

  return (
    <div
      ref={sortRef}
      className='sort'>
      <div className='sort__label'>
        <svg
          width='10'
          height='6'
          viewBox='0 0 10 6'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
            fill='#2C2C2C'
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setIsVisible(!isVisible)}>{value.name}</span>
      </div>
      {isVisible && (
        <div className='sort__popup'>
          <ul>
            {sortType.map((obj, index) => (
              <li
                key={index}
                onClick={() => {
                  dispatch(setSortType(obj));
                  setIsVisible(!isVisible);
                }}
                className={value.sortProperty === obj.sortProperty ? 'active' : ''}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default Sort;
