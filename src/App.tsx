import { createTheme, MantineProvider } from '@mantine/core';
import './App.css'
import Footer from './Components/Presentation/Footer/Footer.jsx';
import Header from './Components/Presentation/Header/Header.jsx';
import { Outlet, useLocation } from 'react-router';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';

const theme = createTheme({

});

function App() {
  const queryClient = new QueryClient();
  const {pathname} = useLocation();
  useEffect(()=>{
        document.body.scrollIntoView({
            behavior:'smooth'
        })
    },[pathname])
  return (
    <QueryClientProvider client={queryClient} >
      <MantineProvider theme={theme}>
        <AuthProvider>
          <Header/>
          <Outlet/>
          <Footer/>
          <Toaster/>
        </AuthProvider>
      </MantineProvider>
    </QueryClientProvider>
      
  )
}

export default App;
