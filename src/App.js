import React from 'react';
import RegistrationForm from './pages/RegistrationForm';
import Layout from './components/Layout';
import './App.css';

function App() {
  return (
    <div className="App">
      <Layout>
        <RegistrationForm />
      </Layout>
    </div>
  );
}

export default App;