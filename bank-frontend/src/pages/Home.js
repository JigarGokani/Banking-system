import React from 'react';

const Home = () => {
  const backgroundImageStyle = {
    backgroundImage: 'url("https://img.freepik.com/free-photo/skyscrapers-from-low-angle-view_1359-568.jpg?size=626&ext=jpg&ga=GA1.1.416685515.1705132415&semt=ais")',
    backgroundSize: 'cover', 
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff', 
  };

  return (
    <div style={backgroundImageStyle}>
      <h1 className='text-5xl font-extrabold '>Welcome to Our Bank</h1>
    </div>
  );
};

export default Home;
