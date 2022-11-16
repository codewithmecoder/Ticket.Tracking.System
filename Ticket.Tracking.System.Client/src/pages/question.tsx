import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { ChangeEvent, FormEvent, useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { BsFillArrowDownCircleFill, BsTrash } from 'react-icons/bs';
import Moment from 'react-moment';
import BackButton from '../components/BackButton';
import DangerButton from '../components/DangerButton';
import InputForm from '../components/InputForm';
import Loading from '../components/Loading';
import Modal from '../components/Modal';
import MyHead from '../components/MyHead';
import PrimaryButton from '../components/PrimaryButton';
import { CreateQuestionModel, QuestionModel } from '../models/question.model';
import { TypeQuestionModel } from '../models/typeQuestion.model';
import {
  createQuestion,
  getQuestionByTypeQuestion,
} from '../services/question.service';
import { fetchOnlyTypeQuestions } from '../services/typeQuestion.service';
import { Constants } from '../utils/constants';
import fetcher from '../utils/fetcher';

interface TypeQuestionError {
  content: string | null;
  typeQuestion: string | null;
}

// interface SelectType {
//   label: string;
//   value: number;
// }
// const initSeleteType: SelectType = {
//   label: '',
//   value: 0,
// };
const initialTpyeQuestion: TypeQuestionModel = {
  id: 0,
  type: '',
  photo: null,
  questions: [],
};
const initialQuestion: CreateQuestionModel = {
  content: null,
  typeQuestionId: 0,
};
const initQuestionModel: QuestionModel = {
  id: 0,
  content: '',
  answerQuestions: [],
  typeQuestion: {
    id: 0,
    type: '',
    photo: null,
    questions: [],
    createdAt: undefined,
    updatedAt: undefined,
  },
  createdAt: undefined,
  updatedAt: undefined,
  typeQuestionId: 0,
};
const Question = () => {
  const [typeQuestionModal, setTypeQuestionModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteModalData, setDeleteModalData] =
    useState<QuestionModel>(initQuestionModel);
  const [updateId, setUpdateId] = useState<number>(0);
  const [typeQuestion, setTypeQuestion] =
    useState<TypeQuestionModel>(initialTpyeQuestion);
  const [questionValues, setQuestionValues] =
    useState<CreateQuestionModel>(initialQuestion);
  const [errorObject, setErrorObject] = useState<TypeQuestionError>({
    content: null,
    typeQuestion: null,
  });
  const [error, setError] = useState<string | null>(null);

  const [questionData, setQuestionData] = useState<QuestionModel[]>([]);

  const mutation = useMutation(createQuestion, {
    onSuccess: () => {
      setQuestionValues(initialQuestion);
      setTypeQuestion(initialTpyeQuestion);
      setError(null);
    },
    onError: (e: AxiosError) => {
      setError(e.message);
    },
  });
  const validate = (value: CreateQuestionModel) => {
    const error: TypeQuestionError = {
      content: null,
      typeQuestion: null,
    };
    if (!value.content) error.content = 'Name Question cannot be empty!';
    if (value.typeQuestionId <= 0) error.typeQuestion = 'Please type question!';
    return error;
  };
  const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestionValues({ ...questionValues, [e.target.name]: e.target.value });
  };
  const submitHadler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    questionValues.typeQuestionId = typeQuestion.id;
    setErrorObject(validate(questionValues));
    if (errorObject.content || errorObject.typeQuestion) return;
    const { content, typeQuestionId } = questionValues;
    mutation.mutate({ content, typeQuestionId } as any);
  };

  const tqQuery = useQuery(
    [Constants.queries.onlyTypeQuestion],
    fetchOnlyTypeQuestions
  );
  // let qQuery = getQuestionByTypeQuestion(selectedOptionId);

  return (
    <div className="md:max-w-[80%] w-[100%] lg:max-w-[60%] m-auto p-5">
      <MyHead title="Happy Quizy - Question" />
      <BackButton href="/quiz" />
      <form
        onSubmit={submitHadler}
        action=""
        className="w-[100%] lg:w-[60%] h-[60%] bg-neutral-800 items-start justify-start flex flex-col pt-5 gap-4 m-auto"
      >
        <InputForm
          label="Name Question"
          name="content"
          onChange={onchangeHandler}
          value={questionValues.content ?? ''}
          required={true}
        />
        <span className="text-red-500">
          {errorObject.content && <li>{errorObject.content}</li>}
        </span>
        <InputForm
          label="Type Question"
          name="typeQuestionId"
          readonly={true}
          className="cursor-pointer"
          onClick={() => {
            if (!tqQuery.data) tqQuery.refetch();
            setTypeQuestionModal(true);
          }}
          value={typeQuestion.type ?? ''}
          required={true}
        />
        {errorObject.typeQuestion && (
          <span className="text-red-500">
            <li>{errorObject.typeQuestion}</li>
          </span>
        )}
        {error && <span className="text-red-400">{error}</span>}

        <div className="flex items-center justify-center w-full mt-5">
          <PrimaryButton
            type="submit"
            text={updateId > 0 ? 'Update Question' : 'Add Question'}
            isLoading={mutation.isLoading}
          />
        </div>
      </form>
      <div className="w-full h-[1px] bg-gray-400 my-2" />
      {/* <div className="w-full h-10"> */}
      {/* <Select
          defaultValue={selectedOption}
          onChange={(e) => {
            setSelectedOption(e);
            console.log(qQuery);
          }}
          options={
            tqQuery.isSuccess
              ? (tqQuery!.data!.data as TypeQuestionModel[]).map((value) => {
                  return { value: value.id, label: value.type };
                })
              : [initSeleteType]
          }
        /> */}
      {tqQuery.isError && <p>Error fetching data</p>}
      {tqQuery.isLoading && <Loading size="medium" />}
      {tqQuery.isSuccess && (
        <select
          name=""
          id=""
          className="my-2 w-full form-control block px-3 py-1.5 text-base font-normal text-gray-900 bg-slate-300 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-900 focus:bg-white focus:outline-none"
          onChange={async (e) => {
            let qQuery = await getQuestionByTypeQuestion(
              parseInt(e.target.value)
            );
            setQuestionData(qQuery);
          }}
        >
          <option>Select Any Type of Question</option>
          {(tqQuery.data!.data as TypeQuestionModel[]).map((value) => (
            <option key={`select_${value.id}`} value={value.id}>
              {value.type}
            </option>
          ))}
        </select>
      )}
      {/* </div> */}
      <fieldset className="flex items-center justify-center text-white border p-3 rounded w-[100%]">
        <legend>List Of Questions</legend>
        {/* {qQuery.isError && <p>Error fetching data</p>}
        {qQuery.isLoading && <Loading size="medium" />} */}
        {/* {questionData.length > 0 && ( */}
        <div className="">
          <table className="table-auto w-full text-left overflow-x-scroll">
            <thead>
              <tr>
                <th className="w-[40px]">No</th>
                <th className="w-[300px]">Question</th>
                <th className="w-[150px]">Created At</th>
                <th className="w-[150px]">Updated At</th>
                <th className="w-[150px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {questionData.map((question, index) => (
                <tr key={question.id}>
                  <td className="w-[40px]">{index + 1}.</td>
                  <td className="break-words w-[300px]">{question.content}</td>
                  <td className="w-[150px]">
                    <Moment format="DD-MM-YYYY">{question.createdAt}</Moment>
                  </td>
                  <td className="w-[150px]">
                    <Moment format="DD-MM-YYYY">{question.updatedAt}</Moment>
                  </td>
                  <td className="flex w-[150px]">
                    <BsTrash
                      onClick={() => {
                        setShowDeleteModal(true);
                        setDeleteModalData(question);
                      }}
                      className="w-7 h-7 text-red-600 cursor-pointer"
                    />
                    <BiEdit
                      onClick={() => {
                        // setUpdateId(typeQ.id);
                        // setTypeQuestionValues({
                        //   ...typeQuestionValues,
                        //   type: typeQ.type,
                        //   photo: typeQ.photo,
                        // });
                      }}
                      className="w-7 h-7 text-yellow-500 cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* )} */}
      </fieldset>
      <Modal
        // key={deleteModalData?.id}
        child={
          <>
            <div className="p-4">
              {tqQuery.isError && <p>Error fetching data</p>}
              {tqQuery.isLoading && <Loading size="medium" />}
              {tqQuery.isSuccess && (
                <table className="table-auto w-[90%] text-left">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Type</th>
                      <th>Photo</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tqQuery.data?.success ? (
                      (tqQuery.data.data as TypeQuestionModel[])?.map(
                        (typeQ, index) => (
                          <tr key={typeQ.id}>
                            <td>{index + 1}</td>
                            <td>{typeQ.type}</td>
                            <td>
                              <div className="w-10 h-10">
                                <Image
                                  src={
                                    typeQ.photo ??
                                    '/assets/images/no_image_available.png'
                                  }
                                  alt={typeQ.type}
                                  className="w-full h-full rounded-full shadow-md"
                                  priority
                                  object-fit="contain"
                                  width={50}
                                  height={50}
                                />
                              </div>
                            </td>
                            <td className="flex">
                              <BsFillArrowDownCircleFill
                                onClick={() => {
                                  setTypeQuestion(typeQ);
                                  setTypeQuestionModal(false);
                                }}
                                className="w-7 h-7 text-red-600 cursor-pointer"
                              />
                            </td>
                          </tr>
                        )
                      )
                    ) : (
                      <p></p>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </>
        }
        visible={typeQuestionModal}
        onClose={() => setTypeQuestionModal(false)}
        height="70%"
        width="80%"
      />
      <Modal
        key={deleteModalData?.id}
        child={
          <>
            <div className="flex items-center justify-center p-3">
              <p className="text-md">
                Are you sure want to delete {`"${deleteModalData?.content}"`}
              </p>
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
                onClick={() => {
                  // deleteTypeQuestion(deleteModalData?.id ?? 0);
                  // qQuery.refetch();
                  setShowDeleteModal(false);
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
    </div>
  );
};

export default Question;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await fetcher(`/api/v1/user`, context.req.headers);
  return { props: { userData: data } };
};
