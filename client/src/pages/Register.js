import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getActions } from '../store/actions/AuthAction';
import RegisterForm from '../components/register/RegisterForm';

const Register = ({ setLoading }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const { register } = getActions(dispatch);

  const handleRegister = () => {
    const userDetails = {
      username,
      password,
    };

    try {
      setLoading(true);
      register(userDetails);
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
        <RegisterForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleRegister={handleRegister}
        />
      </div>
      <div className="w-[60%] h-screen pt-24 pb-24 pl-1 pr-24">
        <div className="w-[100%] h-[100%] bg-blue-600 rounded-[32px] shadow-lg flex justify-start items-start pt-20 px-16">
          <span className="The simplest way to locate real-time news events"></span>
        </div>
      </div>
    </div>
  );
};

export default Register;
