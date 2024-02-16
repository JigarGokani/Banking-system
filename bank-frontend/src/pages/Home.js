import React from 'react';

const Home = () => {
  const backgroundImageStyle = {
    backgroundImage: 'url("https://wallpapercave.com/wp/wp9338384.jpg")',
    backgroundSize: 'cover', 
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff', 
  };

  return (
    <div style={backgroundImageStyle}>
      <h1 className='text-8xl font-bold -mt-80'>Welcome to Our Bank</h1>
    </div>
  );
};

export default Home;
