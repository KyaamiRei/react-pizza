import { useState, useEffect } from 'react';

import axios from 'axios';

import Categories from '../components/Categories';
import Pizza from '../components/PizzaBlock';
import Sort from '../components/Sort';
import Sceleton from '../components/PizzaBlock/Sceleton';

export default function Home() {
  const [categoryActiveId, setCategoryActiveId] = useState(0);
  const [pizzaList, setPizzaList] = useState([]);
  const [sortProperty, setSortProperty] = useState({
    name: 'популярности',
    sortProperty: 'rating',
  });
  const [isLoading, setIsLoading] = useState([false]);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);

        const category = categoryActiveId > 0 ? `category=${categoryActiveId}` : '';
        const order = sortProperty.sortProperty.includes ('-') ? 'desc' : 'asc';
        const sortBy = sortProperty.sortProperty.replace('-', '');

        const [pizza] = await Promise.all([
          axios.get(
            `https://6367cdf8edc85dbc84dc2378.mockapi.io/pizza?${category}&sortBy=${sortBy}&order=${order}`,
          ),
        ]);

        setPizzaList(pizza.data);
        setIsLoading(false);
      } catch (error) {
        alert('Ошибка при запросе данных!');
        console.log(error);
      }
    }

    fetchData();
    window.scrollTo(0, 0);
  }, [categoryActiveId, sortProperty]);

  return (
    <>
      <div className='container'>
        <div className='content__top'>
          <Categories
            categoryActiveId={categoryActiveId}
            onChangeCategory={(catId) => setCategoryActiveId(catId)}
          />
          <Sort
            value={sortProperty}
            setSortProperty={(obj) => setSortProperty(obj)}
          />
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
      </div>
    </>
  );
}
