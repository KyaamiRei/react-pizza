import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import axios from 'axios';

export default function DetailPizza() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [pizza, setPizza] = useState({});

  useEffect(() => {
    try {
      const fetchData = async () => {
        const { data } = await axios.get(`https://6367cdf8edc85dbc84dc2378.mockapi.io/pizza/${id}`);
        setPizza(data);
      };

      fetchData();
    } catch (error) {
      alert('Ошибка при получении данных');
      navigate('/');
      console.log(error);
    }
  }, []);

  if (!pizza) {
    return 'Loading...';
  }

  return (
    <div className='container'>
      <img
        src={pizza.imageUrl}
        alt='Pizza'
      />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}</h4>
    </div>
  );
}
