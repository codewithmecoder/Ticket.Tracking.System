import { GetServerSideProps } from 'next';
import MyHead from '../components/MyHead';
import fetcher from '../utils/fetcher';

const Dashboard = () => {
  return (
    <div className="md:max-w-[80%] w-[100%] lg:max-w-[60%] m-auto">
      <MyHead title="Dashbaord" />
      <div className="text-lg text-white font-bold">Dashbaord</div>
      {/* <RichTextEditor /> */}
    </div>
  );
};

export default Dashboard;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await fetcher(`/api/v1/user`, context.req.headers);
  return { props: { userData: data } };
};
