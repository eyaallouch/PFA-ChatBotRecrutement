import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TEInput, TERipple } from "tw-elements-react";
import 'tw-elements-react/dist/css/tw-elements-react.min.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.post('http://localhost:3001/login', { email, password })
        .then(result => {
            console.log(result);
            if (result.data === "Candidate Success") {
                localStorage.setItem('userName', email); 
                navigate('/candidat', { state: { userName: email } });
            } else if (result.data === "Company Success") {
                localStorage.setItem('userName', email); 
                navigate('/company', { state: { userName: email } });
            } else {
                alert('Incorrect email or password! Please try again.');
            }
        })
        .catch(err => {
            console.error("Error logging in:", err);
            alert('An error occurred during login. Please try again.');
        });
    };

    return (
        <div>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="navbar-brand" href="#" style={{ color: '#ffffff', fontSize: '24px', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
            
                                               Rec-inov
                   
                </div>
            </nav>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <Link className="navbar-brand">
                        <img src="https://rec-inov.com/favicon.ico" alt="logo" width="30" height="30" className="d-inline-block align-text-top"/>
                        Rec-inov
                    </Link>
                </div>
            </nav>

            {/* Login Form */}
            <section className="h-screen">
                <div className="h-full">
                    <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
                        <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
                            <img
                                src="https://airproductionservice.com/wp-content/uploads/2021/05/Login.jpg"
                                className="w-full"
                                alt="Sample image"
                            />
                        </div>
                        <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-row items-center justify-center lg:justify-start">
                                    <p className="mb-0 mr-4 text-lg">Se connecter avec</p>
                                    <TERipple rippleColor="light">
                                        <button type="button" className="mx-1 h-9 w-9 rounded-full bg-primary text-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                                            </svg>
                                        </button>
                                    </TERipple>
                                    <TERipple rippleColor="light">
                                        <button type="button" className="mx-1 h-9 w-9 rounded-full bg-primary text-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                            </svg>
                                        </button>
                                    </TERipple>
                                    <TERipple rippleColor="light">
                                        <button type="button" className="mx-1 h-9 w-9 rounded-full bg-primary text-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                                            </svg>
                                        </button>
                                    </TERipple>
                                </div>
                                <div className="my-4 flex items-center">
                                    <div className="flex-1 border-t border-neutral-300"></div>
                                    <p className="mx-4 mb-0 text-center font-semibold">Or</p>
                                    <div className="flex-1 border-t border-neutral-300"></div>
                                </div>
                                <TEInput
                                    type="email"
                                    label="Email address"
                                    size="lg"
                                    className="mb-6"
                                    onChange={(event) => setEmail(event.target.value)}
                                    required
                                ></TEInput>
                                <TEInput
                                    type="password"
                                    label="Password"
                                    className="mb-6"
                                    size="lg"
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                ></TEInput>
                                <div className="mb-6 flex items-center justify-between">
                                    <div className="block min-h-[1.5rem] pl-[1.5rem]">
                                        <input
                                            className="float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-neutral-300 outline-none checked:bg-primary"
                                            type="checkbox"
                                            id="exampleCheck2"
                                        />
                                        <label className="inline-block pl-[0.15rem]" htmlFor="exampleCheck2">Remember me</label>
                                    </div>
                                    <a href="">Forgot password?</a>
                                </div>
                                <div className="text-center lg:text-left">
                                    <TERipple rippleColor="light">
                                        <button type="submit" className="inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white">Login</button>
                                    </TERipple>
                                    <p className="mb-0 mt-2 pt-1 text-sm font-semibold">Don't have an account? 
                                    <br /><br />
                  <Link to='/register/candidate'   className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700">Register as Candidate</Link>
                  <br />
                        <Link to='/register/company'   className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700">Register as Company</Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;