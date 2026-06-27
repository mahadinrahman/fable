import Banner from '@/components/Banner';
import Featured1 from '@/components/Featured1';
import FeaturedBooks from '@/components/FeaturedBooks';
import React from 'react';

const page = () => {
  return (
    <div>
      
      <Banner></Banner>
      <FeaturedBooks></FeaturedBooks>
      <Featured1></Featured1>
    </div>
  );
};

export default page;