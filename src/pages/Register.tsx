import React from 'react';
import RegisterForm from '../components/forms/RegisterForm';

const Register: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Create an Account</h2>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
