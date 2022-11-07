import { useState, useEffect, useContext } from 'react';

import axios from 'axios';

import { SearchContext } from '../App';

import Categories from '../components/Categories';
import Pagination from '../Pagination';
import Pizza from '../components/PizzaBlock';
import Sort from '../components/Sort';
import Sceleton from '../components/PizzaBlock/Sceleton';

export default function Home() {
  const { searchValue } = useContext(SearchContext);

  const [categoryActiveId, setCategoryActiveId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pizzaList, setPizzaList] = useState([]);
  const [sortProperty, setSortProperty] = useState({
    name: 'популярности',
    sortProperty: 'rating',
  });
  const [isLoading, setIsLoading] = useState([false]);

  const pizzas = pizzaList
    .filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
    .map((item, index) => (
      <Pizza
        key={item.id}
        {...item}
      />
    ));
  const sceleton = [...new Array(8)].map((_, index) => <Sceleton key={index} />);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);

        const category = categoryActiveId > 0 ? `category=${categoryActiveId}` : '';
        const order = sortProperty.sortProperty.includes('-') ? 'desc' : 'asc';
        const sortBy = sortProperty.sortProperty.replace('-', '');
        const pizzaTitle = searchValue > 0 ? `search=${searchValue}` : '';

        const [pizza] = await Promise.all([
          axios.get(
            `https://6367cdf8edc85dbc84dc2378.mockapi.io/pizza?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${pizzaTitle}`,
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
  }, [categoryActiveId, sortProperty, searchValue, currentPage]);

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
        <h2 className='content__title'>
          {searchValue.length > 0 ? `Поиск: ${searchValue}` : 'Все пиццы'}
        </h2>
        <div className='content__items'>{isLoading ? sceleton : pizzas}</div>
      </div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </>
  );
}
