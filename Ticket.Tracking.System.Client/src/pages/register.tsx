import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';
import Checkbox from '../components/Checkbox';
import InputForm from '../components/InputForm';
import MyHead from '../components/MyHead';
import PrimaryButton from '../components/PrimaryButton';
import Welcome from '../components/Welcome';
import { RegisterInterface } from '../models/auth.model';
import { registerUser } from '../services/auth.service';
import { setItem } from '../utils/tokenStorage';

const Register = () => {
  const router = useRouter();
  const initialValues: RegisterInterface = {
    name: '',
    email: '',
    password: '',
    roleName: '',
  };
  // const [showHidePassword, setShowHidePassword] = useState(true);
  const [registerValues, setRegisterValues] =
    useState<RegisterInterface>(initialValues);
  const [checkbox, setCheckbox] = useState(false);

  const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === 'checkbox') {
      setCheckbox(e.target.checked);
    }
    setRegisterValues({
      ...registerValues,
      [e.target.name]:
        e.target.type === 'checkbox'
          ? e.target.checked
            ? 'Admin'
            : ''
          : e.target.value,
    });
  };

  const mutation = useMutation(registerUser, {
    onSuccess: (e) => {
      setItem('jwtToken', e.data.token);
      router.push('/');
    },
  });

  const submitHadler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, password, roleName } = registerValues;
    mutation.mutate({
      name,
      email,
      password,
      roleName,
    } as any);
  };
  return (
    <div className="md:max-w-[80%] w-[100%] lg:max-w-[60%] m-auto items-center justify-center flex flex-col">
      <MyHead title="Happy Quizy - Register" />
      <Welcome />
      <form
        onSubmit={submitHadler}
        action=""
        className="w-[100%] lg:w-[50%] h-[60%] bg-neutral-800 items-start justify-start flex flex-col p-5 gap-4"
      >
        <InputForm
          label="Name"
          name="name"
          onChange={onchangeHandler}
          errorMessage="Name should be 3-16 characters and shouldn't include any special character!"
          pattern="^[A-Za-z0-9]{3,16}$"
          required={true}
        />
        <InputForm
          label="Email"
          type="email"
          name="email"
          onChange={onchangeHandler}
          pattern='^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
          required={true}
          errorMessage="Email is not valid!"
        />
        <InputForm
          label="Password"
          required={true}
          name="password"
          onChange={onchangeHandler}
          errorMessage="Password should be 4-20 characters and include at least 1 letter, 1 number and 1 special character!"
          pattern={`^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{4,20}$`}
          type="password"
        />
        <InputForm
          label="Confirm Password"
          name="confirmPassword"
          errorMessage="Passwords don't match!"
          pattern={registerValues.password}
          required={true}
          type="password"
        />
        <Checkbox
          label="Admin"
          onChange={onchangeHandler}
          name="roleName"
          checked={checkbox}
        />
        <div className="flex items-center justify-center w-full mt-5">
          <PrimaryButton
            type="submit"
            text="Register"
            isLoading={mutation.isLoading}
          />
        </div>
      </form>
      <div className="flex items-center justify-center w-full mt-5">
        <p className="text-white">Already have an account ?</p>
        <div className="w-3"></div>
        <Link href="/login">
          <span className="text-lg text-blue-700 font-bold">Login</span>
        </Link>
      </div>
    </div>
  );
};

export default Register;
