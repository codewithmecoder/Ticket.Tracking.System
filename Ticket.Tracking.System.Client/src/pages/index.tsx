import { useQuery } from '@tanstack/react-query';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import MyHead from '../components/MyHead';
import { getLoginUser } from '../services/auth.service';
import { Constants } from '../utils/constants';
import { getItem } from '../utils/tokenStorage';

const Home: NextPage = () => {
  const user = useQuery([Constants.queries.getMe], getLoginUser);
  const router = useRouter();
  useEffect(() => {
    var token = getItem('jwtToken');
    if (!token) router.push('/login');
  }, []);

  return (
    <div className="md:max-w-[80%] w-[100%] lg:max-w-[60%] m-auto">
      <MyHead title="Happy Quizy Admin" />
      <p>Hello My name is Happy Quiz</p>
      {/* <div>{JSON.stringify(userData, null, 2)}</div> */}
    </div>
  );
};

export default Home;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const data = await fetcher(`/api/v1/user`, context.req.headers);
//   return { props: { userData: data } };
// };
