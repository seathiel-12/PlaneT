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
import PaymentChecked from './Features/BookFlight/PaymentChecked';
import { Navigate } from 'react-router-dom';
import { createElement } from 'react';
import { useBookFlightStore } from './Features/BookFlight/store';
import MyBookings from './Pages/MyBookings';

const ProtectedPaymentChecked = () => {
    const { isBooked, flightSelected } = useBookFlightStore();
    return isBooked && flightSelected
        ? createElement(PaymentChecked)
        : createElement(Navigate, { to: '/', replace: true });
};

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
            {path: 'book-flight', children:[{path:'', Component: BookFlight}, {path:'booked', Component: ProtectedPaymentChecked}]},
            {path: 'destinations', Component: Destination},
            {path: 'my-bookings', Component: MyBookings},
        ]
    }
]);

export const routeMatcher = {
    home: '/home',
    login:'/sign-in',
    register:'/create-account',
    about:'/about', 
    contact:'/contact',
    booking:'/book-flight',
    booked:'/book-flight/booked',
    destinations:'/destinations',
    myBookings:'/my-bookings'
}

export default routes;