import React, { useState, } from 'react';
import { useNavigate , Link} from 'react-router-dom';

const SignUp = () => {
  let navigate = useNavigate();


  const [credenitals, setCredentials] = useState({ name: "", email: "", password: "", c_password: "" });
  const onChange = (event) => {
    // console.log("onchange run");
    setCredentials({ ...credenitals, [event.target.name]: event.target.value });
  }

  const handle_submit = async (event) => {

    if (credenitals.password !== credenitals.c_password) {
      alert("Passwords don't match");
    }
    else {

      event.preventDefault();
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      const url = `${backendUrl}/api/auth/createuser`;
      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: credenitals.name, email: credenitals.email, password: credenitals.password })
      })
      const json = await response.json();
      console.log(json);

      if (json.success) {
        // save the auth token
        // console.log(json.auth_token);
        sessionStorage.setItem('token', json.auth_token);

        // todo REDIRECT THE USER TO THE HOME PAGE
        navigate('/');
      }
      else {
        alert(json.error);
      }
      setCredentials({ name: "", email: "", password: "", c_password: "" });
    }
  }
  return (
    <>
      <label htmlFor="message" className="block m-8 text-2xl text-center font-normal text-yellow-900">Sign-Up to use Cloud_Book </label>
      <div className="flex justify-center m-10">
        <form onSubmit={handle_submit} className=' w-1/3 border-spacing-10 border-4 rounded-xl border-color_4 p-6'>
          <div className="mb-6 ">
            <label htmlFor="name" className="block mb-2 text-xl font-medium text-gray-900 ">Your name</label>
            <input type="name" id="name" name="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter your name here......" required value={credenitals.name} onChange={onChange} />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-xl font-medium text-gray-900 ">Your email</label>
            <input type="email" id="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter your email here......" required value={credenitals.email} onChange={onChange} />
          </div>
          <br />
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-xl font-medium text-gray-900 ">Your password</label>
            <input type="password" id="password" name="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder='Enter your password here......' required value={credenitals.password} onChange={onChange} />
          </div>
          <div className="mb-6">
            <label htmlFor="c_password" className="block mb-2 text-xl font-medium text-gray-900 ">Confirm password</label>
            <input type="password" id="c_password" name="c_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder='Confirm your password here......' required value={credenitals.c_password} onChange={onChange} />
          </div>
          <br />
          <br />

          <div className="flex justify-between">
            <button type="submit" className="text-black bg-color_2 border-2 border-color_4 hover:bg-color_4 hover:text-white  font-medium rounded-lg text-sm px-5 py-2.5 text-center md:mr-0" >Submit</button>
            <div className="mx-4">
              <div className="text-sm text-center p-1">Already a user ? </div>
              <Link to='/login' className="text-sm text-center p-1 hover:font-bold">Log-In</Link>
              </div>
          </div>

        </form>
      </div>

    </>
  )
}

export default SignUp