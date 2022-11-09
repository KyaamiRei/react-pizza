import { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { setCurrentPage, setFilters } from '../redux/slices/filterSlice';

import axios from 'axios';
import qs from 'qs';

import { SearchContext } from '../App';

import Categories from '../components/Categories';
import Pagination from '../Pagination';
import Pizza from '../components/PizzaBlock';
import Sort, { sortType } from '../components/Sort';
import Sceleton from '../components/PizzaBlock/Sceleton';

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, currentPage, sort } = useSelector((state) => state.filterSlice);

  const { searchValue } = useContext(SearchContext);

  const [pizzaList, setPizzaList] = useState([]);
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

  const fetchPizzas = () => {
    async function fetchData() {
      try {
        setIsLoading(true);

        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const order = sort.sortProperty.includes('-') ? 'desc' : 'asc';
        const sortBy = sort.sortProperty.replace('-', '');
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
  };

  // Если был перывый рендер, то проверяем URL параметры и сохраняет в Redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortType.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(setFilters({ ...params, sort }));
    }
    isSearch.current = true;
  }, []);

  // Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, currentPage, sort, searchValue]);

  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [categoryId, currentPage, sort, searchValue]);

  return (
    <>
      <div className='container'>
        <div className='content__top'>
          <Categories />
          <Sort />
        </div>
        <h2 className='content__title'>
          {searchValue.length > 0 ? `Поиск: ${searchValue}` : 'Все пиццы'}
        </h2>
        <div className='content__items'>{isLoading ? sceleton : pizzas}</div>
      </div>
      <Pagination
        currentPage={currentPage}
        onChangePage={(number) => dispatch(setCurrentPage(number))}
      />
    </>
  );
}
