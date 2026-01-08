import {Link} from 'react-router-dom'
import styles from "./login.module.css"
function login () {

      // Access the classes using dot notation (styles.button)
     //  return <button className={styles.button}>Click Me</button>;

    return (
        <div className="container flex flex-col justify-center content-center text-center bg-gray-100 rounded-2xl m-10 p-10 w-md mx-auto gap-">

            <div className='mb-5'>
                <h1 className='text-2xl font-medium'>Log in</h1>
                <p className='text-sm'>Don't have an account? <Link to={"/signup"} className='underline text-sm'>Sign Up</Link></p>
            </div>

            <div className="optional_auth flex flex-col gap-5">

                <button className=''>
                    <a href="" className='flex justify-center content-center border rounded-full p-3 gap-2'>
                        <img src="google-color.svg" alt="google-logo" className={styles.google_logo} />Continue with Google</a>
                </button>

                <button className=''>
                    <a href="" className='flex justify-center content-center border rounded-full p-3 gap-2'> 
                        <img src="apple-color.svg" alt="apple-logo"  className={styles.apple_logo}/>Continue with Apple</a>
                </button>

            </div>
            
            <div className="flex items-center my-5">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-sm text-gray-500">OR</span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className=''>
                <form action="" method='post' className='flex flex-col'>

                    <label htmlFor="email"  className='text-start text-gray-700'>Your Email</label>
                    <input type="email" name='email' id='email' className='border rounded-xl text-gray-400 p-3'/>

                    <label htmlFor="password" className='text-start text-gray-700'>Your password</label>
                    <input type="password" name="password" id="password" className='border rounded-xl text-gray-400 p-3 ' />

                    <p className='text-end underline m-3'> <Link to={"/password/reset"}>Forgot your password?</Link></p>

                    <button className='bg-gray-300 p-3 rounded-full text-white point cursor-pointer'>Log In</button>
                </form>
            </div>

        </div>
    );
};

export default login;