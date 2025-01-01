import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import './Layout.styles.css';

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout; 