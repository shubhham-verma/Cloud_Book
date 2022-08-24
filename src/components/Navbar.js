import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './books.png';

export const Navbar = () => {
    let navigate = useNavigate();
    const handle_logout = () =>{
        // console.log("logout");
        sessionStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <>

            <div className="flowbite-navbar">

                <nav className="bg-color_3 border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
                    <div className="container flex flex-wrap justify-between items-center mx-auto">
                        <Link to="/" className="flex items-center">
                            <img src={logo} className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                            <Link to="/" className=" test-4xl py-2 pr-4 pl-3 text-white bg-color_3 rounded " aria-current="page">CLOUD_BOOK</Link>

                        </Link>
                        {!sessionStorage.getItem('token') ?
                            <div className="flex md:order-2">
                                <Link to='/login' type="button" className="text-black border-2 border-color_4 bg-color_2 hover:bg-color_4 hover:text-white  font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-3 md:mr-0">Login</Link>
                                <Link to='/signup' type="button" className="text-black border-2 border-color_4 bg-color_2 hover:bg-color_4 hover:text-white  font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-3 md:mr-0">Sign-Up</Link>
                            </div>
                            :
                            <div className="flex md:order-2">
                                <button onClick={handle_logout} type="button" className="text-black border-2 border-color_4 bg-color_2 hover:bg-color_4 hover:text-white  font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-3 md:mr-0">Log-Out</button>
                            </div>
                        }

                        <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="navbar-cta">

                        </div>
                    </div>
                </nav>

            </div>

        </>
    )
}
