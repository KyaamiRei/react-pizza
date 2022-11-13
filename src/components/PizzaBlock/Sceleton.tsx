import React from 'react';
import ContentLoader from 'react-content-loader';

const PizzaSceleton: React.FC = () => (
  <ContentLoader
    className='pizza-block'
    speed={2}
    width={280}
    height={450}
    viewBox='0 0 280 450'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'>
    <circle
      cx='138'
      cy='125'
      r='125'
    />
    <rect
      x='0'
      y='263'
      rx='9'
      ry='9'
      width='280'
      height='32'
    />
    <rect
      x='0'
      y='312'
      rx='10'
      ry='10'
      width='280'
      height='70'
    />
    <rect
      x='122'
      y='397'
      rx='15'
      ry='15'
      width='152'
      height='45'
    />
    <rect
      x='0'
      y='404'
      rx='0'
      ry='0'
      width='90'
      height='35'
    />
  </ContentLoader>
);

export default PizzaSceleton;
