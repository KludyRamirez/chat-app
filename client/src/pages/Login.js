import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getActions } from '../store/actions/AuthAction';
import LoginForm from '../components/login/LoginForm';
import nezuko from '../assets/images/nezuko.jpg';
import drac from '../assets/images/drac.png';
import crown from '../assets/images/crown.png';
import {
  BsBookmark,
  BsChatSquare,
  BsGlobeAmericas,
  BsHeart,
  BsSend,
  BsThreeDots,
} from 'react-icons/bs';

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
      <div className="w-[40%] h-screen flex justify-center items-center pt-[60px]">
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      </div>
      <div className="w-[60%] h-screen pt-20 pl-1">
        <div className="relative w-[100%] h-[100%] bg-gradient-to-br from-blue-800 via-blue-800 to-blue-600 rounded-tl-[24px] flex flex-col justify-start pt-12 px-12 gap-8">
          <div className="absolute inset-0 before:absolute before:w-full before:h-full before:bg-vignette-circular-left before:z-10"></div>
          <div className="absolute inset-0 after:absolute after:w-full after:h-full after:bg-vignette-circular-right after:z-10"></div>

          <div className="relative w-[200px] mb-[96px] mt-[28px]">
            <span className="text-[46px] text-white">Highlights</span>
            <div className="absolute top-[-42px] left-[0px] flex items-center gap-2">
              <div className=" w-[14px] h-[14px] rounded-[50%] bg-white"></div>
              <div className=" w-[14px] h-[14px] rounded-[10%] bg-white"></div>
              <div className=" w-[14px] h-[14px] rounded-[50%] bg-white"></div>
            </div>
          </div>
          <div className="w-[100%] h-[100%] flex justify-center items-center">
            <div className="w-[23%] h-[100%] flex flex-col items-end px-12 gap-4"></div>
            <div className="relative w-[54%] h-[100%]">
              <div className="z-30 w-[100%] h-[100%] bg-[#fafafa] rounded-tl-[36px] rounded-tr-[36px] shadow-xl relative">
                <div className="flex justify-between items-start p-6">
                  <div className="flex justify-start items-center gap-3">
                    <img src={drac} className="w-[50px] h-[50px]" />
                    <div className="flex flex-col justify-center">
                      <span className="text-black font-semibold">
                        Kludy Ramirez
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[14px] text-black">4m</span>
                        <BsGlobeAmericas className="text-[14px] text-black" />
                      </div>
                    </div>
                  </div>
                  <BsThreeDots className="text-[24px]" />
                </div>
                <div className="w-[100%] px-6 mb-[20px]">
                  <span className="text-[14px] text-black">Nezuko uwu</span>
                </div>
                <div className="w-[100%] h-[400px] mb-[20px]">
                  <img
                    src={nezuko}
                    alt=""
                    className="w-[100%] h-[100%] object-cover"
                  />
                </div>
                <div className="w-[100%] flex justify-between items-center">
                  <div className="flex items-center justify-start px-6 gap-6">
                    <BsHeart className="text-[24px] text-black" />
                    <BsChatSquare className="text-[24px] text-black" />
                    <BsSend className="text-[24px] text-black" />
                  </div>
                  <div className="flex items-center justify-start px-6 gap-6">
                    <BsBookmark className="text-[24px] text-black" />
                  </div>
                </div>
              </div>

              <div className="cursor-pointer absolute top-[-186px] left-[325px] w-[400px] h-[426px] bg-[#fafafa] shadow-xl rounded-[16px] z-10 hover:z-40 transition-transform duration-500 ease-in-out transform hover:scale-105 flex flex-col">
                <div className="w-[100%] flex justify-center items-center gap-4 px-4 border-b-[1px] border-gray-300">
                  <div className="w-[20%] h-[54px] flex justify-center items-center border-b-[4px] border-blue-600 font-semibold text-[15px]">
                    For you
                  </div>
                  <div className="w-[20%] h-[54px] flex justify-center items-center text-[15px]">
                    Trends
                  </div>
                  <div className="w-[20%] h-[54px] flex justify-center items-center text-[15px]">
                    News
                  </div>
                  <div className="w-[20%] h-[54px] flex justify-center items-center text-[15px]">
                    Sports
                  </div>
                </div>
                <div className="w-[100%] flex flex-col">
                  <div className="w-[100%] flex flex-col items-start p-4 border-b-[1px] border-gray-300">
                    <div className="w-[100%] flex justify-start items-start text-[12px]">
                      1 • Soccer • Trending
                    </div>
                    <div className="w-[100%] flex justify-start items-start font-bold">
                      Messi
                    </div>
                    <div className="w-[100%] flex justify-start items-start text-[12px]">
                      457K posts
                    </div>
                  </div>
                  <div className="w-[100%] flex flex-col items-start p-4 border-b-[1px] border-gray-300">
                    <div className="w-[100%] flex justify-start items-start text-[12px]">
                      2 • Gaming • Trending
                    </div>
                    <div className="w-[100%] flex justify-start items-start font-bold">
                      Genshin
                    </div>
                    <div className="w-[100%] flex justify-start items-start text-[12px]">
                      568K posts
                    </div>
                  </div>
                  <div className="w-[100%] flex flex-col items-start p-4 border-b-[1px] border-gray-300">
                    <div className="w-[100%] flex justify-start items-start text-[12px]">
                      3 • Casino • Trending
                    </div>
                    <div className="w-[100%] flex justify-start items-start font-bold">
                      Alice Guo
                    </div>
                    <div className="w-[100%] flex justify-start items-start text-[12px]">
                      232K posts
                    </div>
                  </div>
                  <div className="w-[100%] flex flex-col items-start p-4">
                    <div className="w-[100%] flex justify-start items-start text-[12px]">
                      4 • Disney • Trending
                    </div>
                    <div className="w-[100%] flex justify-start items-start font-bold">
                      Mickey Mouse
                    </div>
                    <div className="w-[100%] flex justify-start items-start text-[12px]">
                      123K posts
                    </div>
                  </div>
                </div>
              </div>

              <div className="cursor-pointer absolute top-[-80px] left-[-160px] w-[300px] h-[350px] shadow-xl rounded-[24px] bg-[#fafafa] z-10 hover:z-40 transition-transform duration-500 ease-in-out transform hover:scale-105 flex justify-center items-center"></div>
            </div>

            <div className="w-[23%] h-[100%] flex flex-col items-end"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
