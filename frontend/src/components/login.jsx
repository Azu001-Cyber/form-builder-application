import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react';
import api from '../api';
import { GoogleLogin } from '@react-oauth/google';

// import api from "../Login/api";
// api.get("/") 
// .then(res => console.log(res.data)) 
// .catch(err => console.error(err));

// const URL = "http://127.0.0.1:8000";



function Login () {

      // Access the classes using dot notation (styles.button)
     //  return <button className={styles.button}>Click Me</button>;
    const navigate = useNavigate();
    const [form, setForm] = useState({email:"", password:""});
    const [error, setError] = useState("");

    const onChange = (e) => setForm({...form, [e.target.name]: e.target.value});

    const onSubmit = async (e) => {
        e.preventDefault();
        try{
            const { data} = await api.post('/api/login/user/', form);
            // Store tokens: 
            localStorage.setItem("access", data.access);
            localStorage.setItem("refresh", data.refresh);
            navigate("/")
        }catch{
            setError("Invalid credentials.")
        }
    }

      // GOOGLE HANDLER
    const handleGoogleSuccess = async (credentialResponse) => {
        try {
        const { data } = await api.post(
            '/api/auth/google/',
            {
            token: credentialResponse.credential,
            }
        );

        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        navigate("/");
        } catch {
        setError("Something went wrong.");
        }
        console.log(window.location.origin)
    };

    return (
        <div className="container flex flex-col justify-center content-center text-center bg-gray-100 rounded-2xl m-10 p-10 w-md mx-auto gap-">

            <div className='mb-5'>
                <h1 className='text-2xl font-medium'>Log in</h1>
                <p className='text-sm'>Don't have an account? <Link to={"/signup"} className='underline text-sm'>Sign Up</Link></p>
            </div>

            <div className="optional_auth flex flex-col gap-5">

                  {/*  GOOGLE LOGIN */}
                <div className="flex justify-center p-5">
                    <GoogleLogin
                    text='continue_with'
                    shape='pill'
                    size='large'
                    width='320'
                    onSuccess={handleGoogleSuccess}
                    />
                </div>

            </div>
            
            <div className="flex items-center my-5">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-sm text-gray-500">OR</span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>


            <div className=''>
                <form action="" method='post' className='flex flex-col' onSubmit={onSubmit}>

                    <label htmlFor="email"  className='text-start text-gray-700'>Your Email</label>
                    <input type="email" name='email' id='email' className='border rounded-xl text-gray-400 p-3' onChange={onChange}/>

                    <label htmlFor="password" className='text-start text-gray-700'>Your password</label>
                    <input type="password" name="password" id="password" className='border rounded-xl text-gray-400 p-3 ' onChange={onChange} />

                    <p className='text-end underline m-3'> <Link to={"/password/reset"}>Forgot your password?</Link></p>

                    <button className='bg-gray-400 p-3 rounded-full text-white point cursor-pointer font-medium '>Log In</button>
                    { error && (
                    <p className='mt-5 bg-red-300 p-5 rounded-full text-white font-medium'>{error}</p>
                    )} 
                </form>
            </div>

        </div>
    );
};

export default Login;