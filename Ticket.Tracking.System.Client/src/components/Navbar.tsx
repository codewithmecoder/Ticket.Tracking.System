import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BiMenu } from 'react-icons/bi';
import { HiOutlineXMark } from 'react-icons/hi2';
import { CurrentUserResponse } from '../models/user.model';
import { getItem, isAdmin, removeItem } from '../utils/tokenStorage';

interface Props {
  user: CurrentUserResponse;
}

const Navbar = ({ user }: Props) => {
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);
  const openMenuHandler = () => setOpenMenu((prev) => !prev);
  useEffect(() => {
    var token = getItem('jwtToken');
    if (!token) router.push('/login');
  }, []);

  const logOut = () => {
    removeItem('jwtToken');
    router.push('/login');
  };
  return (
    <div className="m-auto md:max-w-[90%] lg:max-w-[80%] bg-neutral-800 w-[100%] max-h-14 h-14 rounded-md flex items-center justify-between px-2">
      <div>
        <p className="text-gray-300 hover:text-white">
          <Link href="/">
            <b>Ticket Tracking System</b>
          </Link>
        </p>
      </div>
      <div className="hidden md:flex gap-10">
        <p className="text-gray-400 hover:text-white">
          <Link href="/ticket">Tickets</Link>
        </p>
        {isAdmin(user?.userRoles) && (
          <p className="text-gray-400 hover:text-white">
            <Link href="/settings">Settings</Link>
          </p>
        )}

        <p className="text-gray-400 hover:text-white cursor-pointer">
          {!user?.userName ? (
            <Link href="/login">Login</Link>
          ) : (
            <span onClick={logOut}>Logout</span>
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
            <Link href="/ticket">Tickets</Link>
          </p>
          <p className="text-gray-400 hover:text-white">
            <Link href="/settings">Settings</Link>
          </p>
          <p className="text-gray-400 hover:text-white">
            {!user?.userName ? (
              <Link href="/login">Login</Link>
            ) : (
              <span onClick={logOut}>Logout</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
