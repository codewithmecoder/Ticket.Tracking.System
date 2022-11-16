import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { BiCheckCircle, BiEdit, BiTrash } from 'react-icons/bi';
import { HiXMark } from 'react-icons/hi2';
import Checkbox from '../components/Checkbox';
import DangerButton from '../components/DangerButton';
import Loading from '../components/Loading';
import Modal from '../components/Modal';
import MyHead from '../components/MyHead';
import Navbar from '../components/Navbar';
import PrimaryButton from '../components/PrimaryButton';
import TextAreaForm from '../components/TextAreaForm';
import { CreateNewBugModel, TicketModel } from '../models/ticket.model';
import { CurrentUserResponse } from '../models/user.model';
import { getLoginUser } from '../services/auth.service';
import {
  createNewBug,
  createNewFeatureRequest,
  createNewTestCase,
  deleteTicket,
  getTicket,
  updateIsSovled,
  updateTicket,
} from '../services/ticket.service';
import { Constants } from '../utils/constants';
import { getItem, isPM, isQA, isRD } from '../utils/tokenStorage';

const initCreateNewBugModel: CreateNewBugModel = {
  summary: '',
  description: '',
};

const initTicket: TicketModel = {
  summary: '',
  description: '',
  id: 0,
  isSovled: false,
  userId: '',
  createdAt: undefined,
  updateAt: undefined,
  severity: false,
  priority: 0,
  type: '',
};

const Home: NextPage = () => {
  console.log('Build Again');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTicketObj, setDeleteTicketObj] =
    useState<TicketModel>(initTicket);
  const [updateTicketObj, setUpdateTicketObj] =
    useState<TicketModel>(initTicket);
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

  const deleteTicketMutation = useMutation(deleteTicket, {
    onSuccess: () => {
      setDeleteTicketObj(initTicket);
      ticketsQuery.refetch();
      setShowDeleteModal(false);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const updateTicketMutation = useMutation(updateTicket, {
    onSuccess: () => {
      setUpdateTicketObj(initTicket);
      ticketsQuery.refetch();
      setCreateNewBugModal(false);
      setCreateNewFeatureRequestModal(false);
      setCreateNewTestCaseModal(false);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const updateIsSovledMutation = useMutation(updateIsSovled, {
    onSuccess: () => {
      ticketsQuery.refetch();
    },
  });
  //updateTicket

  const ticketsQuery = useQuery([Constants.queries.getBug], getTicket, {
    cacheTime: 0,
  });
  const onChangeCreateBugHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (updateTicketObj.id > 0) {
      setUpdateTicketObj({
        ...updateTicketObj,
        [e.target.name]: e.target.value,
      });
    } else {
      setCreateNewBugValues({
        ...createNewBugValues,
        [e.target.name]: e.target.value,
      });
    }
  };
  const onChangeCreateFeatureRequestHandler = (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (updateTicketObj.id > 0) {
      setUpdateTicketObj({
        ...updateTicketObj,
        [e.target.name]: e.target.value,
      });
    } else {
      setCreateNewFeatureRequestValues({
        ...createNewFeatureRequestValues,
        [e.target.name]: e.target.value,
      });
    }
  };

  const onChangeCreateTestCaseHandler = (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (updateTicketObj.id > 0) {
      setUpdateTicketObj({
        ...updateTicketObj,
        [e.target.name]: e.target.value,
      });
    } else {
      setCreateNewTestCaseValues({
        ...createNewTestCaseValues,
        [e.target.name]: e.target.value,
      });
    }
  };

  const createNewBugHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (updateTicketObj.id > 0) {
      updateTicketMutation.mutate(updateTicketObj as any);
    } else {
      createNewBugMutation.mutate(createNewBugValues as any);
    }
  };
  const createNewFeatureRequestHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (updateTicketObj.id > 0) {
      updateTicketMutation.mutate(updateTicketObj as any);
    } else {
      createNewFeatureRequestMutation.mutate(
        createNewFeatureRequestValues as any
      );
    }
  };
  const createNewTestCaseHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (updateTicketObj.id > 0) {
      updateTicketMutation.mutate(updateTicketObj as any);
    } else {
      createNewTestCaseMutation.mutate(createNewTestCaseValues as any);
    }
  };
  return (
    <>
      <Navbar user={user.data?.data} />
      <div className="w-[100%] m-auto lg:max-h-[90vh] overflow-hidden">
        <MyHead title="Ticket Tracking System" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-white p-2 text-center gap-5">
          <div>
            <div className="w-[50%] md:w-full flex items-center justify-center m-auto">
              {isQA((user.data?.data as CurrentUserResponse)?.userRoles) ? (
                <PrimaryButton
                  text="New Bug"
                  type="button"
                  onClick={() => setCreateNewBugModal(true)}
                />
              ) : (
                <div className="mt-4 w-full md:w-[50%] inline-block px-6 py-2.5" />
              )}
            </div>
            <div className="bg-gray-900 bg-opacity-50 shadow-md rounded mt-3 md:overflow-y-scroll md:max:h-[80vh] md:h-[80vh] md:overflow-auto">
              {ticketsQuery.isLoading && <Loading size="medium" />}
              {ticketsQuery.isSuccess && (
                <>
                  {(ticketsQuery.data.data as TicketModel[])
                    ?.filter((i) => !i.type)
                    .map((value, index) => (
                      <div
                        key={`ticket_${value.id}_${index}`}
                        className="grid grid-cols-6 border-b-2 p-5"
                      >
                        <div className="col-span-4 flex flex-col items-start justify-start">
                          <p className="p-1 flex items-center gap-2">
                            <b>Summay</b>{' '}
                            <span>
                              {value.isSovled ? (
                                <BiCheckCircle className="text-green-500" />
                              ) : (
                                <HiXMark className="text-red-500" />
                              )}
                            </span>
                          </p>
                          <p className="py-1 px-5 text-left">{value.summary}</p>
                          <p className="p-1">
                            <b>Description </b>
                          </p>
                          <p className="py-1 px-5 text-left">
                            {value.description}
                          </p>
                        </div>
                        <div className="flex items-center w-full justify-end gap-2 col-span-2">
                          {isQA(
                            (user.data?.data as CurrentUserResponse)?.userRoles
                          ) && (
                            <div className="flex items-center mr-auto gap-2 justify-end">
                              <BiTrash
                                className="w-7 h-7 text-red-600 cursor-pointer"
                                onClick={() => {
                                  setDeleteTicketObj(value);
                                  setShowDeleteModal(true);
                                }}
                              />
                              <BiEdit
                                className="w-7 h-7 text-yellow-300 cursor-pointer"
                                onClick={() => {
                                  setUpdateTicketObj(value);
                                  setCreateNewBugModal(true);
                                }}
                              />
                            </div>
                          )}
                          {isRD(
                            (user.data?.data as CurrentUserResponse)?.userRoles
                          ) && (
                            <Checkbox
                              id={`check_${value.id}`}
                              label="Done"
                              name="isSolved"
                              checked={value.isSovled}
                              onChange={(e) => {
                                var isChecked = e.target.checked;
                                updateIsSovledMutation.mutate({
                                  id: value.id,
                                  isSolved: isChecked,
                                } as any);
                              }}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                </>
              )}
            </div>
          </div>
          <div>
            <div className="w-[50%] md:w-full flex items-center justify-center m-auto">
              {isPM((user.data?.data as CurrentUserResponse)?.userRoles) ? (
                <PrimaryButton
                  text="New Feature Request"
                  type="button"
                  onClick={() => setCreateNewFeatureRequestModal(true)}
                />
              ) : (
                <div className="mt-4 w-full md:w-[50%] inline-block px-6 py-2.5" />
              )}
            </div>
            <div className="bg-gray-900 bg-opacity-50 shadow-md rounded mt-3 md:overflow-y-scroll md:max:h-[80vh] md:h-[80vh] md:overflow-auto">
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
                          <p className="p-1 flex items-center gap-2">
                            <b>Summay</b>
                            <span>
                              {value.isSovled ? (
                                <BiCheckCircle className="text-green-500" />
                              ) : (
                                <HiXMark className="text-red-500" />
                              )}
                            </span>
                          </p>
                          <p className="py-1 px-5 text-left">{value.summary}</p>
                          <p className="p-1">
                            <b>Description </b>
                          </p>
                          <p className="py-1 px-5 text-left">
                            {value.description}
                          </p>
                        </div>
                        {isPM(
                          (user.data?.data as CurrentUserResponse)?.userRoles
                        ) && (
                          <div className="flex items-center mr-auto gap-4">
                            <BiTrash
                              className="w-7 h-7 text-red-600 cursor-pointer"
                              onClick={() => {
                                setDeleteTicketObj(value);
                                setShowDeleteModal(true);
                              }}
                            />
                            <BiEdit
                              className="w-7 h-7 text-yellow-300 cursor-pointer"
                              onClick={() => {
                                setUpdateTicketObj(value);
                                setCreateNewFeatureRequestModal(true);
                              }}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                </>
              )}
            </div>
          </div>
          <div>
            <div className="w-[50%] md:w-full flex items-center justify-center m-auto">
              {isQA((user.data?.data as CurrentUserResponse)?.userRoles) ? (
                <PrimaryButton
                  text="New Test Case"
                  type="button"
                  onClick={() => setCreateNewTestCaseModal(true)}
                />
              ) : (
                <div className="mt-4 w-full md:w-[50%] inline-block px-6 py-2.5" />
              )}
            </div>
            <div className="bg-gray-900 bg-opacity-50 shadow-md rounded mt-3 md:overflow-y-scroll md:max:h-[80vh] md:h-[80vh] md:overflow-auto">
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
                          <p className="p-1 flex items-center gap-2">
                            <b>Summay</b>
                            <span>
                              {value.isSovled ? (
                                <BiCheckCircle className="text-green-500" />
                              ) : (
                                <HiXMark className="text-red-500" />
                              )}
                            </span>
                          </p>
                          <p className="py-1 px-5 text-left">{value.summary}</p>
                          <p className="p-1">
                            <b>Description </b>
                          </p>
                          <p className="py-1 px-5 text-left">
                            {value.description}
                          </p>
                        </div>
                        {isQA(
                          (user.data?.data as CurrentUserResponse)?.userRoles
                        ) && (
                          <div className="flex items-center mr-auto gap-4">
                            <BiTrash
                              className="w-7 h-7 text-red-600 cursor-pointer"
                              onClick={() => {
                                setDeleteTicketObj(value);
                                setShowDeleteModal(true);
                              }}
                            />
                            <BiEdit
                              className="w-7 h-7 text-yellow-300 cursor-pointer"
                              onClick={() => {
                                setUpdateTicketObj(value);
                                setCreateNewTestCaseModal(true);
                              }}
                            />
                          </div>
                        )}
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
                label="Summary"
                name="summary"
                required={true}
                onChange={onChangeCreateBugHandler}
                value={
                  updateTicketObj.id > 0
                    ? updateTicketObj.summary
                    : createNewBugValues.summary
                }
              />
              <TextAreaForm
                lableColor="text-black"
                label="Description"
                name="description"
                required={true}
                onChange={onChangeCreateBugHandler}
                value={
                  updateTicketObj.id > 0
                    ? updateTicketObj.description
                    : createNewBugValues.description
                }
              />
              {/* <p className="text-red-500">{loginErrorMessage}</p> */}
              <div className="flex items-center justify-center w-full mt-5">
                <PrimaryButton
                  type="submit"
                  text={updateTicketObj.id > 0 ? 'Update' : 'Create'}
                  isLoading={
                    updateTicketObj.id > 0
                      ? updateTicketMutation.isLoading
                      : createNewBugMutation.isLoading
                  }
                />
              </div>
            </form>
          </>
        }
        onClose={() => {
          if (updateTicketObj.id > 0) {
            setUpdateTicketObj(initTicket);
          }
          setCreateNewBugModal(false);
        }}
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
                label="Summary"
                name="summary"
                required={true}
                onChange={onChangeCreateFeatureRequestHandler}
                value={
                  updateTicketObj.id > 0
                    ? updateTicketObj.summary
                    : createNewFeatureRequestValues.summary
                }
              />
              <TextAreaForm
                lableColor="text-black"
                label="Description"
                name="description"
                required={true}
                value={
                  updateTicketObj.id > 0
                    ? updateTicketObj.description
                    : createNewFeatureRequestValues.description
                }
                onChange={onChangeCreateFeatureRequestHandler}
              />
              {/* <p className="text-red-500">{loginErrorMessage}</p> */}
              <div className="flex items-center justify-center w-full mt-5">
                <PrimaryButton
                  type="submit"
                  text={updateTicketObj.id > 0 ? 'Update' : 'Create'}
                  isLoading={
                    updateTicketObj.id > 0
                      ? updateTicketMutation.isLoading
                      : createNewFeatureRequestMutation.isLoading
                  }
                />
              </div>
            </form>
          </>
        }
        onClose={() => {
          if (updateTicketObj.id > 0) {
            setUpdateTicketObj(initTicket);
          }
          setCreateNewFeatureRequestModal(false);
        }}
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
                label="Summary"
                name="summary"
                required={true}
                onChange={onChangeCreateTestCaseHandler}
                value={
                  updateTicketObj.id > 0
                    ? updateTicketObj.summary
                    : createNewTestCaseValues.summary
                }
              />
              <TextAreaForm
                lableColor="text-black"
                label="Description"
                name="description"
                required={true}
                onChange={onChangeCreateTestCaseHandler}
                value={
                  updateTicketObj.id > 0
                    ? updateTicketObj.description
                    : createNewTestCaseValues.description
                }
              />
              {/* <p className="text-red-500">{loginErrorMessage}</p> */}
              <div className="flex items-center justify-center w-full mt-5">
                <PrimaryButton
                  type="submit"
                  text={updateTicketObj.id > 0 ? 'Update' : 'Create'}
                  isLoading={
                    updateTicketObj.id > 0
                      ? updateTicketMutation.isLoading
                      : createNewTestCaseMutation.isLoading
                  }
                />
              </div>
            </form>
          </>
        }
        onClose={() => {
          if (updateTicketObj.id > 0) {
            setUpdateTicketObj(initTicket);
          }
          setCreateNewTestCaseModal(false);
        }}
        visible={createNewTestCaseModal}
        width="60%"
      />

      <Modal
        child={
          <>
            <div className="flex items-center justify-center p-3">
              <p className="text-md">Are you sure want to delete?</p>
            </div>
            <div className="flex gap-5 p-4">
              <PrimaryButton
                text="No"
                type="button"
                onClick={() => setShowDeleteModal(false)}
              />
              <DangerButton
                text="Yes"
                type="button"
                isLoading={deleteTicketMutation.isLoading}
                onClick={() => {
                  deleteTicketMutation.mutate(deleteTicketObj.id as any);
                }}
              />
            </div>
          </>
        }
        visible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        height="auto"
        width="auto"
      />
    </>
  );
};

export default Home;
