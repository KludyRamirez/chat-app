import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  handleLogin,
}) => {
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [tacIsChecked, setTacIsChecked] = useState(false);

  const validateUsername = (value) => {
    if (value.length < 3) {
      setUsernameError('Username must be at least 3 characters long.');
    } else if (value.length > 24) {
      setUsernameError('Username must be at most 24 characters long.');
    } else {
      setUsernameError('');
    }
  };

  const validatePassword = (value) => {
    if (value.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
    } else if (value.length > 24) {
      setPasswordError('Password must be at most 24 characters long.');
    } else {
      setPasswordError('');
    }
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    validateUsername(value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };

  const handleTacCheckboxChange = (event) => {
    setTacIsChecked(event.target.checked);
  };

  return (
    <div className="w-[55%] flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="w-100 text-blue-900 font-semibold">Username</div>
        <input
          autoFocus
          value={username}
          onChange={handleUsernameChange}
          label="Username"
          type="text"
          placeholder="Enter username"
          className={`py-3 px-4 border-[1px] rounded-[16px] w-[100%] bg-white ${
            usernameError === ''
              ? 'border-blue-100 focus:border-blue-600'
              : 'border-red-600 bg-red-100'
          } focus:outline-none`}
        />
        {usernameError && (
          <p className="text-red-500 text-[14px] mt-1">{usernameError}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <div className="w-100 text-blue-900 font-semibold">Password</div>
        <input
          value={password}
          onChange={handlePasswordChange}
          label="Password"
          type="password"
          placeholder="Enter password"
          className={`py-3 px-4 border-[1px] rounded-[16px] w-[100%] ${
            passwordError === ''
              ? 'bg-white border-blue-100 focus:border-blue-600'
              : 'border-red-600 bg-red-100'
          } focus:outline-none`}
        />
        {passwordError && (
          <p className="text-red-500 text-[14px] mt-1">{passwordError}</p>
        )}
      </div>
      <div className="mt-[-2px] px-1 w-100 flex justify-between items-center">
        <div className="flex justify-center items-center gap-2">
          <input
            type="checkbox"
            checked={tacIsChecked}
            onChange={handleTacCheckboxChange}
          />
          <div className=" text-[14px] text-blue-900">
            Remember <span className="font-normal">Me</span>
          </div>
        </div>
        <Link
          to="/forgot"
          className="text-[#ff3131] text-[14px] hover:underline"
        >
          Forgot password?
        </Link>
      </div>
      <div className="mt-[-2px]">
        <button
          onClick={handleLogin}
          disabled={
            usernameError !== '' ||
            passwordError !== '' ||
            username === '' ||
            password === ''
          }
          className={`p-3 border-[1px] border-blue-100 rounded-[16px] w-[100%] 
    bg-blue-600 transition-opacity duration-200 font-semibold text-white shadow-sm
    disabled:bg-white disabled:border-blue-300 disabled:opacity-50 disabled:text-blue-500`}
        >
          Sign In
        </button>
      </div>
      <div className="mt-[10px] text-blue-900">
        Don't have an account ?{' '}
        <span className="text-blue-900 font-semibold cursor-pointer hover:underline">
          Sign Up
        </span>
      </div>
    </div>
  );
};

export default LoginForm;
