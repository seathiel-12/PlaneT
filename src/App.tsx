import { createTheme, MantineProvider } from '@mantine/core';
import './App.css'
import Footer from './Components/Presentation/Footer/Footer.jsx';
import Header from './Components/Presentation/Header/Header.jsx';
import { Outlet, useLocation } from 'react-router';
import { useEffect } from 'react';

const theme = createTheme({

});

function App() {
  const location = useLocation()
  useEffect(()=>{
        document.body.scrollIntoView({
            behavior:'smooth'
        })
    },[location])
  return (
    <MantineProvider theme={theme}>
      <Header/>
      <Outlet/>
      <Footer/>
    </MantineProvider>
      
  )
}

export default App;
