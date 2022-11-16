import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Link from 'next/link';
import Router from 'next/router';
import { ChangeEvent, useState } from 'react';
import InputForm from '../components/InputForm';
import InputFormPasswordGroup from '../components/InputFormPasswordGroup';
import MyHead from '../components/MyHead';
import PrimaryButton from '../components/PrimaryButton';
import Welcome from '../components/Welcome';
import { BaseResponse } from '../models/baseResponse.model';
import { MessageResponseModel } from '../models/messageResponse.model';
import { loginUser } from '../services/auth.service';

const Login = () => {
  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const [showHidePassword, setShowHidePassword] = useState(true);
  const [loginValues, setLoginValues] = useState({
    username: '',
    password: '',
  });

  const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginValues({
      ...loginValues,
      [e.target.name]: e.target.value,
    });
  };

  const mutation = useMutation(loginUser, {
    onSuccess: (e) => {
      if (e.data?.data?.user?.isAdmin) {
        setLoginErrorMessage('');
        Router.push('/');
      } else {
        setLoginErrorMessage('Only admin user can login to this!');
      }
    },
    onError(error: AxiosError) {
      if (error.code === 'ERR_NETWORK')
        setLoginErrorMessage(error.message + '. Try again later.');
      else {
        const data = error.response?.data as BaseResponse<MessageResponseModel>;
        setLoginErrorMessage(data.data.message);
      }
    },
  });

  const submitHadler = (e: any) => {
    e.preventDefault();
    mutation.mutate(loginValues as any);
  };
  return (
    <div className="md:max-w-[80%] w-[100%] lg:max-w-[60%] m-auto items-center justify-center flex flex-col">
      <MyHead title="Happy Quizy - Login" />
      <Welcome />
      <form
        onSubmit={submitHadler}
        className="w-[80%] lg:w-[50%] h-[60%] bg-neutral-800 items-start justify-start flex flex-col p-5 gap-4"
      >
        <InputForm
          label="Username"
          name="username"
          errorMessage="Username should be 3-16 characters and shouldn't include any special character!"
          pattern="^[A-Za-z0-9]{3,16}$"
          required={true}
          onChange={onchangeHandler}
        />
        <InputFormPasswordGroup
          required={true}
          name="password"
          label="Password"
          setShowHidePassword={setShowHidePassword}
          showHidePassword={showHidePassword}
          errorMessage="Password cannot be empty!"
          pattern="^^(?!\s*$).+"
          onChange={onchangeHandler}
        />
        <p className="text-red-500">{loginErrorMessage}</p>
        <div className="flex items-center justify-center w-full mt-5">
          <PrimaryButton type="submit" text="Login" />
        </div>
      </form>
      <div className="flex items-center justify-center w-full mt-5">
        <p className="text-white">{`Don't have an account yet ?`}</p>
        <div className="w-3"></div>
        <Link href="/register">
          <span className="text-lg text-blue-700 font-bold">Register</span>
        </Link>
      </div>
    </div>
  );
};

export default Login;
