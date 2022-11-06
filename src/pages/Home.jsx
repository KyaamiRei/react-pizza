import { useState, useEffect } from 'react';

import axios from 'axios';

import Categories from '../components/Categories';
import Pizza from '../components/PizzaBlock';
import Sort from '../components/Sort';
import Sceleton from '../components/PizzaBlock/Sceleton';

export default function Home() {
  const [pizzaList, setPizzaList] = useState([]);
  const [isLoading, setIsLoading] = useState([false]);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const [pizza] = await Promise.all([
          axios.get('https://6367cdf8edc85dbc84dc2378.mockapi.io/pizza'),
        ]);

        setPizzaList(pizza.data);
        setIsLoading(false);
      } catch (error) {
        alert('Ошибка при запросе данных!');
        console.log(error);
      }
    }

    fetchData();
  }, []);
  return (
    <>
      <div className='content__top'>
        <Categories />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {isLoading
          ? [...new Array(8)].map((_, index) => <Sceleton key={index} />)
          : pizzaList.map((item, index) => (
              <Pizza
                key={item.id}
                {...item}
              />
            ))}
      </div>
    </>
  );
}
