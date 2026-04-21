import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Agent');

  const handleLogin = (e) => {
    e.preventDefault();
    const userData = { email, role, loggedIn: true };
    localStorage.setItem('crm_user', JSON.stringify(userData));
    window.location.href = "/"; // Redirect to dashboard
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <form onSubmit={handleLogin} className="bg-white p-10 rounded-2xl shadow-2xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">CRM Login</h2>
        <input 
          type="email" placeholder="Email" required
          className="w-full p-3 border rounded mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />
        <select 
          className="w-full p-3 border rounded mb-6"
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="Agent">Agent</option>
          <option value="Admin">Admin</option>
        </select>
        <button className="w-full bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-700">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;