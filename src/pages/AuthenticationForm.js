import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Alert from '../components/Alert';
import './styles.css';
import axios from 'axios';

function AuthenticationForm() {
         const [email, setEmail] = useState('');
         const [password, setPassword] = useState('');
         const [errorMessage, setErrorMessage] = useState('');
         const [successMessage, setSuccessMessage] = useState('');
         const navigate = useNavigate();


        const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');


         try {
              const response = await axios.post('http://localhost:8080/login', {
                email: email,
                password: password,
                },
                {
                headers: {
                'Content-Type': 'application/json'
                }
                });

                          if (response.status === 200) {
                                         setSuccessMessage('Authentication successful!');
                                         setEmail('');
                                         setPassword('');

                                         navigate('/');
                                         }
                                         }catch (error) {
                                                          console.error('Authentication error:', error);
                                                          if (error.response) {
                                                              if (error.response.status === 401) {
                                                                  setErrorMessage(error.response.data.message);
                                                              } else if (error.response.status === 404) {
                                                                  setErrorMessage(error.response.data.message);
                                                              } else if (error.response.status === 400) {
                                                                 setErrorMessage(error.response.data.message);
                                                              }
                                                              else {
                                                                  setErrorMessage(`Registration failed: ${error.response.status} - ${error.response.data}`);
                                                              }
                                                          } else if (error.request) {
                                                              setErrorMessage('Authentication failed: No response from server');
                                                          } else {
                                                              setErrorMessage('Authentication failed: An unexpected error occurred');
                                                          }
                                                 }
                                             };
  return (
        <>
            <h1>Client Authentication Form</h1>
            {successMessage && <Alert message={successMessage} type="success" />}
            {errorMessage && <Alert message={errorMessage} type="error" />}

            <form onSubmit={handleSubmit} className="form-container">
            <InputField
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Enter your email"


                            />
                            <InputField
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Enter your password"


                            />
                            {/* Кнопки */}

                             <Button type="submit" className="form-button">Login</Button>
                             <Button type="button" onClick={() => navigate('/register')} className="form-button">Register now</Button>
                       </form>
                    </>
                );
            }

            export default AuthenticationForm;


