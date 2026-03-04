import './App.css'
import Footer from './Components/Presentation/Footer/Footer.jsx';
import Header from './Components/Presentation/Header/Header.jsx';
import { Outlet } from 'react-router';

function App() {

  return (
    <div>
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
      
  )
}

export default App;
