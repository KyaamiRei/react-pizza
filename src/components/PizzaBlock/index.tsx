import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { selectCartById } from '../../redux/cart/selectors';
import { addItem } from '../../redux/cart/slice';
import { CartItem } from '../../redux/cart/types';

type PizzaProps = {
  id: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  imageUrl: string;
};

const PizzaBlock: React.FC<PizzaProps> = ({ id, title, types, sizes, price, imageUrl }) => {
  const dispatch = useDispatch();
  const cartItemCount = useSelector(selectCartById(id));

  const addedCount = cartItemCount ? cartItemCount.count : 0;

  const [sizePizza, setSizePizza] = useState(0);
  const [doughPizza, setDoughPizza] = useState(0);

  const typeDough = ['традиционное', 'тонкое'];

  const item: CartItem = {
    id,
    title: title,
    type: typeDough[doughPizza],
    size: sizes[sizePizza],
    price: price,
    imageUrl: imageUrl,
    count: 0,
  };

  return (
    <div className='pizza-block-wrapper'>
      <div className='pizza-block'>
        <Link to={`pizza/${id}`}>
          <img
            className='pizza-block__image'
            src={imageUrl}
            alt='Pizza'
          />
        </Link>
        <h4 className='pizza-block__title'>{title}</h4>
        <div className='pizza-block__selector'>
          <ul>
            {types.map((type) => (
              <li
                key={type}
                onClick={() => setDoughPizza(type)}
                className={doughPizza === type ? 'active' : ''}>
                {typeDough[type]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, index) => (
              <li
                key={index}
                onClick={() => setSizePizza(index)}
                className={sizePizza === index ? 'active' : ''}>
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className='pizza-block__bottom'>
          <div className='pizza-block__price'>от {price} ₽</div>
          <div
            onClick={() => {
              dispatch(addItem(item));
            }}
            className='button button--outline button--add'>
            <svg
              width='12'
              height='12'
              viewBox='0 0 12 12'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
                fill='white'
              />
            </svg>
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
