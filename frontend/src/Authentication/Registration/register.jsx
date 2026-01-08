
import {Link} from 'react-router-dom'
import styles from './register.module.css'
function Register(){

    return (

        <div className="container flex flex-col justify-center content-center bg-gray-100 rounded-2xl m-10 w-md p-10 mx-auto gap-5">
            <div>
                <h1 className='text-2xl font-medium'>Welcome to Formly</h1>
                <p className='text-sm'>Alrady have an account? <Link to={"/login"} className='text-sm underline'>Log in</Link></p>
            </div>

            <div className='optional_auth flex flex-col gap-5'>
                <button className=''>
                    <a href="" className='flex justify-center content-center border rounded-full p-3 gap-2'>
                        <img src="google-color.svg" alt="" className={styles.google_logo}/>Signup with Google</a>
                </button>

                <button className=''>
                    <a href="" className='flex justify-center content-center border rounded-full p-3 gap-2'>
                        <img src="apple-color.svg" alt="" className={styles.apple_logo} />Signup with Apple</a>
                </button>

            </div>

            <div className="flex items-center my-5">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className='mx-4 text-sm text-gray-500'>OR</span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className=''>
                <form action="" method='POST' className='flex flex-col'>
                    <label htmlFor="email" className='text-start text-gray-700'>Email</label>
                    <input type="email" id='email' name='email' className='border rounded-xl text-gray-400 p-3' />

                    <label htmlFor="password" className='text-start text-gray-700'>Password</label>
                    <input type="password" id='password' name='password' className='border rounded-xl text-gray-400 p-3' />
                </form>

                <button className='bg-gray-300 w-full mt-5 p-3 rounded-full cursor-pointer'>
                    <a href="" className='text-white font-medium'>Sign up</a>
                </button>
            </div>
        </div>
    );
};

export default Register;