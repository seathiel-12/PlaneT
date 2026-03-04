import { createBrowserRouter } from 'react-router';
import App from '../App';
import AuthLayout from './Features/Layout/AuthLayout';
import Login from './Features/Auth/login/Login';
import Register from './Features/Auth/login/Register';
import HomePage from './Pages/HomePage';
import About from './Pages/About';
import Contact from './Pages/Contact/Contact';
import BookFlight from './Pages/BookFlight';

const routes = createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [
            {path: '', Component: HomePage, index:true},
            {path: 'home', Component: HomePage},
            {path: 'sign-in', Component: AuthLayout, children: [{path:'', Component: Login}]},
            {path: 'create-account', Component: AuthLayout, children: [{path:'', Component: Register}]},
            {path: 'about', Component: About},
            {path: 'contact', Component: Contact },
            {path: 'book-flight', Component: BookFlight}
        ]
    }
]);

export default routes;