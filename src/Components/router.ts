import { createBrowserRouter } from 'react-router';
import App from '../App';
import HomePage from './Pages/HomePage';
import About from './Pages/About';
import Contact from './Pages/Contact/Contact';
import BookFlight from './Pages/BookFlight';
import AuthLayout from './Layout/AuthLayout'; 
import LoginForm from './Features/Auth/login/LoginForm';
import RegisterForm from './Features/Auth/login/RegisterForm';
import Destination from './Pages/Destinations/Destination';

const routes = createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [
            {path: '', Component: HomePage, index:true},
            {path: 'home', Component: HomePage},
            {path: 'sign-in', Component: AuthLayout, children: [{path:'', Component: LoginForm}]},
            {path: 'create-account', Component: AuthLayout, children: [{path:'', Component: RegisterForm}]},
            {path: 'about', Component: About},
            {path: 'contact', Component: Contact },
            {path: 'book-flight', Component: BookFlight},
            {path: 'destinations', Component: Destination}
        ]
    }
]);

export default routes;