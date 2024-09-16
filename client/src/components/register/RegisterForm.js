import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsBoxArrowUpRight, BsGithub, BsGoogle } from 'react-icons/bs';

const RegisterForm = ({
  username,
  setUsername,
  password,
  setPassword,
  handleRegister,
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
    <div className="w-[70%] flex flex-col gap-8">
      <div className="w-[100%] flex flex-col items-start gap-8">
        <div className="w-[100%] flex flex-col items-start gap-4">
          <div className="w-[100%] flex justify-start items-end">
            <div className="w-[200px] h-[46px] bg-blue-700 rounded-[2px]">
              <span className="text-[48px] text-white">What's </span>
            </div>
            <div className="w-[200px] h-[46px] bg-red-700 rounded-[2px] mb-[46px]">
              <span className="text-[48px] text-white">new</span>
            </div>
            <div className="w-[200px] h-[46px] bg-orange-500 rounded-[2px]">
              <span className="text-[48px] text-white">with you</span>
            </div>
          </div>

          <span className="text-[16px] text-blue-900">
            Enter credentials to access your account
          </span>
        </div>
        <div className="w-[100%] flex justify-between items-center">
          <div className="group cursor-pointer w-[254px] h-[54px] border-[1px] rounded-[16px] shadow-sm flex justify-center items-center gap-4 bg-white border-gray-300 hover:bg-blue-700 hover:border-blue-700">
            <BsGoogle className="text-[20px] text-blue-900 group-hover:text-white" />
            <span className="text-[14px] text-blue-900 group-hover:text-white">
              Sign in with Google
            </span>
          </div>
          <div className="group cursor-pointer w-[254px] h-[54px] border-[1px] rounded-[16px] shadow-sm flex justify-center items-center gap-4 bg-white border-gray-300 hover:bg-blue-700 hover:border-blue-700">
            <BsGithub className="text-[22px] text-blue-900 group-hover:text-white" />
            <span className="text-[14px] text-blue-900 group-hover:text-white">
              Sign in with GitHub
            </span>
          </div>
        </div>

        <div className="w-[100%] flex justify-center items-center gap-4">
          <div className="w-[50%] h-[1px] bg-gray-200"></div>
          <span className="text-blue-900 font-semibold"> or </span>
          <div className="w-[50%] h-[1px] bg-gray-200"></div>
        </div>
      </div>
      <div className="w-[100%] flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <div className="w-100 text-blue-900 font-semibold">Username</div>
          <input
            autoFocus
            value={username}
            onChange={handleUsernameChange}
            label="Username"
            type="text"
            placeholder="Enter username"
            className={`py-3 px-4 border-[1px] rounded-[16px] w-[100%] ${
              usernameError === ''
                ? 'bg-white border-gray-300 focus:border-blue-600'
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
                ? 'bg-white border-gray-300 focus:border-blue-600'
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
              I agree to{' '}
              <span className="cursor-pointer font-semibold hover:underline">
                Terms and Conditions
              </span>
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
            onClick={handleRegister}
            disabled={
              usernameError !== '' ||
              passwordError !== '' ||
              username === '' ||
              password === ''
            }
            className={`p-3 border-[2px] border-blue-600 rounded-[16px] w-[100%] 
    bg-blue-600 transition-opacity duration-200 font-semibold text-white shadow-md`}
          >
            Sign Up
          </button>
        </div>
        <div className="flex justify-start items-center gap-2">
          <span className="text-blue-900">Already have account?</span>
          <Link to="/">
            <div className="flex justify-start items-center gap-2 cursor-pointer hover:underline">
              <span className="text-blue-900 font-semibold">Sign In</span>
              <BsBoxArrowUpRight className="mt-[-2px] text-blue-900 text-[16px]" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
