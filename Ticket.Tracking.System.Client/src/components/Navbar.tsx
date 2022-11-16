import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { BiMenu } from 'react-icons/bi';
import { HiOutlineXMark } from 'react-icons/hi2';
import { CurrentUserResponse } from '../models/user.model';
import { isAdmin, removeItem } from '../utils/tokenStorage';

const Navbar: NextPage = () => {
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);
  const openMenuHandler = () => setOpenMenu((prev) => !prev);

  const [userdata, setUserdata] = useState<CurrentUserResponse | null>();
  // const user = useQuery([Constants.queries.getMe], getLoginUser);
  // const userdata: CurrentUserResponse = user.data?.data;
  // fetcher<CurrentUserResponse>('/api/auth/me', {
  //   headers: { Authorization: `bearer ${getItem('jwtToken')}` },
  // }).then((data) => setUserdata(data));
  // useEffect(() => {
  //   var token = getItem('jwtToken');
  //   if (!token) router.push('/login');
  // }, []);
  // console.log(userdata);

  const logOut = () => {
    removeItem('jwtToken');
    router.push('/register');
  };
  return (
    <div className="m-auto md:max-w-[80%] lg:max-w-[60%] bg-neutral-800 w-[100%] max-h-14 h-14 rounded-md flex items-center justify-between px-2">
      <div>
        <p className="text-gray-300 hover:text-white">
          <Link href="/">
            <b>Ticket Tracking System</b>
          </Link>
        </p>
      </div>
      <div className="hidden md:flex gap-10">
        <p className="text-gray-400 hover:text-white">
          <Link href="/quiz">Tickets</Link>
        </p>
        {isAdmin(userdata?.userRoles) && (
          <p className="text-gray-400 hover:text-white">
            <Link href="/users">Settings</Link>
          </p>
        )}

        <p className="text-gray-400 hover:text-white cursor-pointer">
          {!userdata?.userName ? (
            <Link href="/login">Login</Link>
          ) : (
            <span onClick={logOut}>
              Welcome <b>{userdata?.userName}</b> /Logout
            </span>
          )}
        </p>
      </div>
      <div className="cursor-pointer relative md:hidden">
        {openMenu ? (
          <HiOutlineXMark
            className="h-8 w-8 text-gray-400 hover:text-white"
            onClick={openMenuHandler}
          />
        ) : (
          <BiMenu
            className="h-8 w-8 text-gray-400 hover:text-white"
            onClick={openMenuHandler}
          />
        )}

        <div
          className={`${
            openMenu ? 'flex' : 'hidden'
          } flex flex-col md:hidden gap-5 absolute right-8 top-0 bg-neutral-800 p-5 rounded-md`}
        >
          <p className="text-gray-400 hover:text-white">
            <Link href="/quiz">Tickets</Link>
          </p>
          <p className="text-gray-400 hover:text-white">
            <Link href="/users">Settings</Link>
          </p>
          <p className="text-gray-400 hover:text-white">
            {!userdata?.userName ? (
              <Link href="/login">Login</Link>
            ) : (
              <span onClick={logOut}>
                Welcome <b>{userdata?.userName}</b> /Logout
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
