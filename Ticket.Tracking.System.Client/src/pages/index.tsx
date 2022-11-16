import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { BiEdit, BiTrash } from 'react-icons/bi';
import Loading from '../components/Loading';
import Modal from '../components/Modal';
import MyHead from '../components/MyHead';
import Navbar from '../components/Navbar';
import PrimaryButton from '../components/PrimaryButton';
import TextAreaForm from '../components/TextAreaForm';
import { CreateNewBugModel, TicketModel } from '../models/ticket.model';
import { getLoginUser } from '../services/auth.service';
import {
  createNewBug,
  createNewFeatureRequest,
  createNewTestCase,
  getTicket,
} from '../services/ticket.service';
import { Constants } from '../utils/constants';
import { getItem } from '../utils/tokenStorage';

const initCreateNewBugModel: CreateNewBugModel = {
  summary: '',
  description: '',
};

const Home: NextPage = () => {
  const [createNewBugModal, setCreateNewBugModal] = useState(false);
  const [createNewFeatureRequestModal, setCreateNewFeatureRequestModal] =
    useState(false);
  const [createNewTestCaseModal, setCreateNewTestCaseModal] = useState(false);

  const [createNewFeatureRequestValues, setCreateNewFeatureRequestValues] =
    useState<CreateNewBugModel>(initCreateNewBugModel);
  const [createNewTestCaseValues, setCreateNewTestCaseValues] =
    useState<CreateNewBugModel>(initCreateNewBugModel);
  const [createNewBugValues, setCreateNewBugValues] =
    useState<CreateNewBugModel>(initCreateNewBugModel);
  const user = useQuery([Constants.queries.getMe], getLoginUser, {
    onError: (e: AxiosError) => {
      if (e.response?.status === 401) router.push('/login');
    },
  });
  const router = useRouter();
  useEffect(() => {
    var token = getItem('jwtToken');
    if (!token) router.push('/login');
  }, []);

  const createNewBugMutation = useMutation(createNewBug, {
    onSuccess: () => {
      setCreateNewBugValues(initCreateNewBugModel);
      setCreateNewBugModal(false);
      ticketsQuery.refetch();
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const createNewFeatureRequestMutation = useMutation(createNewFeatureRequest, {
    onSuccess: () => {
      setCreateNewFeatureRequestValues(initCreateNewBugModel);
      setCreateNewFeatureRequestModal(false);
      ticketsQuery.refetch();
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const createNewTestCaseMutation = useMutation(createNewTestCase, {
    onSuccess: () => {
      setCreateNewTestCaseValues(initCreateNewBugModel);
      setCreateNewTestCaseModal(false);
      ticketsQuery.refetch();
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const ticketsQuery = useQuery([Constants.queries.getBug], getTicket);
  const onChangeCreateBugHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCreateNewBugValues({
      ...createNewBugValues,
      [e.target.name]: e.target.value,
    });
  };
  const onChangeCreateFeatureRequestHandler = (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCreateNewFeatureRequestValues({
      ...createNewFeatureRequestValues,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeCreateTestCaseHandler = (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCreateNewTestCaseValues({
      ...createNewTestCaseValues,
      [e.target.name]: e.target.value,
    });
  };

  const createNewBugHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createNewBugMutation.mutate(createNewBugValues as any);
  };
  const createNewFeatureRequestHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createNewFeatureRequestMutation.mutate(
      createNewFeatureRequestValues as any
    );
  };
  const createNewTestCaseHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createNewTestCaseMutation.mutate(createNewTestCaseValues as any);
  };
  return (
    <>
      <Navbar user={user.data?.data} />
      <div className="w-[100%] m-auto max-h-[90vh] overflow-hidden">
        <MyHead title="Ticket Tracking System" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-white p-2 text-center gap-5">
          <div>
            <div className="w-[50%] md:w-full flex items-center justify-center m-auto">
              <PrimaryButton
                text="New Bug"
                type="button"
                onClick={() => setCreateNewBugModal(true)}
              />
            </div>
            <div className="bg-gray-900 bg-opacity-50 shadow-md rounded mt-3 overflow-y-scroll max:h-[80vh] h-[80vh] overflow-auto">
              {ticketsQuery.isError && (
                <p className="text-red-500">Something went wrong</p>
              )}
              {ticketsQuery.isLoading && <Loading size="medium" />}
              {ticketsQuery.isSuccess && (
                <>
                  {(ticketsQuery.data.data as TicketModel[])
                    ?.filter((i) => !i.type)
                    .map((value, index) => (
                      <div
                        key={`ticket_${value.id}_${index}`}
                        className="grid grid-cols-4 border-b-2 p-5"
                      >
                        <div className="col-span-3 flex flex-col items-start justify-start">
                          <p className="p-1">
                            <b>Summay</b>
                          </p>
                          <p className="py-1 px-5 text-left">{value.summary}</p>
                          <p className="p-1">
                            <b>Description </b>
                          </p>
                          <p className="py-1 px-5 text-left">{value.summary}</p>
                        </div>
                        <div className="flex items-center mr-auto gap-4">
                          <BiTrash className="w-7 h-7 text-red-600 cursor-pointer" />
                          <BiEdit className="w-7 h-7 text-yellow-300 cursor-pointer" />
                        </div>
                      </div>
                    ))}
                </>
              )}
            </div>
          </div>
          <div>
            <div className="w-[50%] md:w-full flex items-center justify-center m-auto">
              <PrimaryButton
                text="New Feature Request"
                type="button"
                onClick={() => setCreateNewFeatureRequestModal(true)}
              />
            </div>
            <div className="bg-gray-900 bg-opacity-50 shadow-md rounded mt-3">
              {ticketsQuery.isError && (
                <p className="text-red-500">Something went wrong</p>
              )}
              {ticketsQuery.isLoading && <Loading size="medium" />}
              {ticketsQuery.isSuccess && (
                <>
                  {(ticketsQuery.data.data as TicketModel[])
                    ?.filter((i) => i.type === 'FeatureRequest')
                    .map((value, index) => (
                      <div
                        key={`ticket_${value.id}_${index}`}
                        className="grid grid-cols-4 border-b-2 p-5"
                      >
                        <div className="col-span-3 flex flex-col items-start justify-start">
                          <p className="p-1">
                            <b>Summay</b>
                          </p>
                          <p className="py-1 px-5 text-left">{value.summary}</p>
                          <p className="p-1">
                            <b>Description </b>
                          </p>
                          <p className="py-1 px-5 text-left">{value.summary}</p>
                        </div>
                        <div className="flex items-center mr-auto gap-4">
                          <BiTrash className="w-7 h-7 text-red-600 cursor-pointer" />
                          <BiEdit className="w-7 h-7 text-yellow-300 cursor-pointer" />
                        </div>
                      </div>
                    ))}
                </>
              )}
            </div>
          </div>
          <div>
            <div className="w-[50%] md:w-full flex items-center justify-center m-auto">
              <PrimaryButton
                text="New Test Case"
                type="button"
                onClick={() => setCreateNewTestCaseModal(true)}
              />
            </div>
            <div className="bg-gray-900 bg-opacity-50 shadow-md rounded mt-3">
              {ticketsQuery.isError && (
                <p className="text-red-500">Something went wrong</p>
              )}
              {ticketsQuery.isLoading && <Loading size="medium" />}
              {ticketsQuery.isSuccess && (
                <>
                  {(ticketsQuery.data.data as TicketModel[])
                    ?.filter((i) => i.type === 'TestCase')
                    .map((value, index) => (
                      <div
                        key={`ticket_${value.id}_${index}`}
                        className="grid grid-cols-4 border-b-2 p-5"
                      >
                        <div className="col-span-3 flex flex-col items-start justify-start">
                          <p className="p-1">
                            <b>Summay</b>
                          </p>
                          <p className="py-1 px-5 text-left">{value.summary}</p>
                          <p className="p-1">
                            <b>Description </b>
                          </p>
                          <p className="py-1 px-5 text-left">{value.summary}</p>
                        </div>
                        <div className="flex items-center mr-auto gap-4">
                          <BiTrash className="w-7 h-7 text-red-600 cursor-pointer" />
                          <BiEdit className="w-7 h-7 text-yellow-300 cursor-pointer" />
                        </div>
                      </div>
                    ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal
        child={
          <>
            <div className="flex justify-center items-center mt-4">
              <b>Create New Bugs</b>
            </div>
            <form
              onSubmit={createNewBugHandler}
              className="items-start justify-start flex flex-col p-5 gap-4 text-black"
            >
              <TextAreaForm
                lableColor="text-black"
                label="Description"
                name="description"
                required={true}
                onChange={(e) => onChangeCreateBugHandler}
              />
              <TextAreaForm
                lableColor="text-black"
                label="Summary"
                name="summary"
                required={true}
                onChange={onChangeCreateBugHandler}
              />
              {/* <p className="text-red-500">{loginErrorMessage}</p> */}
              <div className="flex items-center justify-center w-full mt-5">
                <PrimaryButton
                  type="submit"
                  text="Create"
                  isLoading={createNewBugMutation.isLoading}
                />
              </div>
            </form>
          </>
        }
        onClose={() => setCreateNewBugModal(false)}
        visible={createNewBugModal}
        width="60%"
      />

      <Modal
        child={
          <>
            <div className="flex justify-center items-center mt-4">
              <b>Create New Feature Request</b>
            </div>
            <form
              onSubmit={createNewFeatureRequestHandler}
              className="items-start justify-start flex flex-col p-5 gap-4 text-black"
            >
              <TextAreaForm
                lableColor="text-black"
                label="Description"
                name="description"
                required={true}
                onChange={onChangeCreateFeatureRequestHandler}
              />
              <TextAreaForm
                lableColor="text-black"
                label="Summary"
                name="summary"
                required={true}
                onChange={onChangeCreateFeatureRequestHandler}
              />
              {/* <p className="text-red-500">{loginErrorMessage}</p> */}
              <div className="flex items-center justify-center w-full mt-5">
                <PrimaryButton
                  type="submit"
                  text="Create"
                  isLoading={createNewFeatureRequestMutation.isLoading}
                />
              </div>
            </form>
          </>
        }
        onClose={() => setCreateNewFeatureRequestModal(false)}
        visible={createNewFeatureRequestModal}
        width="60%"
      />

      <Modal
        child={
          <>
            <div className="flex justify-center items-center mt-4">
              <b>Create New Test Case</b>
            </div>
            <form
              onSubmit={createNewTestCaseHandler}
              className="items-start justify-start flex flex-col p-5 gap-4 text-black"
            >
              <TextAreaForm
                lableColor="text-black"
                label="Description"
                name="description"
                required={true}
                onChange={onChangeCreateTestCaseHandler}
              />
              <TextAreaForm
                lableColor="text-black"
                label="Summary"
                name="summary"
                required={true}
                onChange={onChangeCreateTestCaseHandler}
              />
              {/* <p className="text-red-500">{loginErrorMessage}</p> */}
              <div className="flex items-center justify-center w-full mt-5">
                <PrimaryButton
                  type="submit"
                  text="Create"
                  isLoading={createNewTestCaseMutation.isLoading}
                />
              </div>
            </form>
          </>
        }
        onClose={() => setCreateNewTestCaseModal(false)}
        visible={createNewTestCaseModal}
        width="60%"
      />
    </>
  );
};

export default Home;
