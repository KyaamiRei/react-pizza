import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { setCurrentPage, setFilters, selectFilter } from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzas } from '../redux/slices/pizzasSlice';

import qs from 'qs';

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

  const { items, status } = useSelector(selectPizzas);
  const { categoryId, currentPage, searchValue, sort } = useSelector(selectFilter);

  const pizzas = items
    .filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
    .map((item, index) => (
      <Pizza
        key={item.id}
        {...item}
      />
    ));
  const sceleton = [...new Array(8)].map((_, index) => <Sceleton key={index} />);

  const getPizzas = () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const order = sort.sortProperty.includes('-') ? 'desc' : 'asc';
    const sortBy = sort.sortProperty.replace('-', '');
    const pizzaTitle = searchValue > 0 ? `search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        category,
        order,
        sortBy,
        pizzaTitle,
        currentPage,
      }),
    );

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
      getPizzas();
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
        {status === 'error' ? (
          <div className='content__error'>
            <h2>
              Произошла ошибка <icon>😕</icon>
            </h2>
            <p>К сожалению, не удаолось пиццы. попробуйте повторить позже.</p>
          </div>
        ) : (
          <div className='content__items'>{status === 'loading' ? sceleton : pizzas}</div>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        onChangePage={(number) => dispatch(setCurrentPage(number))}
      />
    </>
  );
}
