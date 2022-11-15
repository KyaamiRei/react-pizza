import React from 'react';
import { useDispatch } from 'react-redux';
import { setCategoryId } from '../redux/filter/slice';

type CategoryProps = {
  idCat: number;
};

const Categories: React.FC<CategoryProps> = React.memo(({ idCat }) => {
  const dispatch = useDispatch();

  const categories: string[] = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className='categories'>
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            onClick={() => dispatch(setCategoryId(index))}
            className={idCat === index ? 'active' : ''}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
