import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import InputForm from '../components/InputForm';
import InputFormPasswordGroup from '../components/InputFormPasswordGroup';
import MyHead from '../components/MyHead';
import Navbar from '../components/Navbar';
import PrimaryButton from '../components/PrimaryButton';
import Welcome from '../components/Welcome';
import { getLoginUser, loginUser } from '../services/auth.service';
import { Constants } from '../utils/constants';
import { setItem } from '../utils/tokenStorage';

const Login = () => {
  const user = useQuery([Constants.queries.getMe], getLoginUser);
  const router = useRouter();
  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const [showHidePassword, setShowHidePassword] = useState(true);
  const [loginValues, setLoginValues] = useState({
    email: '',
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
      setItem('jwtToken', e.data.token);
      router.push('/');
    },
    onError(error: AxiosError) {
      setLoginErrorMessage(error.message + '. Try again later.');
    },
  });

  const submitHadler = async (e: any) => {
    e.preventDefault();
    mutation.mutate(loginValues as any);
  };
  return (
    <>
      <Navbar user={user.data?.data} />
      <div className="md:max-w-[80%] w-[100%] lg:max-w-[60%] m-auto items-center justify-center flex flex-col">
        <MyHead title="Happy Quizy - Login" />
        <Welcome />
        <form
          onSubmit={submitHadler}
          className="w-[80%] lg:w-[50%] h-[60%] bg-neutral-800 items-start justify-start flex flex-col p-5 gap-4"
        >
          <InputForm
            label="Email"
            name="email"
            pattern='^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
            required={true}
            errorMessage="Email is not valid!"
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
    </>
  );
};

export default Login;
