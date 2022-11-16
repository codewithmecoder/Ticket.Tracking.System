import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { getLoginUser } from '../services/auth.service';
import { Constants } from '../utils/constants';
import { getItem } from '../utils/tokenStorage';

const Ticket = () => {
  const router = useRouter();
  const user = useQuery([Constants.queries.getMe], getLoginUser);
  useEffect(() => {
    var token = getItem('jwtToken');
    if (!token) router.push('/login');
  }, []);
  return (
    <>
      <Navbar user={user.data?.data} />
    </>
  );
};

export default Ticket;
