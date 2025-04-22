import React, { useState } from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Alert from '../components/Alert';
import './RegistrationForm.css';
import axios from 'axios';


function RegistrationForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleLogin = async () => {
        console.log("Login button clicked");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await axios.post('http://localhost:8080/register', {
                email,
                password,
                name,
                surname,
                dateOfBirth,
                phoneNumber
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });


            if (response.status === 201) {
                setSuccessMessage('Registration successful!');
                setEmail('');
                setPassword('');
                setName('');
                setSurname('');
                setDateOfBirth('');
                setPhoneNumber('');
            } else {
                setErrorMessage(`Registration failed: ${response.status} - ${response.statusText}`);
            }

        } catch (error) {
            console.error('Registration error:', error);
            if (error.response) {
                setErrorMessage(`Registration failed: ${error.response.status} - ${error.response.data}`);
            } else if (error.request) {
                setErrorMessage('Registration failed: No response from server');
            } else {
                setErrorMessage('Registration failed: An unexpected error occurred');
            }
        }
    };

    return (
        <>
            <h1>Client Registration Form</h1>
            {successMessage && <Alert message={successMessage} type="success" />}
            {errorMessage && <Alert message={errorMessage} type="error" />}

            <form onSubmit={handleSubmit} className="form-container">
                <InputField
                    label="Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <InputField
                    label="Surname"
                    type="text"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    required
                />
                <InputField
                    label="Date of Birth"
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    required
                />
                <InputField
                    label="Phone Number"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                />
                <InputField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <InputField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                   {/* Кнопки */}
                   <Button type="button" className="form-button">Register now</Button>
                   <Button type="button" onClick={handleLogin} className="form-button">Login</Button>

            </form>
        </>
    );
}

export default RegistrationForm;