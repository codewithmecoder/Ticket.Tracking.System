import { GetServerSideProps } from 'next';
import MyHead from '../components/MyHead';
import fetcher from '../utils/fetcher';

const Users = () => {
  return (
    <div className="md:max-w-[80%] w-[100%] lg:max-w-[60%] m-auto">
      <MyHead title="Happy Quizy - Users" />
      <div className="text-lg text-white font-bold">Users</div>
    </div>
  );
};

export default Users;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await fetcher(`/api/v1/user`, context.req.headers);
  return { props: { userData: data } };
};
