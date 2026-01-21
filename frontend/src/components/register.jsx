
import {Link} from 'react-router-dom'
import api from '../api';
import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';


function Register(){
    const [message, SetMessage] = useState("");
    const [FormData, setFormData] = useState({email: "", password: ""});
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handelChange = (e) => {
        setFormData({...FormData, [e.target.name]: e.target.value});
    }

    const handelSubmit = async (e) => {
        e.preventDefault();
        try{
            await api.post('/api/register/user', FormData);
            SetMessage("Signup Successful!")
        }catch{
            setError("Something went wrong.");
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
    };

    return (
        
        <div className="container flex flex-col justify-center content-center bg-gray-100 rounded-2xl m-10 w-md p-10 mx-auto gap-5">
            {message && error(<p className='mb-5 bg-green-300 p-5 rounded-full text-white font-medium'>{message}</p>

            )}
            <div>
                <h1 className='text-2xl font-medium'>Welcome to Formly</h1>
                <p className='text-sm'>Already have an account? <Link to={"/login"} className='text-sm underline'>Log in</Link></p>
            </div>

            <div className='optional_auth flex flex-col gap-5'>
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
                <span className='mx-4 text-sm text-gray-500'>OR</span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className=''>
                <form  method='POST' className='flex flex-col' onSubmit={handelSubmit}>
                    <label htmlFor="email" className='text-start text-gray-700'>Email</label>
                    <input type="email" id='email' name='email' className='border rounded-xl text-gray-400 p-3' onChange={handelChange} />

                    <label htmlFor="password" className='text-start text-gray-700'>Password</label>
                    <input type="password" id='password' name='password' className='border rounded-xl text-gray-400 p-3' onChange={handelChange} />


                    <button className='bg-gray-400 w-full mt-5 p-3 rounded-full cursor-pointer text-white font-medium'>Sign up</button>
                    
                    { error && (
                    <p className='mt-5 bg-red-300 p-5 rounded-full text-white font-medium text-center'>{error}</p>
                    )} 
                </form>
            </div>
        </div>
    );
};

export default Register;