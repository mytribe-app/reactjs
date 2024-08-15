import React from 'react';
import PageContainer from 'src/components/container/PageContainer';


import Banner from '../../../components/landingpage/banner/Banner';
import Footer from '../../../components/landingpage/footer/Footer';
import LpHeader from '../../../components/landingpage/header/Header';

const Landingpage = () => {
  return (
    <PageContainer title="Landingpage" description="this is Landingpage">
      <LpHeader />
      <Banner />

      <Footer />
    </PageContainer>
  );
};

export default Landingpage;
