import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getActions } from '../store/actions/AuthAction';
import LoginForm from '../components/login/LoginForm';

const Login = ({ setLoading }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { login } = getActions(dispatch);

  const handleLogin = async () => {
    const userDetails = {
      username,
      password,
    };

    try {
      setLoading(true);
      await login(userDetails, navigate);
      setUsername('');
      setPassword('');
      setLoading(false);
    } catch (error) {
      setUsername('');
      setPassword('');
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[40%] h-screen flex justify-center items-center">
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      </div>
      <div className="w-[60%] h-screen pt-24 pb-24 pl-1 pr-24 flex justify-center items-center">
        <div className="w-[100%] h-[100%] bg-blue-600 rounded-[32px] shadow-lg"></div>
      </div>
    </div>
  );
};

export default Login;
