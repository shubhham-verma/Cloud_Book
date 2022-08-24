import React, { useState, } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {

    let navigate = useNavigate();


    const [credenitals, setCredentials] = useState({ email: "", password: "" });
    const onChange = (event) => {
        // console.log("onchange run");
        setCredentials({ ...credenitals, [event.target.name]: event.target.value });
    }

    const handle_submit = async (event) => {
        event.preventDefault();
        const url = `http://localhost:5000/api/auth/login`;
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credenitals.email, password: credenitals.password })
        })
        const json = await response.json();
        console.log(json);

        if (json.success) {
            // save the auth token
            sessionStorage.setItem('token', json.auth_token);

            // todo REDIRECT THE USER TO THE HOME PAGE
            navigate('/');
        }
        else {
            alert(json.error);
        }
    }
    return (
        <>
            <label htmlFor="message" className="block m-8 text-2xl text-center font-normal text-yellow-900">Login to see your notes (❁´◡`❁) </label>
            <div className="flex justify-center m-10">
                <form onSubmit={handle_submit} className=' w-1/3 border-spacing-10 border-4 rounded-xl border-color_4 p-6'>
                    <div className="mb-6 ">
                        <label htmlFor="email" className="block mb-2 text-xl font-medium text-gray-900 ">Your email</label>
                        <input type="email" id="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter your email here......" required="" value={credenitals.email} onChange={onChange} />
                    </div>
                    <br />
                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2 text-xl font-medium text-gray-900 ">Your password</label>
                        <input type="password" id="password" name="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder='Enter your password here......' required="" value={credenitals.password} onChange={onChange} />
                    </div>
                    <br />
                    <br />
                    <div className="flex justify-between">
                        <button type="submit" className="text-black bg-color_2 border-2 border-color_4 hover:bg-color_4 hover:text-white  font-medium rounded-lg text-sm px-5 py-2.5 text-center md:mr-0" >Submit</button>
                        <div className="mx-4">
                            <div className="text-sm text-center p-1">New a user ? </div>
                            <Link to='/signup' className="text-sm text-center p-1 hover:font-bold">Sign-Up</Link>
                        </div>
                    </div>
                </form>
            </div>

        </>
    )
}

export default Login